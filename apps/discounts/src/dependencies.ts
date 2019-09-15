import { memoize } from '@hash/utils';
import config from './config';
import createRules from './services/rules';
import createMakeDiscount from './services/makeDiscount';
import createFindDiscounts from './services/findDiscounts';
import * as products from './models/product';
import * as users from './models/user';

const models = { products, users };

const rules = createRules({ config });
const makeDiscount = createMakeDiscount({ services: { rules } });
const findDiscounts = createFindDiscounts({
  services: { makeDiscount },
  models,
});
const services = { rules, makeDiscount, findDiscounts };
const dependencies = {
  config,
  services,
  models,
  cache: memoize.cache(config.cache),
};
export default dependencies;
