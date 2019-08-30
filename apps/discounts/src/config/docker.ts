import { parse as parseDate } from 'date-fns';
import ormconfig from './docker.ormconfig';

export default {
  listen: '0.0.0.0:50051',
  db: ormconfig,
  discount: {
    birthday: { percentage: 5 },
    blackfriday: {
      day: parseDate('25/11', 'dd/MM', new Date()),
      percentage: 10,
    },
    max: { percentage: 10 },
  },
};
