import * as yup from 'yup';
import compose from '@malijs/compose';
import {
  errorHandler,
  createRespond,
  createValidation,
  memoize,
} from '@hash/utils';
import { ListUsersResponse } from '@hash/protos/dist/users_pb';
import { ListUsers } from './interfaces';
import { Find, FindByIds, toMessage } from '../models/User';

interface DI {
  cache: memoize.Cache;
  find: Find;
  findByIds: FindByIds;
  config: {
    idLength: number;
  };
}

export default ({ cache, config, find, findByIds }: DI) => {
  const errors = errorHandler(ListUsersResponse);
  const validate = createValidation(
    ListUsersResponse,
    yup.object({
      ids: yup.array().of(yup.string().length(config.idLength)),
    })
  );

  const { ok } = createRespond(ListUsersResponse);
  const listUsers: ListUsers = async ctx => {
    const ids = ctx.req.getIdList();
    console.log('abc');
    const models = await (ids.length ? findByIds(ids) : find());
    const users = models.map(toMessage);

    ctx.res = ok(res => res.setUsersList(users));
  };
  return memoize(compose([errors, validate, listUsers]), cache);
};
