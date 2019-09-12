import Mali from 'mali';
import * as services from '@hash/protos/dist/users_grpc_pb';

type Methods = Mali.Methods<typeof services>;
export type CreateUser = Methods['createUser'];
export type ReadUser = Methods['readUser'];
export type ListUsers = Methods['listUsers'];
