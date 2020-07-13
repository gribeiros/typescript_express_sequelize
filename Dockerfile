FROM node:12.18.1-alpine

WORKDIR /nodejs_sequelize_express

COPY package*.json ./
RUN yarn

EXPOSE 8080

COPY . .