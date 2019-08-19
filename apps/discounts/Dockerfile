FROM node:12 as deps

RUN mkdir -p /deps
WORKDIR /deps

# cache
COPY package.json yarn.lock ./
COPY packages/protos/package.json ./packages/protos/package.json
COPY apps/discounts/package.json ./apps/discounts/package.json

RUN yarn --pure-lockfile
### END

FROM node:12 as build

RUN mkdir -p /build
WORKDIR /build

COPY --from=deps /deps/package.json /deps/yarn.lock ./
COPY --from=deps /deps/node_modules ./node_modules

RUN ls ./

COPY packages/protos ./packages/protos

WORKDIR /build/packages/protos
RUN yarn build

COPY apps/discounts /build/apps/discounts
WORKDIR /build/apps/discounts
RUN yarn build

RUN NODE_ENV=production yarn --pure-lockfile
### END

FROM node:12-alpine

RUN mkdir -p /deploy
COPY --from=build /build /deploy

WORKDIR /deploy/apps/discounts

CMD ["yarn", "start"]
