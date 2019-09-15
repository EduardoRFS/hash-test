## To ask

- some images
- fix typeorm scripts
- what happen if a service dies then you try to make a request, grpc-node
- why discount can be negative?
- multitier architecture
- flertar com flat structure
- global error handling
- why idLength not hard coded
- readme utils
- logger users
- soft delete
- why i'm using postgres?
- pagination users
- run tests in different databases
- rpc authentication?
- why get the product two times?
- think about cupom code and default discount
- what if user_id or product_id doesn't exists? HA
- why use a lib when microservices(type consistency and compatibility, auto break shit)
- discount without product or without user
- new field: total_pct, like min is 90%
- new rule: perhaps discount list?
- new rule: max_discount in cents
- new rule: discount in cents
- should be /products
- is valueInCents of total or the discount value?
- send price instead of product_id?
- protos as source of types
- name choice weird, value for discount and price for product?
- each one should hit it's only db
- User managemet
- Products management
- Discounts logics
- max price = 2^31 / 100
- why it doesn't have a stream or array request?

## TODO

- with DI I can transform apps in libraries
- improve memoize and typings
- write readmes
- lerna
- improvements tests uses env data

## Review

- migrations on every run? Seriously?
- probably will need to have discounts based on category that's why we have product_id
- logs aren't optional, because what if it breaks in production
- discount should be float?
- date of birth because birthday seens like only the day
- reason of discount

## Grr

- date as int scalar
- custom value for date

## I think that is fine

- ~~run tests on docker db~~ run with ./populate.sh
- missing cors
- I don't know if I need to get the product again
- how to describe parallel operations in this diagram
- because database matches response, view isn't necessary
- sudo apt install protobuf-compiler-grpc protobuf-compiler
- date int64 because makes it universally available a single data type

## Done

- review all package.json
- check dependencies
- ideally deploy should have the same setting as development
- ~~script populate table~~ tests already do that
- ~~alpine breaks protoc~~ multistage build
- moment is huge, but ~~date-fns 2 is still in beta~~ was
- static generated grpc
- sync protos with typescript
- migrations
- ~~remove my github references on grpc~~
- ~~usage of grpc-tools is terrible getId()? grr~~
- ~~typescript because grpc-tools sucks~~
- link all deps with yarn workspaces
- text because fixed varchar isn't faster
- uuid because it's easier to scale
- ~~wrappers because of missing promises~~
- ~~accept multiples products, and multiple users~~
- setup local env
- ~~env for tests~~
- ~~probably stream by chunks~~
- business in e2e because it was easy
