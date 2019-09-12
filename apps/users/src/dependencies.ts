import { memoize } from '@hash/utils';
import { create, findById } from './services/user';
import config from './config';

const dependencies = {
  config,
  create,
  findById,
  cache: memoize.cache(config.cache),
};
export default dependencies;
