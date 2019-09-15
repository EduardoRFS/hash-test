import R from 'ramda';
import uuid from 'uuid/v4';
import { User } from '@hash/protos/dist/users_pb';
import { Product } from '@hash/protos/dist/products_pb';
import { Discount } from '@hash/protos/dist/discounts_pb';
import createFindDiscounts from '../findDiscounts';

const assert = async (
  baseProducts: { id: string; priceInCents: number }[],
  baseUsers: { id: string }[],
  pairs: { productId: string; userId: string }[],
  results: { pct: number; valueInCents: number }[]
) => {
  const products = baseProducts.map(({ id, priceInCents }) => {
    const product = new Product();
    product.setId(id);
    product.setPriceInCents(priceInCents);
    return product;
  });
  const users = baseUsers.map(({ id }) => {
    const user = new User();
    user.setId(id);
    return user;
  });
  const findDiscounts = createFindDiscounts({
    services: {
      makeDiscount(product, user) {
        const discount = new Discount();
        const percentage = user ? 5 : 3;
        discount.setPct(percentage);
        discount.setValueInCents(
          product.getPriceInCents() * (percentage / 100)
        );
        return discount;
      },
    },
    models: {
      products: {
        findByIds(ids) {
          expect(ids).toEqual(pairs.map(pair => pair.productId));
          const items = products.filter(product =>
            ids.includes(product.getId())
          );
          const productsById = R.indexBy(product => product.getId(), items);
          return Promise.resolve(productsById);
        },
      },
      users: {
        findByIds(ids) {
          expect(ids).toEqual(pairs.map(pair => pair.userId));
          const items = users.filter(user => ids.includes(user.getId()));
          const usersById = R.indexBy(user => user.getId(), items);
          return Promise.resolve(usersById);
        },
      },
    },
  });

  const discounts = await findDiscounts(pairs);
  expect(discounts.length).toBe(pairs.length);
  expect(discounts.length).toBe(results.length);

  R.zip(results, discounts).forEach(([result, discount]) => {
    expect(discount.getPct()).toBe(result.pct);
    expect(discount.getValueInCents()).toBe(result.valueInCents);
  });
};
test('single discount', async () => {
  const product = { id: uuid(), priceInCents: 200 };
  const user = { id: uuid() };
  await assert(
    [product],
    [user],
    [{ productId: product.id, userId: user.id }],
    [{ pct: 5, valueInCents: 10 }]
  );
});
test('multiple product, single user', async () => {
  const products = [
    { id: uuid(), priceInCents: 300 },
    { id: uuid(), priceInCents: 400 },
    { id: uuid(), priceInCents: 500 },
    { id: uuid(), priceInCents: 600 },
    { id: uuid(), priceInCents: 700 },
  ];
  const user = { id: uuid() };
  await assert(
    products,
    [user],
    [
      { productId: products[1].id, userId: user.id },
      { productId: products[2].id, userId: user.id },
      { productId: products[3].id, userId: user.id },
    ],
    [
      { pct: 5, valueInCents: 20 },
      { pct: 5, valueInCents: 25 },
      { pct: 5, valueInCents: 30 },
    ]
  );
});
test('missing user', async () => {
  const products = [
    { id: uuid(), priceInCents: 300 },
    { id: uuid(), priceInCents: 400 },
    { id: uuid(), priceInCents: 500 },
  ];
  const user = { id: uuid() };
  await assert(
    products,
    [user],
    [
      { productId: products[0].id, userId: user.id },
      // this user doesn't exists
      { productId: products[1].id, userId: uuid() },
      { productId: products[2].id, userId: user.id },
    ],
    [
      { pct: 5, valueInCents: 15 },
      { pct: 3, valueInCents: 12 },
      { pct: 5, valueInCents: 25 },
    ]
  );
});
test('missing product', async () => {
  const products = [
    { id: uuid(), priceInCents: 300 },
    { id: uuid(), priceInCents: 400 },
    { id: uuid(), priceInCents: 500 },
  ];
  const user = { id: uuid() };
  await assert(
    products.slice(1),
    [user],
    [
      // this product isn't available
      { productId: products[0].id, userId: user.id },
      { productId: products[1].id, userId: user.id },
      { productId: products[2].id, userId: user.id },
    ],
    [
      { pct: 0, valueInCents: 0 },
      { pct: 5, valueInCents: 20 },
      { pct: 5, valueInCents: 25 },
    ]
  );
});
