# Use the official Node.js image as the build stage
FROM node:alpine AS build

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to manage package managers
RUN corepack enable

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN pnpm run build

# Use the official Nginx image as the runtime stage
FROM nginx:alpine

# Copy the built application from the build stage to the Nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
