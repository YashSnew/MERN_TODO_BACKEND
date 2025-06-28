# Use official Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Expose your app port (adjust if needed)
EXPOSE 3009

# Start the app with nodemon
CMD ["nodemon", "server.js"]
