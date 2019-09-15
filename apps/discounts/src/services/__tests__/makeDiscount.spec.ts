import { Discount } from '@hash/protos/dist/discounts_pb';
import { Product } from '@hash/protos/dist/products_pb';
import { User } from '@hash/protos/dist/users_pb';
import createMakeDiscount from '../makeDiscount';
import { Rules, Rule } from '../rules';

const assert = (
  rules: Rules,
  priceInCents: number,
  dateOfBirth: number,
  pct: number,
  valueInCents: number
) => {
  const makeDiscount = createMakeDiscount({ services: { rules } });
  const product = new Product();
  product.setPriceInCents(priceInCents);

  const user = new User();
  user.setDateOfBirth(dateOfBirth);

  const discount = makeDiscount(product, user);

  expect(discount.getPct()).toBe(pct);
  expect(discount.getValueInCents()).toBe(valueInCents);
};
// minus ten cents if is divisible by 100, ex: 6 became 5.90
const baseRule: Rule = ({ product }) => {
  const priceInCents = product.getPriceInCents();
  if (priceInCents % 100 === 0) {
    const discount = new Discount();
    discount.setPct(0);
    discount.setValueInCents(10);
    return discount;
  }
  return null;
};
test('no rule', () => {
  assert({}, 16, Date.now(), 0, 0);
});
test('single rule', () => {
  assert({ baseRule }, 600, Date.now(), 0, 10);
  assert({ baseRule }, 605, Date.now(), 0, 0);
});
test('dependent rule', () => {
  const ruleA: Rule = ({ product }) => {
    const priceInCents = product.getPriceInCents();
    if (priceInCents < 1000) {
      const discount = new Discount();
      discount.setPct(3);
      discount.setValueInCents(priceInCents * 0.03);
      return discount;
    }
    return null;
  };
  const biggest: Rule = ({ previous }) => {
    const discounts = Object.values(previous).filter(Boolean) as Discount[];
    return discounts.reduce((acc, current) =>
      current.getPct() >= acc.getPct() ? current : acc
    );
  };
  assert({ baseRule, ruleA, biggest }, 100, Date.now(), 3, 3);
  assert({ baseRule, ruleA, biggest }, 10000, Date.now(), 0, 10);
});
