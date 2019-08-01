- pagination
- authentication
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

how to describe parallel operations in this diagram

- new rule: max_discount in cents
- new rule: discount in cents

## TODO: ? 3 services

- User managemet
- Products management
- Discounts logics
