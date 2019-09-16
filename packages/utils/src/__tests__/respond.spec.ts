import { Status } from '@hash/protos/dist/google/status_pb';
import { ReadUserResponse, User } from '@hash/protos/dist/users_pb';
import createRespond, { namingMap } from '../grpc/respond';

type Keys = keyof typeof namingMap;

const respond = createRespond(ReadUserResponse);

test('return the right code', () => {
  const keys = Object.keys(namingMap) as Keys[];
  expect.assertions(keys.length);

  keys.forEach(key => {
    const response = respond[key]();
    const status = response.getStatus() as Status;
    expect(status.getCode()).toBe(namingMap[key]);
  });
});
test('callback', () => {
  const user = new User();
  const response = respond.ok(res => res.setUser(user));
  expect(response.getUser()).toBe(user);
});
test('status options', () => {
  const response = respond.invalidArgument({
    message: 'something really bad happened',
    details: ['detail A', 'detail B'],
  });
  const status = response.getStatus() as Status;
  const details = status.getDetailsList().map(value => value.getValue());

  expect(status.getMessage()).toBe('something really bad happened');
  expect(details).toEqual(['detail A', 'detail B']);
});
