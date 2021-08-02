## Node ##
FROM node:16.5.0-alpine as Node

# Working directory
WORKDIR /usr/app

## Dependencies ##
RUN apk update \
    # Git
    && apk add git

# Copy dependencies
COPY ./package.json ./
COPY ./package-lock.json ./

# Environment values
ENV REACT_APP_API_SERVER=http://0.0.0.0/

# Install React App
RUN npm ci --silent

# Copy 
COPY . .

EXPOSE 3000

# Start React App
CMD ["npm", "start"]