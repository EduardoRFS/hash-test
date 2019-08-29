FROM node:12 as build

RUN mkdir -p /build
WORKDIR /build

# cache deps
COPY package.json yarn.lock ./
COPY packages/protos/package.json ./packages/protos/package.json
COPY apps/discounts/package.json ./apps/discounts/package.json
RUN yarn --pure-lockfile

# proto
COPY packages/protos /build/packages/protos
WORKDIR /build/packages/protos
RUN yarn build

# discounts
COPY apps/discounts /build/apps/discounts
WORKDIR /build/apps/discounts
RUN yarn build

# clean deps
WORKDIR /build
RUN NODE_ENV=production yarn --pure-lockfile

FROM node:12-alpine

RUN mkdir -p /deploy
COPY --from=build /build /deploy

WORKDIR /deploy/apps/discounts

CMD ["yarn", "start"]
