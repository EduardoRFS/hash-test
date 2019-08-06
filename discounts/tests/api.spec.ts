import grpc from 'grpc';
import { User } from '@hash/protos/dist/users_pb';
import { Product } from '@hash/protos/dist/products_pb';
import { DiscountRequest } from '@hash/protos/dist/discounts_pb';
import { DiscountsServiceClient } from '@hash/protos/dist/discounts_grpc_pb';
import * as stream from 'stream';
import { promisify } from 'util';
import { withContext as describe } from 'jest-with-context';
import mongodb from 'mongodb';
import R from 'ramda';
import dateMock from 'jest-date-mock';

const finished = promisify(stream.finished);

const MONGO_URL = 'mongodb://localhost';
const MONGO_DB = 'test';
const SERVER_URL = 'localhost:5000';
const BLACKFRIDAY = new Date(2019, 11, 25, 0, 0, 0).getTime();

const createDiscountRequest = (
  opts: {
    product?: Product;
    user?: User;
  } = {}
): DiscountRequest => {
  const { product, user } = opts;
  const request = new DiscountRequest();
  if (product) {
    request.setProductId(product.getId());
  }
  if (user) {
    request.setUserId(user.getId());
  }
  return request;
};
interface Context {
  db: mongodb.Db;
  service: DiscountsServiceClient;
  products: Product[];
  product: Product;
  users: User[];
  user: User;
}
const setup = async <T>(state: Context): Promise<Context> => {
  dateMock.clear();

  const createDB = async () => {
    const client = await mongodb.connect(MONGO_URL, { useNewUrlParser: true });
    return client.db(MONGO_DB);
  };
  const creatService = () =>
    new DiscountsServiceClient(SERVER_URL, grpc.credentials.createInsecure());
  const createProduct = (n: number) => {
    const product = new Product();
    product.setId(`product:${Math.random()}`);
    product.setPriceInCents((n + 1) * 10);
    product.setTitle(`Produto ${n + 1}`);
    product.setDescription("Don' buy this");
    return product;
  };
  const createUser = (n: number) => {
    const user = new User();
    user.setId(`user:${Math.random()}`);
    user.setFirstName('User');
    user.setLastName(`${n}`);
    user.setDateOfBirth(Date.now() - Math.random() * 1e12);
    return user;
  };
  const db = state.db || (await createDB());
  const service = state.service || creatService();

  const products = R.times(createProduct, 10);
  const users = R.times(createUser, 10);

  await Promise.all([
    db.collection('products').save(products.map(prod => prod.toObject())),
    db.collection('users').save(users.map(user => user.toObject())),
  ]);

  return { db, service, products, users, product: products[0], user: users[0] };
};

describe<Context>('getDiscount', ({ test, beforeEach }) => {
  beforeEach(setup);
  test('no data', async ({ service }) => {
    const request = createDiscountRequest();
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toBe({ pct: 0, valueInCents: 0 });
  });
  test('only product', async ({ service, product }) => {
    const request = createDiscountRequest({ product });
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toBe({ pct: 0, valueInCents: 0 });
  });
  test('only user', async ({ service, user }) => {
    const request = createDiscountRequest({ user });
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toBe({ pct: 0, valueInCents: 0 });
  });
  test('no discount', async ({ service, product, user }) => {
    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toBe({ pct: 0, valueInCents: 0 });
  });
  test('birthday 5%', async ({ service, product, user }) => {
    dateMock.advanceTo(user.getDateOfBirth());

    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    const valueInCents = product.getPriceInCents() * 0.05;
    expect(discount.toObject()).toBe({ pct: 5, valueInCents });
  });
  test('blackfriday', async ({ service, product, user }) => {
    dateMock.advanceTo(BLACKFRIDAY);

    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    const valueInCents = product.getPriceInCents() * 0.1;
    expect(discount.toObject()).toBe({ pct: 10, valueInCents });
  });
  test('max percentage, blackfriday and birthday', async ({
    service,
    product,
    user,
  }) => {
    dateMock.advanceTo(BLACKFRIDAY);
    user.setDateOfBirth(BLACKFRIDAY);

    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    const valueInCents = product.getPriceInCents() * 0.1;
    expect(discount.toObject()).toBe({ pct: 10, valueInCents });
  });
});
describe<Context>('listDiscount', ({ test, beforeEach }) => {
  beforeEach(setup);
  test('multiple users and products', async ({ service, products, users }) => {
    const [, user] = users;
    const [, product] = products;
    dateMock.advanceTo(user.getDateOfBirth());

    const stream = await service.listDiscounts();

    R.zip(products, users).forEach(([product, user]) => {
      const request = createDiscountRequest({ product, user });
      stream.write(request);
    });

    const expected = R.times(() => ({ pct: 0, valueInCents: 0 }), users.length);
    expected[1] = { pct: 5, valueInCents: product.getPriceInCents() * 0.05 };

    stream.on('data', discount => {
      expect(discount.toObject()).toBe(expected.shift());
    });

    await finished(stream);
  });
});
