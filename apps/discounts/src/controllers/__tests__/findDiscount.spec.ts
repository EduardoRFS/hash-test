import Mali from 'mali';
import uuid from 'uuid/v4';
import {
  FindDiscountRequest,
  Discount,
  FindDiscountResponse,
} from '@hash/protos/dist/discounts_pb';
import { memoize } from '@hash/utils';
import { Code } from '@hash/protos/dist/google/code_pb';
import { Status } from '@hash/protos/dist/google/status_pb';
import createFindDiscount from '../findDiscount';

const request = async (
  findDiscount: any,
  productId: string,
  userId: string,
  code: Code,
  pct?: number,
  valueInCents?: number
) => {
  const request = new FindDiscountRequest();
  if (productId) {
    request.setProductId(productId);
  }
  if (userId) {
    request.setUserId(userId);
  }
  const context = { req: request } as Mali.Context;
  await findDiscount(context);
  const response = context.res as FindDiscountResponse;
  const status = response.getStatus() as Status;
  const discount = response.getDiscount() as Discount;

  expect(status).toBeInstanceOf(Status);
  expect(status.getCode()).toBe(code);

  expect(discount).toBeInstanceOf(Discount);
  expect(discount.getPct()).toBe(pct);
  expect(discount.getValueInCents()).toBe(valueInCents);
};

test('found items', async () => {
  const productId = uuid();
  const userId = uuid();

  const cache = memoize.cache({ maxSize: 2 });
  const services = {
    findDiscounts: jest.fn(pairs => {
      expect(pairs).toEqual([{ productId, userId }]);
      const discount = new Discount();
      discount.setPct(5);
      return Promise.resolve([discount]);
    }),
  };
  const findDiscount = createFindDiscount({ cache, services });

  await request(findDiscount, productId, userId, Code.OK, 5, 0);

  expect(services.findDiscounts).toHaveBeenCalled();
});
test('is using cache', async () => {
  const productId = uuid();
  const userId = uuid();

  const cache = memoize.cache({ maxSize: 2, maxAge: 10000 });
  const services = {
    findDiscounts: jest.fn(() => {
      const discount = new Discount();
      discount.setPct(3);
      discount.setValueInCents(15);
      return Promise.resolve([discount]);
    }),
  };
  const findDiscount = createFindDiscount({ cache, services });

  await request(findDiscount, productId, userId, Code.OK, 3, 15);
  await request(findDiscount, productId, userId, Code.OK, 3, 15);

  expect(services.findDiscounts).toHaveBeenCalledTimes(1);
});
