// Deploy config tests: the chart Argo CD renders, the GitHub workflows and the
// Dockerfile. Pure checks over files in this repo plus `helm template`; no
// network and no cluster.
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { parse, parseAllDocuments } from "yaml";

const root = new URL("..", import.meta.url).pathname;
const read = (path) => readFileSync(`${root}${path}`, "utf8");
const legacy = JSON.parse(read("tests/fixtures/legacy-release.json"));

function render(release, namespace, ...args) {
  const out = execFileSync(
    "helm",
    ["template", release, `${root}chart`, "--namespace", namespace, ...args],
    { encoding: "utf8" },
  );
  return parseAllDocuments(out)
    .map((doc) => doc.toJSON())
    .filter(Boolean);
}

const find = (objects, kind) => objects.filter((o) => o.kind === kind);
const one = (objects, kind) => {
  const matches = find(objects, kind);
  assert.equal(matches.length, 1, `expected one ${kind}`);
  return matches[0];
};

const prod = () =>
  render(legacy.release, legacy.namespace, "--values", `${root}tests/fixtures/argo-prod-values.yml`);

test("prod render keeps the identity of the Helmfile release Argo CD adopts", () => {
  const objects = prod();
  assert.deepEqual(objects.map((o) => `${o.kind}/${o.metadata.name}`).sort(), legacy.objects);
  for (const o of objects) assert.equal(o.metadata.namespace, legacy.namespace);

  const deployment = one(objects, "Deployment");
  assert.deepEqual(deployment.spec.selector.matchLabels, legacy.selector);
  for (const [key, value] of Object.entries(legacy.selector)) {
    assert.equal(deployment.spec.template.metadata.labels[key], value);
  }
  assert.deepEqual(one(objects, "Service").spec.selector, legacy.selector);

  const ingress = one(objects, "Ingress");
  assert.equal(ingress.spec.rules[0].host, legacy.host);
  assert.equal(ingress.spec.rules[0].http.paths[0].backend.service.name, `${legacy.release}-node`);
  assert.equal(ingress.spec.tls[0].secretName, legacy.tlsSecretName);
  assert.deepEqual([...ingress.spec.tls[0].hosts].sort(), legacy.tlsHosts);
  assert.equal(
    ingress.metadata.annotations["nginx.ingress.kubernetes.io/from-to-www-redirect"],
    legacy.fromToWwwRedirect,
  );
  assert.equal(
    ingress.metadata.annotations["nginx.ingress.kubernetes.io/configuration-snippet"],
    undefined,
    "production must not send noindex",
  );
});

test("pods probe /healthz, use ndots=1 and roll out without downtime", () => {
  const deployment = one(prod(), "Deployment");
  const pod = deployment.spec.template.spec;
  const [container] = pod.containers;
  assert.equal(container.livenessProbe.httpGet.path, "/healthz");
  assert.equal(container.readinessProbe.httpGet.path, "/healthz");
  assert.deepEqual(pod.dnsConfig.options, [{ name: "ndots", value: "1" }]);
  assert.equal(container.ports[0].containerPort, legacy.containerPort);
  assert.equal(deployment.spec.strategy.rollingUpdate.maxUnavailable, 0);
  assert.match(container.image, /^registry\.hilars\.dev\/hilars-dev\/landing:sha-[0-9a-f]{40}$/);
});

test("dev defaults are noindex and need no 1Password item", () => {
  const objects = render("hilars-dev-dev", "hilars-dev-dev");
  const ingress = one(objects, "Ingress");
  assert.equal(ingress.spec.rules[0].host, "dev.hilars.dev");
  assert.match(
    ingress.metadata.annotations["nginx.ingress.kubernetes.io/configuration-snippet"],
    /X-Robots-Tag: noindex, nofollow/,
  );
  assert.equal(find(objects, "OnePasswordItem").length, 0);
  assert.equal(one(objects, "Deployment").spec.template.spec.containers[0].envFrom, undefined);
});

test("a 1Password item is a wave -20 resource, not a hook, read via envFrom", () => {
  const objects = render("hilars-dev-dev", "hilars-dev-dev", "--set", "onepassword=hilars-dev-dev");
  const item = one(objects, "OnePasswordItem");
  assert.equal(item.spec.itemPath, "vaults/kube/items/hilars-dev-dev");
  assert.equal(item.metadata.annotations["argocd.argoproj.io/sync-wave"], "-20");
  assert.equal(item.metadata.annotations["argocd.argoproj.io/hook"], undefined);
  const deployment = one(objects, "Deployment");
  assert.equal(deployment.metadata.annotations["argocd.argoproj.io/sync-wave"], undefined);
  assert.deepEqual(deployment.spec.template.spec.containers[0].envFrom, [
    { secretRef: { name: "hilars-dev-dev" } },
  ]);
});

const workflows = Object.fromEntries(
  readdirSync(`${root}.github/workflows`).map((file) => [
    file,
    { text: read(`.github/workflows/${file}`), data: parse(read(`.github/workflows/${file}`)) },
  ]),
);

test("only the expected workflows exist", () => {
  assert.deepEqual(Object.keys(workflows).sort(), ["build.yml", "ci.yml"]);
});

test("no workflow uses pull_request_target or talks to the cluster", () => {
  for (const [file, { text, data }] of Object.entries(workflows)) {
    assert.ok(!("pull_request_target" in data.on), `${file} uses pull_request_target`);
    for (const forbidden of ["helmfile", "kubectl", "K8S_SERVICE_ACCOUNT_TOKEN", "kube.hilars.dev", "l4rs.net"]) {
      assert.ok(!text.includes(forbidden), `${file} mentions ${forbidden}`);
    }
  }
});

test("PR CI has no secrets, a read-only token and a gate over every job", () => {
  const { text, data } = workflows["ci.yml"];
  assert.deepEqual(Object.keys(data.on).sort(), ["pull_request", "workflow_dispatch"]);
  assert.deepEqual(data.permissions, { contents: "read" });
  assert.ok(!text.includes("secrets."), "ci.yml must not read secrets");
  for (const job of Object.values(data.jobs)) assert.equal(job.permissions, undefined);

  const gate = data.jobs["mandatory-checks"];
  assert.equal(gate.name, "Mandatory checks");
  assert.equal(gate.if, "always()");
  const others = Object.keys(data.jobs).filter((id) => id !== "mandatory-checks");
  assert.deepEqual([...gate.needs].sort(), others.sort());
});

test("the gate fails on anything but all-success", () => {
  const script = workflows["ci.yml"].data.jobs["mandatory-checks"].steps[0].run;
  const run = (needs) => {
    try {
      execFileSync("bash", ["-c", script], { env: { ...process.env, NEEDS: JSON.stringify(needs) }, stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  };
  assert.equal(run({ image: { result: "success" }, "deploy-config": { result: "success" } }), true);
  for (const result of ["failure", "cancelled", "skipped"]) {
    assert.equal(run({ image: { result: "success" }, "deploy-config": { result } }), false, result);
  }
  assert.equal(run({}), false, "empty needs");
});

test("deploys run only from main pushes and never touch the cluster directly", () => {
  const { data } = workflows["build.yml"];
  assert.deepEqual(data.on.push, { branches: ["main"] });
  assert.deepEqual(Object.keys(data.on).sort(), ["push", "workflow_dispatch"]);
  assert.equal(data.concurrency["cancel-in-progress"], false);
  assert.equal(data.jobs.build.if, "github.ref == 'refs/heads/main'");
  for (const [id, job] of Object.entries(data.jobs)) {
    if (id !== "build") assert.ok([job.needs].flat().length > 0, `${id} must depend on build`);
  }
  assert.deepEqual(data.jobs["deploy-dev"].needs, "build");
  assert.deepEqual(data.jobs["verify-dev"].needs, "build");
  assert.deepEqual(data.jobs["deploy-prod-pr"].needs, "verify-dev");

  const push = data.jobs.build.steps.find((s) => s.name === "Build and push Docker image").with;
  assert.equal(push.tags.trim(), "${{ env.IMAGE_REPO }}:sha-${{ github.sha }}\n${{ env.IMAGE_REPO }}:latest");
  assert.match(push["build-args"], /^HILARS_DEV_COMMIT_SHA=\$\{\{ github\.sha \}\}$/m);
  assert.equal(data.env.IMAGE_REPO, "registry.hilars.dev/hilars-dev/landing");
});

test("the production image pins Node 24.22.1 and bakes the commit SHA", () => {
  const dockerfile = read("Dockerfile");
  assert.match(dockerfile, /^ARG NODE_VERSION=24\.22\.1$/m);
  const production = dockerfile.slice(dockerfile.indexOf("AS production"));
  assert.match(production, /RUN test "\$\(node --version\)" = "v\$\{NODE_VERSION\}"/);
  assert.match(production, /^ARG HILARS_DEV_COMMIT_SHA=unknown$/m);
  assert.match(production, /^ENV HILARS_DEV_COMMIT_SHA=\$HILARS_DEV_COMMIT_SHA$/m);
  assert.match(read("next.config.js"), /source: '\/_dev\/version',.*\n\s*destination: '\/api\/dev-version'/);
});

test("the lockfile resolves one patched next, React and sharp", () => {
  // yarn 1 lockfile: `"name@range", name@range:` headers, then `  version "x"`.
  const resolved = (name) => {
    const versions = new Set();
    for (const entry of read("yarn.lock").split("\n\n")) {
      const [header, ...body] = entry.trim().split("\n");
      const names = header.replace(/:$/, "").split(", ").map((spec) => spec.replace(/"/g, "").replace(/@[^@]*$/, ""));
      if (names.includes(name)) versions.add(body.find((line) => line.startsWith("  version ")).split('"')[1]);
    }
    return [...versions];
  };
  // GHSA-673q-mjm6-r5xr and CVE-2026-96889 / GHSA-2464-fhr4-w9xw are fixed
  // in next 16.4.1 and sharp 0.35.5; scripts/ci/smoke-image.sh checks the image.
  assert.deepEqual(resolved("next"), ["16.4.2"]);
  assert.deepEqual(resolved("sharp"), ["0.35.5"]);
  assert.deepEqual(resolved("react"), ["19.3.1"]);
  assert.deepEqual(resolved("react-dom"), ["19.3.1"]);
});
