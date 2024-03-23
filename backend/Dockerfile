FROM node:20-alpine

WORKDIR /backend

COPY . .
RUN npm install
RUN npx tsc -b

EXPOSE 5000

 CMD  ["node","dist/server.js"]