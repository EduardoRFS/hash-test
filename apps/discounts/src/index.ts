import { createConnection } from 'typeorm';
import Mali from 'mali';
import * as services from '@hash/protos/dist/discounts_grpc_pb';
import env from './config';

export const app = new Mali(services);
export default Promise.all([
  // start connections
  Promise.all(env.db.map(createConnection)),

  // register middlewares
  import('./middlewares/logRequests'),
  import('./middlewares/getDiscount'),
  import('./middlewares/listDiscounts'),
]).then(([connections]) => {
  const server = app.start(env.listen);

  // eslint-disable-next-line no-console
  console.log(`Running at ${env.listen}`);
  return { server, connections };
});
