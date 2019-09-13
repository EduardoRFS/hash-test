import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../models/User';

export = {
  type: 'postgres' as const,
  database: 'users',
  host: 'db-users',
  port: 5432,
  username: 'postgres',
  password: 'ai_tem_de_mudar_isso_aqui',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [User],
  migrations: [path.resolve(__dirname, '../migrations/*.js')],
  cli: { migrationsDir: 'src/migrations' },
};
