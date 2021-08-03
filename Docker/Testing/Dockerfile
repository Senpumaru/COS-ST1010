## Node ##
FROM node:16.5.0-alpine as Node


# Set env variable
ARG REACT_APP_DEBUG
ENV REACT_APP_DEBUG=$REACT_APP_DEBUG

# that will be empty
RUN echo "DEBUG": $REACT_APP_DEBUG

# Working directory
WORKDIR /usr/app

# Copy dependencies
COPY ./package.json ./
COPY ./package-lock.json ./

# Install React App
RUN npm install

# Copy 
COPY . .

ARG REACT_APP_HOST_IP_ADDRESS

ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS

# Node build app
RUN npm run build

## Nginx ##
FROM nginx:1.21

ENV TEST2=Test2

COPY --from=Node /usr/app/build /usr/share/nginx/html
COPY ./Nginx/Testing/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]