import { ReadUserResponse } from '@hash/protos/dist/users_pb';
import { Status } from '@hash/protos/dist/google/status_pb';
import createLogger from '../grpc/logger';

test('it works', async () => {
  const log = jest.fn();
  const logger = createLogger({ log });
  const context = { res: new ReadUserResponse() };

  await logger(context, () => {});

  expect(log).toHaveBeenCalled();
});
test('with status', async () => {
  const log = jest.fn();
  const logger = createLogger({ log });
  const context = { res: new ReadUserResponse() };
  context.res.setStatus(new Status());

  await logger(context, () => {});

  expect(log).toHaveBeenCalled();
});
