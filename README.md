- pagination
- rpc authentication?
- accept multiples products, and multiple users

- discount should be float?

- why get the product two times?
- probably stream by chunks
- reason of discount

- I don't know if I need to get the product again

- think about cupom code and default discount

- probably will need to have discounts based on category that's why we have product_id
- should be /products

- what if user_id or product_id doesn't exists? HA
- sync protos with typescript
- static generated grpc

- how to describe parallel operations in this diagram
- why use a lib when microservices(type consistency and compatibility, auto break shit)

- discount without product or without user

- max price = 2^31 / 100

- improvements tests uses env data

- moment is huge, but date-fns 2 is still in beta

- date of birth because birthday seens like only the day

- check dependencies
- custom value for date
- date int64 because makes it universally available a single data type
- business in e2e because it was easy
- env for tests
- is valueInCents of total or the discount value?
- send value instead of product_id?
- lerna

- name choice weird, value for discount and price for product?
- uuid because it's easier to scale
- text because fixed varchar isn't faster

- protos as source of types
- sudo apt install protobuf-compiler-grpc protobuf-compiler

- usage of grpc-tools is terrible getId()? grr
- typescript because grpc-tools sucks
- wrappers because of missing promises
- remove my github references on grpc
- date as int scalar

- link all deps with yarn workspaces
- review all package.json

- because database matches response, view isn't necessary

- migrations
- missing cors

- new field: total_pct, like min is 90%
- new rule: perhaps discount list?
- new rule: max_discount in cents
- new rule: discount in cents

## TODO: ? 3 services

- each one should hit it's only db
- User managemet
- Products management
- Discounts logics
