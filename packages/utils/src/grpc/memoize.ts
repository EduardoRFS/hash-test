import createCache, { CacheOptions } from '../cache';
import { Memoize, MemoizeCache } from './interfaces';

const memoize: Memoize = middleware => cache => async ctx => {
  const key = ctx.req.serializeBinary().toString();
  const request = ctx.req.toObject();
  const age = request.options && request.options.cacheAge;
  const value = age && cache.get(key, age);

  if (value) {
    ctx.res = value.res;
    return value.data;
  }

  const data = await middleware(ctx, () => {
    throw new Error("memoize doesn't implement next support ");
  });
  cache.set(key, { res: ctx.res, data });
  return data;
};
export const createMemoizeCache = (options: CacheOptions): MemoizeCache =>
  createCache(options);

export default Object.assign(memoize, {
  createMemoizeCache,
  cache: createMemoizeCache,
});
