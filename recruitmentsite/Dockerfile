
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
# Expose the Next.js default port
# Expose port 80 for the application
EXPOSE 8087


RUN npm run build

# Define the command to run the app
CMD ["npm", "run", "start"]