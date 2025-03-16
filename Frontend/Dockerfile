# Use Node.js as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Expose the port the React app runs on
EXPOSE 3000

# Start the React frontend
CMD ["npm", "start"]
