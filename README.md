# hilars.dev

This repository contains the source code for my personal website - [hilars.dev](https://hilars.dev).

## Sharp notes

`sharp` is pinned exactly and must stay at `0.35.5` or newer (the floor for
CVE-2026-96889 / GHSA-2464-fhr4-w9xw); it has to match the one Next.js resolves.

## Deployment

Pushes to `main` build the image and deploy through Argo CD
([l4r-s/argo-deployments](https://github.com/l4r-s/argo-deployments)): dev
updates automatically, production through a promotion PR there. See
[AGENTS.md](AGENTS.md).
