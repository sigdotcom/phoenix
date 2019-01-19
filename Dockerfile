FROM node:latest

WORKDIR /server

COPY . /server 
ADD package.json /server/package.json
RUN yarn --ignore-engines install

EXPOSE 3000
CMD yarn typecli migration:run && yarn --ignore-engines start:dev
