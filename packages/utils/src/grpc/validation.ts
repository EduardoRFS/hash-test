import * as yup from 'yup';
import { Validation } from './interfaces';
import createRespond from './respond';

const createValidation: Validation = (Factory, schema) => {
  const { invalidArgument } = createRespond(Factory);

  return async (ctx, next) => {
    try {
      await schema.validate(ctx.req.toObject());
      next();
    } catch (error) {
      if (!(error instanceof yup.ValidationError)) {
        throw error;
      }
      ctx.res = invalidArgument({
        message: error.message,
        details: error.errors,
      });
    }
  };
};
export default createValidation;
