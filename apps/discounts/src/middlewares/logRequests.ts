import { app } from '..';
import logger from '../utils/logger';

app.use(async (ctx, next) => {
  const { name: call } = ctx;
  const timeInitial = process.hrtime();
  const [log, error] = await next()
    .then(() => [logger.info])
    .catch(err => [logger.error(err), err]);

  const [, time] = process.hrtime(timeInitial);
  log({ call, time: `${time}ns` });

  if (error) {
    throw error;
  }
});
