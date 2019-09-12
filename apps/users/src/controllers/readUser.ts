import * as yup from 'yup';
import compose from '@malijs/compose';
import { createRespond, createValidation, memoize } from '@hash/utils';
import { ReadUserResponse } from '@hash/protos/dist/users_pb';
import { ReadUser } from './interfaces';
import { FindById, toProto } from '../services/user';

interface DI {
  cache: memoize.Cache;
  findById: FindById;
  config: {
    idLength: number;
  };
}

export default ({ cache, config, findById }: DI) => {
  const { ok, notFound } = createRespond(ReadUserResponse);
  const validate = createValidation(
    ReadUserResponse,
    yup.object({
      id: yup.string().length(config.idLength),
    })
  );

  const readUser: ReadUser = async ctx => {
    const id = ctx.req.getId();
    const user = await findById(id);
    ctx.res = user ? ok(res => res.setUser(toProto(user))) : notFound();
  };
  return memoize(compose([validate, readUser]), cache);
};
