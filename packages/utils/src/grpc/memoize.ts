import createCache, { CacheOptions, Cache as LRUCache } from '../cache';
import { Request, Response } from './interfaces';

// why? Typescript doesn't support declaration merging with arrow functions
// TODO: improve typing to keep it intact, support next, support custom compare
function memoize<
  Request extends memoize.Cacheable,
  Context extends { req: Request; res: unknown }
>(middleware: memoize.Middleware<Context>, cache: memoize.Cache) {
  return async (ctx: Context, next: () => unknown) => {
    const key = ctx.req.serializeBinary().toString();
    const request = ctx.req.toObject();
    const age = request.options && request.options.cacheAge;
    const value = age && cache.get(key, age);

    if (value) {
      ctx.res = value.res;
      // return value.data;
    }

    const data = await middleware(ctx, () => {
      throw new Error("memoize doesn't implement next support ");
    });
    cache.set(key, { res: ctx.res, data });
    // return data;
  };
}
// eslint-disable-next-line
namespace memoize {
  export type Cache = LRUCache<string, { res: unknown; data: unknown }>;
  export interface Cacheable extends Request {
    toObject(): {
      options?: {
        cacheAge: number;
      };
    };
    serializeBinary(): Uint8Array;
  }
  export type Middleware<T> = (
    ctx: T,
    next: () => Promise<unknown>
  ) => void | Promise<void>;
  export const cache = (options: CacheOptions): Cache => createCache(options);
}

export default memoize;
