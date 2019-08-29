import { parse as parseDate } from 'date-fns';

export default {
  listen: '0.0.0.0:50051',
  db: {
    type: 'postgres' as const,
    host: 'localhost',
    port: 5432,
    database: 'discounts',
    username: 'postgres',
    password: 'ai_tem_de_mudar_isso_aqui',
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
