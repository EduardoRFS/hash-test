import * as yup from 'yup';
import compose from '@malijs/compose';
import {
  errorHandler,
  createRespond,
  createValidation,
  memoize,
} from '@hash/utils';
import { ReadUserResponse } from '@hash/protos/dist/users_pb';
import { ReadUser } from './interfaces';
import { FindById, toMessage } from '../models/User';

interface DI {
  cache: memoize.Cache;
  findById: FindById;
  config: {
    idLength: number;
  };
}

export default ({ cache, config, findById }: DI) => {
  const errors = errorHandler(ReadUserResponse);
  const validate = createValidation(
    ReadUserResponse,
    yup.object({
      id: yup.string().length(config.idLength),
    })
  );

  const { ok, notFound } = createRespond(ReadUserResponse);
  const readUser: ReadUser = async ctx => {
    const id = ctx.req.getId();
    const model = await findById(id);
    const user = model && toMessage(model);

    ctx.res = user ? ok(res => res.setUser(user)) : notFound();
  };
  return memoize(compose([errors, validate, readUser]), cache);
};
