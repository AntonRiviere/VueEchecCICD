FROM node as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/build ./build

EXPOSE 8080
CMD [ "node", "build/index.js" ]