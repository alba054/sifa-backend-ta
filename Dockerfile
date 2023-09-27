FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 9678
CMD ["npm", "run", "start"]