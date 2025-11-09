# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Copy only manifests first (for better caching)
COPY unit-economics-calculator/package.json unit-economics-calculator/pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# Copy the rest of the app
COPY unit-economics-calculator/ ./

# Build Vite app
RUN pnpm run build

# ---- Runtime stage ----
FROM node:22-alpine
WORKDIR /app

RUN npm install -g serve

# Static files from build stage
COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
