import createCache from '../src/cache';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

test('get & set', () => {
  const cache = createCache<string, number>({ maxSize: 1 });
  const value = Math.random();

  cache.set('get', value);
  expect(cache.get('get')).toBe(value);
});
test('maxSize', () => {
  const cache = createCache<string, number>({ maxSize: 2 });
  const valueA = Math.random();
  const valueB = Math.random();
  const valueC = Math.random();

  cache.set('a', valueA);
  cache.set('b', valueB);

  expect(cache.get('a')).toBe(valueA);
  expect(cache.get('b')).toBe(valueB);

  cache.set('c', valueC);

  expect(cache.get('a')).toBe(valueA);
  expect(cache.get('b')).toBe(valueB);
  expect(cache.get('c')).toBe(valueC);
});
test('maxAge', async () => {
  const cache = createCache<string, number>({ maxSize: 1, maxAge: 20 });
  const value = Math.random();

  cache.set('maxAge', value);
  expect(cache.get('maxAge')).toBe(value);

  await sleep(10);
  expect(cache.get('maxAge')).toBe(value);
  expect(cache.get('maxAge', 5)).toBe(undefined);

  await sleep(15);
  expect(cache.get('maxAge')).toBe(undefined);
});
