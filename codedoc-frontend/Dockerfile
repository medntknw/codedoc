# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and src and public files
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

# Install dependencies
RUN npm install

# Run React app
CMD ["npm", "start"]
