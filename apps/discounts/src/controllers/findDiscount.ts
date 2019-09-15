import * as yup from 'yup';
import compose from '@malijs/compose';
import { createRespond, createValidation, memoize } from '@hash/utils';
import { FindDiscountResponse } from '@hash/protos/dist/discounts_pb';
import { FindDiscount } from './interfaces';
import { FindDiscounts } from '../services/findDiscounts';

interface DI {
  cache: memoize.Cache;
  services: {
    findDiscounts: FindDiscounts;
  };
}
export default ({ cache, services }: DI) => {
  const { ok } = createRespond(FindDiscountResponse);
  const validate = createValidation(
    FindDiscountResponse,
    yup.object({
      productId: yup.string().required(),
      userId: yup.string().required(),
    })
  );

  const findDiscount: FindDiscount = async ctx => {
    const productId = ctx.req.getProductId();
    const userId = ctx.req.getUserId();

    const [discount] = await services.findDiscounts([{ productId, userId }]);
    ctx.res = ok(res => res.setDiscount(discount));
  };
  return memoize(compose([validate, findDiscount]), cache);
};
