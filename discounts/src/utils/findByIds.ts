import R from 'ramda';
import { getRepository } from 'typeorm';

// TODO: post this on a issue on typescript because IsClass doesn't work
const findByIds = async <T extends new (...args: unknown[]) => unknown>(
  type: T,
  ids: string[]
) => {
  // TODO: search if is needed
  const validIds = R.uniq(ids).filter(Boolean);
  const repository = getRepository<InstanceType<T>>(type);
  const values = await repository.findByIds(validIds);
  const dict = R.zipObj(validIds, values);
  return ids.map(id => dict[id] || null);
};
export default findByIds;
