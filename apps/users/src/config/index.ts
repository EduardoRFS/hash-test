import { NamingStrategyInterface } from 'typeorm';
import ormconfig from './ormconfig';

interface ORMConfig {
  type: 'postgres';
  database: string;
  host: string;
  port: number;
  username: string;
  password: string;
  namingStrategy: NamingStrategyInterface;
  entities: Function[];
  migrations: string[];
  cli: { migrationsDir: string };
}
export interface Config {
  listen: string;
  database: ORMConfig;
  cache: {
    maxAge: number;
    maxSize: number; // entries
  };
  minFirstName: number;
  minLastName: number;
  minDateOfBirth: number;
}

const config: Config = {
  listen: '0.0.0.0:50051',
  database: ormconfig,
  cache: {
    maxAge: 1000 * 60 * 60, // 1h
    maxSize: 10240,
  },
  minFirstName: 2,
  minLastName: 2,
  minDateOfBirth: -2208977612000, // 01-01-1900
};

export default config;
