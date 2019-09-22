import { parse as parseDate } from 'date-fns';

export interface Config {
  listen: string;
  cache: {
    maxAge: number;
    maxSize: number; // entries
  };
  services: {
    users: string;
    products: string;
  };
  discount: {
    birthday: { percentage: number };
    blackfriday: { day: Date; percentage: number };
    max: { percentage: number };
  };
}

const config: Config = {
  listen: '0.0.0.0:50051',
  cache: {
    maxAge: 1000 * 60 * 60, // 1h;
    maxSize: 10240,
  },
  services: {
    users: 'api-users:50051',
    products: 'api-products:50051',
  },
  discount: {
    birthday: { percentage: 5 },
    blackfriday: {
      day: parseDate('25/11', 'dd/MM', new Date()),
      percentage: 10,
    },
    max: { percentage: 10 },
  },
};
export default config;
