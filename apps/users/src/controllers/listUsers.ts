import * as yup from 'yup';
import compose from '@malijs/compose';
import { createRespond, createValidation, memoize } from '@hash/utils';
import { ListUsersResponse } from '@hash/protos/dist/users_pb';
import { ListUsers } from './interfaces';
import { Find, toProto } from '../services/user';

interface DI {
  cache: memoize.Cache;
  find: Find;
}

export default ({ cache, find }: DI) => {
  const { ok } = createRespond(ListUsersResponse);
  const validate = createValidation(ListUsersResponse, yup.object({}));

  const listUsers: ListUsers = async ctx => {
    const users = await find();
    const protos = users.map(toProto);
    ctx.res = ok(res => res.setUsersList(protos));
  };
  return memoize(compose([validate, listUsers]), cache);
};
