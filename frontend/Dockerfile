FROM node:18.15.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install serve

EXPOSE 6000

CMD ["./node_modules/.bin/serve", "-s", "build", "-l", "6000"]
