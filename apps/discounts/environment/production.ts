import { parse as parseDate } from 'date-fns';

export default {
  listen: '0.0.0.0:50051',
  db: {
    type: 'postgres' as const,
    host: 'postgres',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
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
