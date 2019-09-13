import * as yup from 'yup';
import compose from '@malijs/compose';
import { createRespond, createValidation, memoize } from '@hash/utils';
import { ListUsersResponse } from '@hash/protos/dist/users_pb';
import { ListUsers } from './interfaces';
import { Find, FindByIds } from '../models/User';
import { toProto } from '../services/user';

interface DI {
  cache: memoize.Cache;
  find: Find;
  findByIds: FindByIds;
  config: {
    idLength: number;
  };
}

export default ({ cache, config, find, findByIds }: DI) => {
  const { ok } = createRespond(ListUsersResponse);
  const validate = createValidation(
    ListUsersResponse,
    yup.object({
      ids: yup.array().of(yup.string().length(config.idLength)),
    })
  );

  const listUsers: ListUsers = async ctx => {
    const ids = ctx.req.getIdList();
    const users = await (ids.length ? findByIds(ids) : find());
    const protos = users.map(toProto);

    ctx.res = ok(res => res.setUsersList(protos));
  };
  return memoize(compose([validate, listUsers]), cache);
};
