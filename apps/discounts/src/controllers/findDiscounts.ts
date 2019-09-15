import * as yup from 'yup';
import compose from '@malijs/compose';
import { createRespond, createValidation, memoize } from '@hash/utils';
import { FindDiscountsResponse } from '@hash/protos/dist/discounts_pb';
import { FindDiscounts } from './interfaces';
import { FindDiscounts as FindDiscountsService } from '../services/findDiscounts';

interface DI {
  cache: memoize.Cache;
  services: {
    findDiscounts: FindDiscountsService;
  };
}

export default ({ cache, services }: DI) => {
  const { ok } = createRespond(FindDiscountsResponse);
  const validate = createValidation(
    FindDiscountsResponse,
    yup.object({
      requests: yup.array().of(
        yup
          .object({
            productId: yup.string().required(),
            userId: yup.string().required(),
          })
          .required()
      ),
    })
  );

  const findDiscounts: FindDiscounts = async ctx => {
    const requests = ctx.req
      .getRequestsList()
      .map(request => request.toObject());

    const discounts = await services.findDiscounts(requests);
    ctx.res = ok(res => res.setDiscountList(discounts));
  };
  return memoize(compose([validate, findDiscounts]), cache);
};
