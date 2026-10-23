#!/bin/sh
# Starts the production image and checks what the cluster relies on: the
# pinned Node release, the non-root user, /healthz, /_dev/version and a page.
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
