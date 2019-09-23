import { Status } from '@hash/protos/dist/google/status_pb';
import { Code } from '@hash/protos/dist/google/code_pb';
import { ReadUserResponse } from '@hash/protos/dist/users_pb';
import errorHandler from '../grpc/errorHandler';

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
