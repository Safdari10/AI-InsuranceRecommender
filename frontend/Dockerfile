# Stage 1: Build the React application
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

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