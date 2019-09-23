import { memoize } from '@hash/utils';
import { create, find, findById, findByIds } from './models/User';
import config from './config';

const dependencies = {
  config,
  create,
  find,
  findById,
  findByIds,
  cache: memoize.cache(config.cache),
};
export default dependencies;
