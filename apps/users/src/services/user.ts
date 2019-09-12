import { User as UserProto } from '@hash/protos/dist/users_pb';
import { getRepository } from 'typeorm';
import UserModel from '../models/User';

export const create: {
  (base: Partial<UserModel>): Promise<UserModel>;
  (base: Partial<UserModel>[]): Promise<UserModel[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} = (base: any) => getRepository(UserModel).save(base);
export const findById = (id: string) =>
  getRepository(UserModel).findOne({ id });

export const toProto = (model: UserModel) => {
  const proto = new UserProto();
  proto.setId(model.id);
  proto.setFirstName(model.firstName);
  proto.setLastName(model.lastName);
  proto.setDateOfBirth(model.dateOfBirth.getTime());
  return proto;
};

export type Create = typeof create;
export type FindById = typeof findById;
