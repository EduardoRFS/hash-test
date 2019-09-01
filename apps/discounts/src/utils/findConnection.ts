// useful because typeorm doesn't allow to have connections per entity
import config from '../config';

type Entity = new (...args: unknown[]) => unknown;

const entries = config.db.flatMap(conn =>
  (conn.entities as unknown[]).map(entity => [entity, conn.name])
) as [Entity, string][];
const connectionsByEntity = new Map(entries);

const findConnection = <T extends Entity>(entity: T) =>
  connectionsByEntity.get(entity) as string;
export default findConnection;
