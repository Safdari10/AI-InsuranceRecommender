# Stage 1: Build the React application
FROM node AS build

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to manage package managers
RUN corepack enable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Debug step: List contents of node_modules
RUN ls -la node_modules

# Debug step: List contents of node_modules/vite/bin
RUN ls -la node_modules/vite/bin || echo "vite not found"

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the built files using nginx
FROM nginx:alpine

# Copy the built files from the previous stage to the nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]