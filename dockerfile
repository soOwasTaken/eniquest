# Use Node Alpine 18 as base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the entire project into the container
COPY . .

# Install dependencies in the website directory
RUN cd website && npm install


# Install dependencies in the frontend directory

RUN cd website/frontend && npm install


# Set the working directory to the website directory
WORKDIR /app/website/frontend

RUN npm run build-only

WORKDIR /app/website

# Expose the ports that your app uses
EXPOSE 3000

# Command to run your app

# Set environment variables for debugging
# NODE_ENV is a common setting, 'development' is more verbose for debugging

ENV NODE_ENV=development
# Increase memory limit (optional, adjust as needed)
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Start the application
CMD ["node", "--trace-warnings", "index.js"]
