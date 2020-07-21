FROM node:12.18.1-alpine

WORKDIR /nodejs_sequelize_express

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn

CMD [ "yarn","dev" ]

EXPOSE 8080

COPY . .