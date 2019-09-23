import { Response } from './interfaces';

export type Logger = (logger: {
  log: (message: string) => void;
}) => (ctx: { res: Response }, next: () => unknown) => Promise<void>;

const createLogger: Logger = logger => async (ctx, next) => {
  const initialTime = Date.now();
  await next();

  const time = Date.now() - initialTime;
  const status = ctx.res && ctx.res.getStatus();
  const code = status ? status.getCode() : -1;

  logger.log(`Status Code: ${code} - Latency: ${time}ms`);
};
export default createLogger;
