# Stage 1: The Base
FROM node:20-alpine AS base
RUN npm install -g pnpm turbo
WORKDIR /app

# Stage 2: The Pruner
FROM base AS pruner
ARG APP_NAME
COPY . .
RUN turbo prune ${APP_NAME} --docker

# Stage 3: The Installer
FROM base AS installer
ARG APP_NAME
WORKDIR /app

# Copy the "thin" package.json files and the lockfile
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install dependencies (even for the database package)
RUN pnpm install --frozen-lockfile

# Stage 4: The Builder
FROM base AS builder
ARG APP_NAME
WORKDIR /app

# Copy the node_modules from the installer stage
COPY --from=installer /app .
# Copy the actual source code from the pruner stage
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json


# 2. Build the app (API or Web)
RUN pnpm turbo run build --filter=${APP_NAME}

# Stage 5: The Runner

FROM node:20-alpine AS runner
WORKDIR /app
ARG APP_NAME
# Set an environment variable so the CMD knows which app to start
ENV APP_TARGET=${APP_NAME}

# Copy the built files and the modules from the builder
COPY --from=builder /app .

# Expose ports for both API (3001) and Web (3000)
EXPOSE 3000 3001

# Start the specific app
CMD pnpm --filter ${APP_TARGET} start