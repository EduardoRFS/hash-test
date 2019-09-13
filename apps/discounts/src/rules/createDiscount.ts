import { Discount } from '@hash/protos/dist/discounts_pb';
import Product from '../services/Product';

// pct as percentage, like 5%
const createDiscount = (product: Product, pct: number) => {
  const { priceInCents } = product;
  const discount = new Discount();

  const discountValue = Math.round(priceInCents * (pct / 100));
  discount.setPct(pct);
  discount.setValueInCents(discountValue);
  return discount;
};
export default createDiscount;
