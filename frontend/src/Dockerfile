FROM node:alpine3.19

WORKDIR /code

COPY public/ /code/public
COPY src/ /code/src
COPY package.json /code/package.json

RUN npm install

CMD ["npm", "start"]