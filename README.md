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

- send value instead of product_id?
- lerna

- protos as source of types
- sudo apt install protobuf-compiler-grpc protobuf-compiler

- usage of grpc-tools is terrible getId()? grr
- typescript because grpc-tools sucks
- wrappers because of missing promises
- remove my github references on grpc

- new field: total_pct, like min is 90%
- new rule: perhaps discount list?
- new rule: max_discount in cents
- new rule: discount in cents

## TODO: ? 3 services

- User managemet
- Products management
- Discounts logics
