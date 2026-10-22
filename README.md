# hilars.dev

This repository contains the source code for my personal website - [hilars.dev](https://hilars.dev).

## Sharp notes

`sharp` must be locked at `0.32.6` otherwise it will not work!

## Deployment

Pushes to `main` build the image and deploy through Argo CD
([l4r-s/argo-deployments](https://github.com/l4r-s/argo-deployments)): dev
updates automatically, production through a promotion PR there. See
[AGENTS.md](AGENTS.md).
