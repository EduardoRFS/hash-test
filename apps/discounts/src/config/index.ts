import { ConnectionOptions } from 'typeorm';
import local from './local';
import docker from './docker';

interface Env {
  listen: string;
  db: ConnectionOptions[];
  discount: {
    birthday: { percentage: number };
    blackfriday: { day: Date; percentage: number };
    max: { percentage: number };
  };
}

const envs: { [key: string]: Env } = { local, docker };
const envName = process.env.ENV_NAME as string;
export default envs[envName] || envs.local;
