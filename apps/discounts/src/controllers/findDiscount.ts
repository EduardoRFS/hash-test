import * as yup from 'yup';
import compose from '@malijs/compose';
import { createRespond, createValidation, memoize } from '@hash/utils';
import { ReadUserResponse } from '@hash/protos/dist/users_pb';
import { FindDiscount } from './interfaces';
import { FindById, toProto } from '../services/user';

interface DI {
  cache: memoize.Cache;
  findUser: FindUser;
  findProduct: FindProduct;
}

export default ({ cache, findUser, findProduct }: DI) => {
  const { ok, notFound } = createRespond(ReadUserResponse);
  const validate = createValidation(
    ReadUserResponse,
    yup.object({
      productId: yup.string().required(),
      userId: yup.string().required(),
    })
  );

  const findDiscount: FindDiscount = async ctx => {
    const id = ctx.req.getId();
    const user = await findById(id);
    ctx.res = user ? ok(res => res.setUser(toProto(user))) : notFound();
  };
  return memoize(compose([validate, findDiscount]), cache);
};
