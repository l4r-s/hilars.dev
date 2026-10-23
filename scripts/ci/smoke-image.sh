#!/bin/sh
# Starts the production image and checks what the cluster relies on: the
# pinned Node release and framework packages, the non-root user, /healthz,
# /_dev/version, pages and image optimization.
# Usage: EXPECTED_SHA=<sha> sh scripts/ci/smoke-image.sh <image>
set -eu

image="$1"
expected_sha="${EXPECTED_SHA:?EXPECTED_SHA is required}"
name="hilars-dev-smoke-$$"

node_version="$(docker run --rm --entrypoint node "$image" --version)"
echo "node: ${node_version}"
[ "$node_version" = "v24.22.1" ]

uid="$(docker run --rm --entrypoint id "$image" -u)"
echo "uid: ${uid}"
[ "$uid" = "1001" ]

# What the standalone server loads. next >= 16.4.1 and sharp >= 0.35.5 fix
# GHSA-673q-mjm6-r5xr and CVE-2026-96889 / GHSA-2464-fhr4-w9xw.
packages="$(docker run --rm --entrypoint node "$image" -e '
  const version = (name) => require(`/app/node_modules/${name}/package.json`).version;
  console.log(["next", "react", "react-dom", "sharp"].map((name) => `${name}@${version(name)}`).join(" "));
')"
echo "packages: ${packages}"
[ "$packages" = "next@16.4.2 react@19.3.1 react-dom@19.3.1 sharp@0.35.5" ]

docker run --detach --name "$name" --publish 127.0.0.1:3000:3000 "$image" > /dev/null
trap 'docker logs "$name" 2>&1 | tail -n 50; docker rm --force "$name" > /dev/null' EXIT

deadline=$(($(date +%s) + 60))
until curl --silent --fail --max-time 2 http://127.0.0.1:3000/healthz > /dev/null; do
  [ "$(date +%s)" -lt "$deadline" ] || { echo "/healthz never answered"; exit 1; }
  sleep 1
done

[ "$(curl --silent --fail http://127.0.0.1:3000/healthz)" = "ok" ]
echo "/healthz ok"

version="$(curl --silent --fail http://127.0.0.1:3000/_dev/version)"
echo "/_dev/version: ${version}"
[ "$version" = "{\"sha\":\"${expected_sha}\"}" ]

for path in / /blog; do
  status="$(curl --silent --output /dev/null --write-out '%{http_code}' --max-time 20 "http://127.0.0.1:3000${path}")"
  echo "${path} -> ${status}"
  [ "$status" = "200" ]
done

for path in '/_next/image?url=%2Fme.png&w=256&q=75' '/api/og?title=Smoke'; do
  type="$(curl --silent --fail --output /dev/null --write-out '%{content_type}' --max-time 20 "http://127.0.0.1:3000${path}")"
  echo "${path} -> ${type}"
  case "$type" in image/*) ;; *) exit 1 ;; esac
done
