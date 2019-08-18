FROM node:12-alpine

RUN apk add --update git
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN yarn test

