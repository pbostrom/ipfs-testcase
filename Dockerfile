FROM node:8-onbuild

COPY ./upload ./upload
COPY ./index.js .
COPY ./package.json .

RUN npm install
