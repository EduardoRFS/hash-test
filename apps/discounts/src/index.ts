import app from './app';
import env from './config';

export default Promise.resolve().then(() => {
  const server = app.start(env.listen);

  // eslint-disable-next-line no-console
  console.log(`Running at ${env.listen}`);
  return { server };
});
