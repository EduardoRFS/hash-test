import { createConnection, Connection } from 'typeorm';
import config from './config';
import app from './app';

const waitForConnection = (): Promise<Connection> =>
  createConnection(config.database).catch(waitForConnection);
export default waitForConnection().then(connection => {
  console.log(config.database);
  const server = app.start(config.listen);

  // eslint-disable-next-line no-console
  console.log(`Running at ${config.listen}`);
  return { server, connection };
});
