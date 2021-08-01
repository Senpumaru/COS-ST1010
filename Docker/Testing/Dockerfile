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

# Node build app
RUN npm run build

## Nginx ##
FROM nginx:1.21

COPY --from=Node /usr/app/build /usr/share/nginx/html
COPY ./Nginx/Testing/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]