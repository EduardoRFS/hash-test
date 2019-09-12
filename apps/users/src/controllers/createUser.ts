import * as yup from 'yup';
import compose from '@malijs/compose';
import { createValidation, createRespond } from '@hash/utils';
import { CreateUserResponse } from '@hash/protos/dist/users_pb';
import { CreateUser } from './interfaces';
import { Config } from '../config';
import { Create, toProto } from '../services/user';

interface DI {
  create: Create;
  config: Config;
}
export default ({ create, config }: DI) => {
  const { ok } = createRespond(CreateUserResponse);

  const validate = createValidation(
    CreateUserResponse,
    yup.object({
      firstName: yup.string().min(config.minFirstName),
      lastName: yup.string().min(config.minLastName),
      dateOfBirth: yup
        .number()
        .moreThan(config.minDateOfBirth)
        .notOneOf([0]),
    })
  );

  const createUser: CreateUser = async ctx => {
    const user = await create({
      firstName: ctx.req.getFirstName(),
      lastName: ctx.req.getLastName(),
      dateOfBirth: new Date(ctx.req.getDateOfBirth()),
    });

    ctx.res = ok(res => res.setUser(toProto(user)));
  };
  return compose([validate, createUser]);
};