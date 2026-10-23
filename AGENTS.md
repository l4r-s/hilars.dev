# hilars.dev

Next.js 14 (App Router, MDX) personal site, yarn 1, standalone output in a
Node 24.22.1 Alpine image. Dev server: `yarn dev` → http://localhost:3000.

## Deploy (GitOps, Argo CD)

- CI never talks to the cluster. `.github/workflows/build.yml` (push to main):
  `build` pushes `registry.hilars.dev/hilars-dev/landing:sha-<full sha>` and
  `:latest` → `deploy-dev` ∥ `verify-dev` → `deploy-prod-pr`.
  - `deploy-dev` yq-patches `apps/hilars-dev/dev/{application,values}.yml` in
    `l4r-s/argo-deployments` and pushes to its main; Argo CD syncs
    https://dev.hilars.dev (namespace `hilars-dev-dev`, noindex).
  - `verify-dev` polls `https://dev.hilars.dev/_dev/version` for the new SHA,
    then curls a few pages.
  - `deploy-prod-pr` opens a `hilars-dev: prod -> <sha>` PR in
    argo-deployments (superseding older ones). Merging it is the production
    deploy (Argo app `hilars-dev-prod`, release `hilars-dev`, namespace
    `hilars-prod`).
- Secrets used: `REGISTRY_PASSWORD`, `ARGO_DEPLOYMENTS_TOKEN`, optional
  `LLMGW_API_KEY` (prod PR summary) and `E2E_CF_ACCESS_CLIENT_ID/SECRET` (only
  if dev sits behind Cloudflare Access).
- `/healthz` (probes) and `/_dev/version` (`{"sha": …}`, rewritten to
  `app/api/dev-version`) come from the `HILARS_DEV_COMMIT_SHA` build arg.

## Chart gotchas

- The prod app adopted a Helmfile release. Object names, the
  `app: hilars-dev-<release>` selector and the `hilars-dev-tls-<release>` TLS
  Secret must not change; `tests/deploy-config.test.mjs` pins them against
  `tests/fixtures/legacy-release.json`.
- No runtime secrets, so no 1Password item unless `onepassword` is set.

## CI

`.github/workflows/ci.yml` (`pull_request`, no secrets): `image` (build +
`scripts/ci/smoke-image.sh`) and `deploy-config` (helm lint, `yarn test`,
actionlint) behind the `Mandatory checks` gate. A new job must be added to the
gate's `needs`; the tests enforce it. Never add a `pull_request_target`
workflow. `yarn lint` is broken (next lint vs ESLint 9) and is not in CI.
