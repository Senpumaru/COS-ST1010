## Node ##
FROM node:16.5.0-alpine as Node

# Working directory
WORKDIR /usr/app

# Copy dependencies
COPY ./package.json ./
COPY ./package-lock.json ./

# Install React App
RUN npm ci --silent

# Copy 
COPY . .

EXPOSE 3000

# Start React App
CMD ["npm", "start"]