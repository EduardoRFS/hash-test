import LRU from 'lru-cache';

// wrapper for providing get based on maxAge

export interface CacheOptions {
  maxAge?: number;
  maxSize: number;
}
export interface Cache<K, V> {
  get: (key: K, maxAge?: number) => V | undefined;
  set: (key: K, value: V) => void;
}
const createCache = <K, V>(options: CacheOptions): Cache<K, V> => {
  const cache = new LRU<K, { time: number; value: V }>(options);
  return {
    get(key, maxAge = options.maxAge) {
      const data = cache.get(key);
      return data &&
        (typeof maxAge !== 'number' || maxAge > Date.now() - data.time)
        ? data.value
        : undefined;
    },
    set(key, value) {
      const time = Date.now();
      cache.set(key, { time, value });
    },
  };
};
export default createCache;
