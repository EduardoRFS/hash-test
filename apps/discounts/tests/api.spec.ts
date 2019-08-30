import grpc from 'grpc';
import { User } from '@hash/protos/dist/users_pb';
import { Product } from '@hash/protos/dist/products_pb';
import { DiscountRequest } from '@hash/protos/dist/discounts_pb';
import { DiscountsServiceClient } from '@hash/protos/dist/discounts_grpc_pb';
import { withContext as describe } from 'jest-with-context';
import R from 'ramda';
import * as dateMock from 'jest-date-mock';
import uuid from 'uuid/v4';
import { getRepository } from 'typeorm';
import * as models from '../src/models';
import env from '../src/config';
import appPromise from '../src';
import findConnection from '../src/utils/findConnection';

const SERVER_URL = env.listen;
const BLACKFRIDAY = env.discount.blackfriday.day;

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
  service: DiscountsServiceClient;
  products: Product[];
  product: Product;
  users: User[];
  user: User;
}
const setup = async (state: Context): Promise<Context> => {
  const creatService = () =>
    new DiscountsServiceClient(SERVER_URL, grpc.credentials.createInsecure());
  const createProduct = (n: number) => {
    const product = new Product();
    product.setId(uuid());
    product.setPriceInCents((n + 1) * 1e3);
    product.setTitle(`Produto ${n + 1}`);
    product.setDescription("Don' buy this");
    return product;
  };
  const createUser = (n: number) => {
    const user = new User();
    user.setId(uuid());
    user.setFirstName('User');
    user.setLastName(`${n}`);
    user.setDateOfBirth(Date.now() - Math.random() * 1e12);
    return user;
  };
  const saveProducts = (products: Product[]) => {
    const connection = findConnection(models.Product);
    const repo = getRepository(models.Product, connection);
    const productsModels = products.map(product => {
      const model = new models.Product();
      return Object.assign(model, product.toObject());
    });
    return repo.save(productsModels);
  };
  const saveUsers = (users: User[]) => {
    const connection = findConnection(models.User);
    const repo = getRepository(models.User, connection);
    const usersModels = users.map(user => {
      const model = new models.User();
      return Object.assign(model, user.toObject(), {
        dateOfBirth: new Date(user.getDateOfBirth()),
      });
    });
    return repo.save(usersModels);
  };

  await dateMock.clear();
  await jest.spyOn(global.console, 'error').mockImplementation();
  await jest.spyOn(global.console, 'info').mockImplementation();

  await appPromise;

  const service = state ? state.service : creatService();

  const products = R.times(createProduct, 10);
  const users = R.times(createUser, 10);

  await Promise.all([saveProducts(products), saveUsers(users)]);

  return { service, products, users, product: products[0], user: users[0] };
};

describe<Context>('getDiscount', ({ test, beforeEach }) => {
  beforeEach(setup);
  test('no data', async ({ service }) => {
    const request = createDiscountRequest();
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toEqual({ pct: 0, valueInCents: 0 });
  });
  test('only product', async ({ service, product }) => {
    const request = createDiscountRequest({ product });
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toEqual({ pct: 0, valueInCents: 0 });
  });
  test('only user', async ({ service, user }) => {
    const request = createDiscountRequest({ user });
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toEqual({ pct: 0, valueInCents: 0 });
  });
  test('no discount', async ({ service, product, user }) => {
    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    expect(discount.toObject()).toEqual({ pct: 0, valueInCents: 0 });
  });
  test('birthday 5%', async ({ service, product, user }) => {
    dateMock.advanceTo(user.getDateOfBirth());

    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    const valueInCents = Math.round(product.getPriceInCents() * 0.05);
    expect(discount.toObject()).toEqual({ pct: 5, valueInCents });
  });
  test('blackfriday', async ({ service, product, user }) => {
    dateMock.advanceTo(BLACKFRIDAY);

    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    const valueInCents = Math.round(product.getPriceInCents() * 0.1);
    expect(discount.toObject()).toEqual({ pct: 10, valueInCents });
  });
  test('max percentage, blackfriday and birthday', async ({
    service,
    product,
    user,
  }) => {
    dateMock.advanceTo(BLACKFRIDAY);
    user.setDateOfBirth(BLACKFRIDAY.getTime());

    const request = createDiscountRequest({ product, user });
    const discount = await service.getDiscount(request);

    const valueInCents = Math.round(product.getPriceInCents() * 0.1);
    expect(discount.toObject()).toEqual({ pct: 10, valueInCents });
  });
});
describe<Context>('listDiscount', ({ test, beforeEach }) => {
  beforeEach(setup);
  test('multiple users and products', async ({ service, products, users }) => {
    const [, user] = users;
    const [, product] = products;
    dateMock.advanceTo(user.getDateOfBirth());

    const stream = service.listDiscounts();

    R.zip(products, users).forEach(([product, user]) => {
      const request = createDiscountRequest({ product, user });
      stream.write(request);
    });
    stream.end();

    const expected = R.times(() => ({ pct: 0, valueInCents: 0 }), users.length);
    expected[1] = { pct: 5, valueInCents: product.getPriceInCents() * 0.05 };

    for await (const discount of stream) {
      expect(discount.toObject()).toEqual(expected.shift());
    }
  });
});
describe<Context>('logRequests', ({ test, beforeEach }) => {
  beforeEach(setup);
  test('on error', async ({ service, user }) => {
    const fn = global.console.error as jest.Mock;
    fn.mockImplementationOnce((data: { error: Error }) => {
      expect(data.error).toBeInstanceOf(Error);
    });

    user.setId('some invalid id');
    const request = createDiscountRequest({ user });

    const promise = service.getDiscount(request);
    await expect(promise).rejects.toBeInstanceOf(Error);
  });
});
afterAll(async () => {
  const { server, connections } = await appPromise;
  server.tryShutdown(() => {});
  connections.forEach(conn => conn.close());
});
