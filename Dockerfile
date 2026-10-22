# Exact Node release for every stage; the production stage asserts it below
ARG NODE_VERSION=24.22.1

##
# Builder
##
FROM node:${NODE_VERSION}-alpine3.24 AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production yarn build

##
# Production
##
FROM node:${NODE_VERSION}-alpine3.24 AS production

# Fail the build if the runtime is not the pinned Node release
ARG NODE_VERSION
RUN test "$(node --version)" = "v${NODE_VERSION}"

# Add a user and set permissions
RUN addgroup -S -g 1001 app && adduser -S -u 1001 -G app app
USER app

WORKDIR /app
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/public ./public
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

# Commit served at /_dev/version; CI passes the pushed SHA. Declared last so a
# new SHA does not invalidate the cached layers above.
ARG HILARS_DEV_COMMIT_SHA=unknown
ENV HILARS_DEV_COMMIT_SHA=$HILARS_DEV_COMMIT_SHA

EXPOSE 3000
CMD ["node", "server.js"]
