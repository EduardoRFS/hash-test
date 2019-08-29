import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Mali from 'mali';
import * as services from '@hash/protos/dist/discounts_grpc_pb';
import env from '../environment';
import Product from './models/Product';
import User from './models/User';

export const app = new Mali(services);
export type App = typeof app;

// register middlewares
import('./middlewares/logRequests');
import('./middlewares/getDiscount');
import('./middlewares/listDiscounts');

// resolve after app boot
export default createConnection({
  ...env.db,
  entities: [Product, User],
  namingStrategy: new SnakeNamingStrategy(),
}).then(connection => {
  const server = app.start(env.listen);

  // eslint-disable-next-line no-console
  console.log(`Running at ${env.listen}`);
  return { server, connection };
});
