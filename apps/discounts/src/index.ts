import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import env from '../environment';
import app from './app';
import Product from './models/Product';
import User from './models/User';

export default createConnection({
  ...env.db,
  entities: [Product, User],
  namingStrategy: new SnakeNamingStrategy(),
}).then(connection => {
  const server = app.start(env.listen);
  console.log(`Running at ${env.listen}`);
  return { server, connection };
});
