/* eslint-disable no-console */
import R from 'ramda';

const logger = {
  info: (message: object) => console.info(message),
  error: R.curry((error: Error, message: object) =>
    console.error({ ...message, error })
  ),
};
export default logger;
