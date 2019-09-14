import createLogger from '../grpc/logger';
import { ReadUserResponse } from './protos/users_pb';
import { Status } from './protos/google_status_pb';

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
