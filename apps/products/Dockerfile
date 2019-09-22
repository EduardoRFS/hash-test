FROM node:12 as protos

RUN mkdir -p /protos
WORKDIR /protos

COPY package.json yarn.lock ./
COPY packages/protos/package.json ./packages/protos/package.json
RUN yarn --pure-lockfile

COPY packages/protos /protos/packages/protos
WORKDIR /protos/packages/protos
RUN yarn build

RUN NODE_ENV=production yarn --pure-lockfile

FROM golang:1.13-alpine as build

RUN mkdir -p /build
COPY --from=protos /protos/packages/protos/dist /build/packages/protos/dist
COPY go.mod go.sum /build/

COPY apps/products /build/apps/products

WORKDIR /build/apps/products
RUN go build

FROM alpine

RUN mkdir -p /deploy
COPY --from=build /build/apps/products/products /deploy/products

CMD ["/deploy/products"]
