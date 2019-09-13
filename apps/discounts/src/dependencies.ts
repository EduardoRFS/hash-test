import { memoize } from '@hash/utils';
import * as service from './services/user';
import config from './config';

const dependencies = {
  config,
  ...service,
  cache: memoize.cache(config.cache),
};
export default dependencies;
