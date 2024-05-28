FROM node:20.12.2-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3099

CMD ["node", "local_server.js"]
