# Start with Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of frontend code
COPY . .

# Expose Vite's dev port
EXPOSE 5173

# Run the dev server (--host makes it accessible from outside container)
CMD ["npm", "run", "dev", "--", "--host"]
