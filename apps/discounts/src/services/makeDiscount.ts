import R from 'ramda';
import { User } from '@hash/protos/dist/users_pb';
import { Product } from '@hash/protos/dist/products_pb';
import { Discount } from '@hash/protos/dist/discounts_pb';
import { Context } from './interfaces';
import { Rules } from './rules';

export type MakeDiscount = (product: Product, user?: User) => Discount;

interface DI {
  services: {
    rules: Rules;
  };
}
export default ({ services }: DI) => {
  const makeDiscount: MakeDiscount = (product, user) => {
    const initial: Context = { product, user, previous: {} };
    const { previous } = Object.entries(services.rules).reduce(
      (context, [key, rule]) => ({
        ...context,
        previous: {
          ...context.previous,
          [key]: rule(context),
        },
      }),
      initial
    );
    return R.last(Object.values(previous)) || new Discount();
  };
  return makeDiscount;
};
