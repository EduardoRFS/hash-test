import errorHandler from '../grpc/errorHandler';
import { ReadUserResponse } from './protos/users_pb';
import { Status } from './protos/google_status_pb';
import { Code } from './protos/google_code_pb';

const assert = async (next: () => unknown, message?: string) => {
  const context = { res: new ReadUserResponse() };
  const middleware = errorHandler(ReadUserResponse);

  await middleware(context, next);

  const status = context.res.getStatus() as Status;

  if (message) {
    expect(status).toBeDefined();
    expect(status.getCode()).toBe(Code.INTERNAL);
    expect(status.getMessage()).toBe(message);
  } else {
    expect(status).toBeUndefined();
  }
};

test('no error', async () => {
  await assert(() => {});
});
test('no message', async () => {
  // eslint-disable-next-line prefer-promise-reject-errors
  const next = () => Promise.reject(123);
  await assert(next, 'Internal Server Error');
});
test('sync errors', async () => {
  const next = () => {
    throw new Error('potato');
  };
  await assert(next, 'potato');
});
test('async errors', async () => {
  const next = () => Promise.reject(new Error('tuturu'));
  await assert(next, 'tuturu');
});
