import * as yup from 'yup';
import { Request, Response, Class } from './interfaces';
import createRespond from './respond';

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

const createValidation: Validation = (Factory, schema) => {
  const { invalidArgument } = createRespond(Factory);

  return async (ctx, next) => {
    try {
      await schema.validate(ctx.req.toObject());
      await next();
    } catch (error) {
      if (!(error instanceof yup.ValidationError)) {
        throw error;
      }
      ctx.res = invalidArgument({
        message: error.message,
        details: error.errors.map(detail =>
          Buffer.from(detail).toString('base64')
        ),
      });
    }
  };
};
export default createValidation;
