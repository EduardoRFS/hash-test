import { createConnection } from 'typeorm';
import config from './config';
import app from './app';

export default createConnection(config.database).then(connection => {
  const server = app.start(config.listen);

  // eslint-disable-next-line no-console
  console.log(`Running at ${config.listen}`);
  return { server, connection };
});
