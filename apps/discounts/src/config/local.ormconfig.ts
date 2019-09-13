import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Product from '../services/Product';
import User from '../services/User';

const connections: ConnectionOptions[] = [
  {
    name: 'users',
    entities: [User],
    database: 'discounts',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ai_tem_de_mudar_isso_aqui',
    type: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [path.resolve(__dirname, '../migrations/users/*.js')],
    cli: {
      migrationsDir: 'src/migrations/users',
    },
  },
  {
    name: 'products',
    entities: [Product],
    database: 'discounts',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ai_tem_de_mudar_isso_aqui',
    type: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [path.resolve(__dirname, '../migrations/products/*.js')],
    cli: {
      migrationsDir: 'src/migrations/products',
    },
  },
];
export = connections;
