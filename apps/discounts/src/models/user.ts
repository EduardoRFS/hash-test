import R from 'ramda';
import grpc from 'grpc';
import { UsersServiceClient } from '@hash/protos/dist/users_grpc_pb';
import { ReadUserRequest, ListUsersRequest } from '@hash/protos/dist/users_pb';
import config from '../config';

const service = new UsersServiceClient(
  config.services.users,
  grpc.credentials.createInsecure()
);
export const findById = async (id: string) => {
  const request = new ReadUserRequest();
  request.setId(id);

  const response = await service.readUser(request);
  return response.getUser();
};
export const findByIds = async (ids: string[]) => {
  const request = new ListUsersRequest();
  request.setIdList(ids);

  const response = await service.listUsers(request);
  const users = response.getUsersList();
  return R.indexBy(user => user.getId(), users);
};

export type FindById = typeof findById;
export type FindByIds = typeof findByIds;
