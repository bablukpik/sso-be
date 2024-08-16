FROM node:18.18.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Expose port to the outside world
EXPOSE 8000

CMD ["npm", "start"]
