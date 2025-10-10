# Use Node.js base image
FROM node:16

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the React frontend
RUN cd client || cd src && npm run build || echo "Build skipped"

# Expose port 3000 for Node.js server
EXPOSE 3000

# Start the Express server
CMD ["node", "server/index.js"]
