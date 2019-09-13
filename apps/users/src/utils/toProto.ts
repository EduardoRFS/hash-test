import { User as UserProto } from '@hash/protos/dist/users_pb';
import { User as UserModel } from '../models/User';

const toProto = (model: UserModel) => {
  const proto = new UserProto();
  proto.setId(model.id);
  proto.setFirstName(model.firstName);
  proto.setLastName(model.lastName);
  proto.setDateOfBirth(model.dateOfBirth.getTime());
  return proto;
};
export default toProto;
