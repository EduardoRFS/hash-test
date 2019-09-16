import * as yup from 'yup';
import {
  ReadUserResponse,
  ReadUserRequest,
  ReadUserOptions,
} from '@hash/protos/dist/users_pb';
import validation from '../grpc/validation';

const createContext = (id: string, cacheAge: number) => {
  const options = new ReadUserOptions();
  const request = new ReadUserRequest();
  const response = new ReadUserResponse();
  options.setCacheAge(cacheAge);
  request.setId(id);
  request.setOptions(options);

  return { req: request, res: response };
};
test('valid input', async () => {
  const context = createContext('123', 5);
  const schema = yup.object({ id: yup.string() });
  const middleware = validation(ReadUserResponse, schema);
  const next = jest.fn();

  await middleware(context, next);

  expect(next).toHaveBeenCalled();
});
test('invalid input', async () => {
  const context = createContext('abc', 6);
  const schema = yup.object({ id: yup.number() });
  const middleware = validation(ReadUserResponse, schema);

  const next = jest.fn();
  await middleware(context, next);
  expect(next).not.toHaveBeenCalled();
});
