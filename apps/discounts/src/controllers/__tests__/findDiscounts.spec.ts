import Mali from 'mali';
import uuid from 'uuid/v4';
import R from 'ramda';
import {
  Discount,
  DiscountRequest,
  FindDiscountsRequest,
  FindDiscountsResponse,
} from '@hash/protos/dist/discounts_pb';
import { memoize } from '@hash/utils';
import { Code } from '@hash/protos/dist/google/code_pb';
import { Status } from '@hash/protos/dist/google/status_pb';
import createFindDiscounts from '../findDiscounts';

const request = async (
  findDiscounts: any,
  pairs: { productId: string; userId: string }[],
  code: Code,
  results: { pct: number; valueInCents: number }[]
) => {
  const request = new FindDiscountsRequest();
  const requestList = pairs.map(({ productId, userId }) => {
    const request = new DiscountRequest();
    request.setProductId(productId);
    request.setUserId(userId);
    return request;
  });
  request.setRequestsList(requestList);

  const context = { req: request } as Mali.Context;
  await findDiscounts(context);
  const response = context.res as FindDiscountsResponse;
  const status = response.getStatus() as Status;
  const discounts = response.getDiscountList();

  expect(status).toBeInstanceOf(Status);
  expect(status.getCode()).toBe(code);

  expect(discounts.length).toBe(pairs.length);
  expect(discounts.length).toBe(results.length);

  R.zip(results, discounts).forEach(([{ pct, valueInCents }, discount]) => {
    expect(discount.getPct()).toBe(pct);
    expect(discount.getValueInCents()).toBe(valueInCents);
  });
};

test('found items', async () => {
  const pairs = [
    { productId: uuid(), userId: uuid() },
    { productId: uuid(), userId: uuid() },
  ];
  const results = [{ pct: 5, valueInCents: 16 }, { pct: 0, valueInCents: 0 }];

  const cache = memoize.cache({ maxSize: 2 });
  const services = {
    findDiscounts: jest.fn(requestedPairs => {
      expect(pairs).toEqual(requestedPairs);
      const discount = new Discount();
      discount.setPct(5);
      discount.setValueInCents(16);
      return Promise.resolve([discount, new Discount()]);
    }),
  };
  const findDiscount = createFindDiscounts({ cache, services });

  await request(findDiscount, pairs, Code.OK, results);

  expect(services.findDiscounts).toHaveBeenCalled();
});
test('is using cache', async () => {
  const pairs = [{ productId: uuid(), userId: uuid() }];
  const results = [{ pct: 3, valueInCents: 15 }];

  const cache = memoize.cache({ maxSize: 2, maxAge: 10000 });
  const services = {
    findDiscounts: jest.fn(() => {
      const discount = new Discount();
      discount.setPct(3);
      discount.setValueInCents(15);
      return Promise.resolve([discount]);
    }),
  };
  const findDiscount = createFindDiscounts({ cache, services });

  await request(findDiscount, pairs, Code.OK, results);
  await request(findDiscount, pairs, Code.OK, results);

  expect(services.findDiscounts).toHaveBeenCalledTimes(1);
});
