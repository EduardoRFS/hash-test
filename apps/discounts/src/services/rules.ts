import { isToday } from 'date-fns';
import { Dictionary } from 'ts-essentials';
import { Product } from '@hash/protos/dist/products_pb';
import { Discount } from '@hash/protos/dist/discounts_pb';
import { Config } from '../config';
import { Context } from './interfaces';

export type Rule = (context: Context) => Discount | null;
export type Rules = Dictionary<Rule>;

interface DI {
  config: {
    discount: Config['discount'];
  };
}
export default ({ config }: DI) => {
  const createDiscount = (product: Product, percentage: number) => {
    const priceInCents = product.getPriceInCents();
    const discount = new Discount();

    const discountValue = Math.floor(priceInCents * (percentage / 100));
    discount.setPct(percentage);
    discount.setValueInCents(discountValue);
    return discount;
  };

  const birthday: Rule = ({ user, product }) => {
    if (!user) {
      return null;
    }

    const PERCENTAGE = config.discount.birthday.percentage;
    const dateOfBirth = user.getDateOfBirth();
    return isToday(dateOfBirth) ? createDiscount(product, PERCENTAGE) : null;
  };
  const blackfriday: Rule = ({ product }) => {
    const PERCENTAGE = config.discount.blackfriday.percentage;
    const BLACKFRIDAY = config.discount.blackfriday.day;
    return isToday(BLACKFRIDAY) ? createDiscount(product, PERCENTAGE) : null;
  };
  const maxPercentage: Rule = ({ product, previous }) => {
    const MAX_PERCENTAGE = config.discount.max.percentage;

    const previousPercentage = Object.values(previous)
      .map(discount => (discount ? discount.getPct() : 0))
      .reduce((a, b) => Math.max(a, b), 0);

    const percentage = Math.min(MAX_PERCENTAGE, previousPercentage);
    return createDiscount(product, percentage);
  };

  // all engines guarantee order for non numeric index
  return { birthday, blackfriday, maxPercentage };
};
