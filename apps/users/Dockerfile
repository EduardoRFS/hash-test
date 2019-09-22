FROM node:12 as build

RUN mkdir -p /build
WORKDIR /build

# cache deps
COPY package.json yarn.lock ./
COPY packages/utils/package.json ./packages/utils/package.json
COPY packages/protos/package.json ./packages/protos/package.json
COPY apps/users/package.json ./apps/users/package.json
RUN yarn --pure-lockfile

# proto
COPY packages/protos /build/packages/protos
WORKDIR /build/packages/protos
RUN yarn build

# utils
COPY packages/utils /build/packages/utils
WORKDIR /build/packages/utils
RUN yarn build

# users
COPY apps/users /build/apps/users
WORKDIR /build/apps/users
RUN yarn build

# clean deps
WORKDIR /build
RUN NODE_ENV=production yarn --pure-lockfile

FROM node:12-alpine

RUN mkdir -p /deploy
COPY --from=build /build /deploy

WORKDIR /deploy/apps/users

CMD ["yarn", "start"]
