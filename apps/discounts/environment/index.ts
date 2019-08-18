import testing from './testing';
import development from './development';
import production from './production';

interface Env {
  listen: string;
  db: {
    type: 'postgres';
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
  };
  discount: {
    birthday: { percentage: number };
    blackfriday: { day: Date; percentage: number };
    max: { percentage: number };
  };
}

const envs: { [key: string]: Env } = { testing, development, production };
const envName = process.env.NODE_ENV as string;
export default envs[envName] || envs.development;
