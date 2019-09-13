import grpc from 'grpc';
import { User as UserProto } from '@hash/protos/dist/users_pb';
import { UsersServiceClient } from '@hash/protos/dist/users_grpc_pb';
import { getRepository, FindManyOptions, FindConditions } from 'typeorm';

const service = new UsersServiceClient(
  SERVER_URL,
  grpc.credentials.createInsecure()
);
export const findById = (id: string) => {
  getRepository(UserModel).findOne({ id });
};
export const findByIds = (ids: string[]) => {
  getRepository(UserModel).findByIds(ids);
};

export const toProto = (model: UserModel) => {
  const proto = new UserProto();
  proto.setId(model.id);
  proto.setFirstName(model.firstName);
  proto.setLastName(model.lastName);
  proto.setDateOfBirth(model.dateOfBirth.getTime());
  return proto;
};

export type Create = typeof create;
export type Find = typeof find;
export type FindById = typeof findById;
export type FindByIds = typeof findByIds;
