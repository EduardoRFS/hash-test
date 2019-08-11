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
})
  .then(() => app.start(env.listen))
  .then(() => console.log(`Running at ${env.listen}`));
