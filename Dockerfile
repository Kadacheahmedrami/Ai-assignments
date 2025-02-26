# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/

RUN npm config set fetch-timeout 60000

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the app on port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
