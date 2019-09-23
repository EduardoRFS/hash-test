import * as yup from 'yup';
import compose from '@malijs/compose';
import { errorHandler, createValidation, createRespond } from '@hash/utils';
import { CreateUserResponse } from '@hash/protos/dist/users_pb';
import { CreateUser } from './interfaces';
import { Create, toMessage } from '../models/User';

interface DI {
  create: Create;
  config: {
    minFirstName: number;
    minLastName: number;
    minDateOfBirth: number;
  };
}
export default ({ create, config }: DI) => {
  const errors = errorHandler(CreateUserResponse);
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

  const { ok } = createRespond(CreateUserResponse);
  const createUser: CreateUser = async ctx => {
    const model = await create({
      firstName: ctx.req.getFirstName(),
      lastName: ctx.req.getLastName(),
      dateOfBirth: new Date(ctx.req.getDateOfBirth()),
    });
    const user = toMessage(model);
    ctx.res = ok(res => res.setUser(user));
  };
  return compose([errors, validate, createUser]);
};
