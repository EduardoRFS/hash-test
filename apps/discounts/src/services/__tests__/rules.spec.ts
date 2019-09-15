import * as dateMock from 'jest-date-mock';
import { Dictionary } from 'ts-essentials';
import { Discount } from '@hash/protos/dist/discounts_pb';
import { Product } from '@hash/protos/dist/products_pb';
import { User } from '@hash/protos/dist/users_pb';
import config from '../../config';
import createRules from '../rules';

const createContext = (
  priceInCents: number,
  dateOfBirth: number | undefined,
  previous: Dictionary<Discount | null>
) => {
  const product = new Product();
  product.setPriceInCents(priceInCents);

  if (dateOfBirth) {
    const user = new User();
    user.setDateOfBirth(dateOfBirth);
    return { product, user, previous };
  }

  return { product, previous };
};
const assert = (discount: Discount, value: number, percentage: number) => {
  expect(discount).toBeInstanceOf(Discount);
  expect(discount.getPct()).toBe(percentage);
  expect(discount.getValueInCents()).toBe(value * (percentage / 100));
};
const rules = createRules({ config });

beforeEach(() => {
  dateMock.clear();
});
describe('birthday', () => {
  const { percentage } = config.discount.birthday;

  test('is birthday', () => {
    const context = createContext(1300, Date.now(), {});
    const discount = rules.birthday(context) as Discount;
    assert(discount, 1300, percentage);
  });
  test('not birthday', () => {
    dateMock.advanceTo(new Date('14-09-2019'));

    const birthday = new Date('11-01-1999').getTime();
    const context = createContext(1000, birthday, {});
    const discount = rules.birthday(context) as Discount;
    expect(discount).toBeNull();
  });
  test('missing user', () => {
    const context = createContext(1000, undefined, {});
    const discount = rules.birthday(context) as Discount;
    expect(discount).toBeNull();
  });
});
describe('blackfriday', () => {
  const { percentage, day } = config.discount.blackfriday;

  test('is blackfriday', () => {
    dateMock.advanceTo(day);

    const context = createContext(1600, Date.now(), {});
    const discount = rules.blackfriday(context) as Discount;
    assert(discount, 1600, percentage);
  });
  test('not blackfriday', () => {
    dateMock.advanceTo(new Date('14-09-2019'));

    const context = createContext(1500, Date.now(), {});
    const result = rules.blackfriday(context) as Discount;
    expect(result).toBeNull();
  });
});
describe('maxPercantage', () => {
  const { percentage } = config.discount.max;

  test('no previous', () => {
    const context = createContext(1000, Date.now(), {});
    const result = rules.maxPercentage(context) as Discount;
    expect(result.getPct()).toBe(0);
  });
  test('multiple previous', () => {
    const price = 1000;
    const potato = new Discount();
    potato.setPct(2);
    potato.setValueInCents(price * 0.02);

    const orange = new Discount();
    orange.setPct(3);
    orange.setValueInCents(price * 0.03);

    const context = createContext(price, Date.now(), {
      potato,
      nothing: null,
      orange,
    });
    const discount = rules.maxPercentage(context) as Discount;

    assert(discount, price, 3);
  });
  test('over limit discount', () => {
    const price = 2000;
    const pct = percentage * 2;

    const apple = new Discount();
    apple.setPct(pct);
    apple.setValueInCents(price * (pct / 100));

    const context = createContext(price, Date.now(), { apple });
    const discount = rules.maxPercentage(context) as Discount;

    assert(discount, price, percentage);
  });
});
