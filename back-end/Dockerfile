FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm ci --only=production
RUN npm i

COPY build scripts

CMD [ "npm", "run", "start-prod" ]