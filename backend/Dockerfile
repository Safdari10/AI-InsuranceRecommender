# Base image
FROM node:alpine AS base

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to manage package managers
RUN corepack enable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Compile TypeScript and build the application
RUN pnpm run build

# Final stage
FROM node:alpine AS runtime

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json
COPY --from=base /usr/src/app/package.json ./

# Copy production dependencies
COPY --from=base /usr/src/app/node_modules ./node_modules

# Copy application files
COPY --from=base /usr/src/app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
