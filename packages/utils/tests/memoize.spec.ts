import {
  ReadUserRequest,
  ReadUserOptions,
  ReadUserResponse,
} from './proto/users_pb';
import memoize from '../src/grpc/memoize';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createContext = (id: string, cacheAge: number) => {
  const options = new ReadUserOptions();
  const request = new ReadUserRequest();
  const response = new ReadUserResponse();
  options.setCacheAge(cacheAge);
  request.setId(id);
  request.setOptions(options);

  return { req: request, res: response };
};
test('avoid calls', async () => {
  const cache = memoize.cache({ maxSize: 10 });
  const memoized = memoize(ctx => {
    ctx.res = new ReadUserResponse();
  })(cache);

  const contextA = createContext('avoid calls', 20);
  const contextB = createContext('avoid calls', 20);

  await memoized(contextA, () => {});
  await memoized(contextB, () => {});

  expect(contextA.res).toBe(contextB.res);
});
describe('cache invalidation', () => {
  test('by request', async () => {
    const cache = memoize.cache({ maxSize: 10 });
    const memoized = memoize(ctx => {
      ctx.res = new ReadUserResponse();
    })(cache);

    const contextA = createContext('avoid calls A', 20);
    const contextB = createContext('avoid calls B', 20);

    await memoized(contextA, () => {});
    await memoized(contextB, () => {});

    expect(contextA.res).not.toBe(contextB.res);
  });
  test('age', async () => {
    const cache = memoize.cache({ maxSize: 10 });
    const memoized = memoize(ctx => {
      ctx.res = new ReadUserResponse();
    })(cache);

    const contextA = createContext('avoid calls', 20);
    const contextB = createContext('avoid calls', 20);

    await memoized(contextA, () => {});
    await memoized(contextB, () => {});
    expect(contextA.res).toBe(contextB.res);

    await sleep(10);

    await memoized(contextA, () => {});
    expect(contextA.res).toBe(contextB.res);

    await sleep(11);

    await memoized(contextA, () => {});
    expect(contextA.res).not.toBe(contextB.res);
  });
});
