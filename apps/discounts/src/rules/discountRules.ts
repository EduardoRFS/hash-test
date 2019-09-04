import { isToday } from 'date-fns';
import env from '../config';
import createDiscount from './createDiscount';
import { Rule } from './interfaces';

export const birthday: Rule = ({ user, product }) => {
  const PERCENTAGE = env.discount.birthday.percentage;
  const { dateOfBirth } = user;
  return isToday(dateOfBirth) ? createDiscount(product, PERCENTAGE) : null;
};
export const blackfriday: Rule = ({ product }) => {
  const PERCENTAGE = env.discount.blackfriday.percentage;
  const BLACKFRIDAY = env.discount.blackfriday.day;
  return isToday(BLACKFRIDAY) ? createDiscount(product, PERCENTAGE) : null;
};
export const maxPercentage: Rule = ({ product, previous }) => {
  const MAX_PERCENTAGE = env.discount.max.percentage;

  const previousPercentage = Object.values(previous)
    .map(discount => (discount ? discount.getPct() : 0))
    .reduce((a, b) => Math.max(a, b), 0);

  const percentage = Math.min(MAX_PERCENTAGE, previousPercentage);
  return createDiscount(product, percentage);
};

// as of es6 all engines guarantee order for non numeric index
export default { birthday, blackfriday, maxPercentage };
