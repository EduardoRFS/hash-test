export interface Config {
  listen: string;
  database: {
    type: 'postgres';
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
  };
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
  database: {
    type: 'postgres' as const,
    database: 'users',
    host: 'db-users',
    port: 5432,
    username: 'postgres',
    password: 'ai_tem_de_mudar_isso_aqui',
  },
  cache: {
    maxAge: 1000 * 60 * 60, // 1h
    maxSize: 10240,
  },
  minFirstName: 2,
  minLastName: 2,
  minDateOfBirth: -2208977612000, // 01-01-1900
};
export default config;
