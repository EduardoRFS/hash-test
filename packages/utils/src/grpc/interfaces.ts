import { Status } from '@hash/protos/dist/google_status_pb';
import yup from 'yup';
import { Cache } from '../cache';

export interface Request {
  toObject(): object;
}
export interface Response {
  getStatus(): Status | undefined;
  setStatus(status?: Status): void;
}
export interface Class<T extends Response> {
  new (): T;
}

export interface Cacheable extends Request {
  toObject(): {
    options?: {
      cacheAge: number;
    };
  };
  serializeBinary(): Uint8Array;
}
export type MemoizeCache = Cache<string, { res: unknown; data: unknown }>;
// TODO: improve typing to keep it intact, support next, support custom compare
export type Memoize = <
  Request extends Cacheable,
  Context extends { req: Request; res: unknown }
>(
  middleware: (
    ctx: Context,
    next: () => Promise<unknown>
  ) => void | Promise<void>
) => (
  cache: MemoizeCache
) => (ctx: Context, next: () => unknown) => Promise<unknown>;

export type Validation = <T extends Response, U>(
  Factory: Class<T>,
  schema: yup.Schema<U>
) => (
  ctx: {
    req: Request;
    res: T;
  },
  next: () => unknown
) => Promise<void>;
