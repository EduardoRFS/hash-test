import { Response, Class } from './interfaces';
import createRespond from './respond';

export type ErrorHandler = <T extends Response>(
  Factory: Class<T>
) => (ctx: { res: T }, next: () => unknown) => Promise<unknown>;

const createErrorHandler: ErrorHandler = Factory => {
  const { internal } = createRespond(Factory);

  return (ctx, next) =>
    Promise.resolve()
      .then(next)
      .catch(error => {
        ctx.res = internal({
          message: (error && error.message) || 'Internal Server Error',
        });
      });
};
export default createErrorHandler;
