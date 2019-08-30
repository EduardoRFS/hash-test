import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Product from '../models/Product';
import User from '../models/User';

const connections: ConnectionOptions[] = [
  {
    name: 'users',
    entities: [User],
    database: 'users',
    host: 'db-users',
    port: 5432,
    username: 'postgres',
    password: 'ai_tem_de_mudar_isso_aqui',
    type: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [path.resolve(__dirname, '../migrations/users/*.js')],
    cli: {
      migrationsDir: 'src/migrations/products',
    },
  },
  {
    name: 'products',
    entities: [Product],
    database: 'products',
    host: 'db-products',
    port: 5432,
    username: 'postgres',
    password: 'ai_tem_de_mudar_isso_aqui',
    type: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [path.resolve(__dirname, '../migrations/users/*.js')],
    cli: {
      migrationsDir: 'src/migrations/products',
    },
  },
];
export = connections;
