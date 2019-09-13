import { Discount } from '@hash/protos/dist/discounts_pb';
import R from 'ramda';
import User from '../services/User';
import Product from '../services/Product';
import rules from './discountRules';
import { Context } from './interfaces';

const findDiscount = (product: Product, user: User) => {
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
export default findDiscount;
