import { Discount, DiscountRequest } from '@hash/protos/dist/discounts_pb';
import { isToday } from 'date-fns';
import { Dictionary } from 'ts-essentials';
import R from 'ramda';
import env from '../../environment';
import User from '../models/User';
import Product from '../models/Product';
import findByIds from '../utils/findByIds';

// TODO: think about this file more, it doesn't seems fine

interface Context {
  readonly user: User;
  readonly product: Product;
  readonly previous: Dictionary<Discount | null>;
}
// null when doesn't apply to it
type Rule = (context: Context) => Discount | null;
type Rules = Dictionary<Rule>;

// pct as percentage, like 5%
const createDiscount = (product: Product, pct: number) => {
  const { priceInCents } = product;
  const discount = new Discount();

  const discountValue = Math.round(priceInCents * (pct / 100));
  discount.setPct(pct);
  discount.setValueInCents(discountValue);
  return discount;
};

const birthday: Rule = ({ user, product }) => {
  const PERCENTAGE = env.discount.birthday.percentage;
  const { dateOfBirth } = user;
  return isToday(dateOfBirth) ? createDiscount(product, PERCENTAGE) : null;
};
const blackfriday: Rule = ({ product }) => {
  const PERCENTAGE = env.discount.blackfriday.percentage;
  const BLACKFRIDAY = env.discount.blackfriday.day;
  return isToday(BLACKFRIDAY) ? createDiscount(product, PERCENTAGE) : null;
};
const maxPercentage: Rule = ({ product, previous }) => {
  const MAX_PERCENTAGE = env.discount.max.percentage;

  const previousPercentage = Object.values(previous)
    .map(discount => (discount ? discount.getPct() : 0))
    .reduce((a, b) => Math.max(a, b), 0);

  const percentage = Math.min(MAX_PERCENTAGE, previousPercentage);
  return createDiscount(product, percentage);
};

// as of es6 all engines guarantee order for non numeric index
const rules: Rules = { birthday, blackfriday, maxPercentage };

export const findDiscount = (product: Product, user: User) => {
  const initial: Context = { product, user, previous: {} };
  const { previous } = Object.entries(rules).reduce(
    (context, [key, rule]) => ({
      ...context,
      previous: {
        ...context.previous,
        [key]: rule(context),
      },
    }),
    initial
  );
  return R.last(Object.values(previous)) as Discount;
};
export const process = async (requests: DiscountRequest[]) => {
  const productIds = requests.map(request => request.getProductId());
  const userIds = requests.map(request => request.getUserId());

  const [products, users] = await Promise.all([
    findByIds(Product, productIds),
    findByIds(User, userIds),
  ]);
  return R.zip(products, users).map(
    ([product, user]): Discount => {
      if (product && user) {
        return findDiscount(product, user);
      }
      return new Discount();
    }
  );
};
