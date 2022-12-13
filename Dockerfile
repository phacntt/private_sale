FROM node:16-alpine

WORKDIR /privateSale

COPY ./ /privateSale/

RUN npm install
RUN npm run build
