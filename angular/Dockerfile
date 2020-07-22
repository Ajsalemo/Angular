# Import the Alpine base image as 'node'
FROM node:12-alpine as node

# Set the working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install NPM dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build the project
RUN npm run build

# Stage 2 - Import NGINX
FROM nginx:1.19.0-alpine

# Copy the NGINX conf file into the image
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the dist files into the NGINX public folder
COPY --from=node src/app/dist/Angular /usr/share/nginx/html



