import { Code } from '@hash/protos/dist/google/code_pb';
import { Status } from '@hash/protos/dist/google/status_pb';
import { Any } from '@hash/protos/dist/google/any_pb';
import mapValues from 'lodash.mapvalues';
import { Class, Response } from './interfaces';

type StatusOptions = {
  message: string;
  details?: string[];
};
type Helper<T extends Response> = (
  callback?: ((response: T, status: Status) => void) | StatusOptions
) => T;

const stringToAny = (string: string): Any => {
  const any = new Any();
  any.setValue(string);
  return any;
};
export const namingMap = {
  ok: Code.OK,
  cancelled: Code.CANCELLED,
  unknown: Code.UNKNOWN,
  invalidArgument: Code.INVALID_ARGUMENT,
  deadlineExceeded: Code.DEADLINE_EXCEEDED,
  notFound: Code.NOT_FOUND,
  alreadyExists: Code.ALREADY_EXISTS,
  permissionDenied: Code.PERMISSION_DENIED,
  unauthenticated: Code.UNAUTHENTICATED,
  resourceExhausted: Code.RESOURCE_EXHAUSTED,
  failedPrecondition: Code.FAILED_PRECONDITION,
  aborted: Code.ABORTED,
  outOfRange: Code.OUT_OF_RANGE,
  unimplemented: Code.UNIMPLEMENTED,
  internal: Code.INTERNAL,
  unavailable: Code.UNAVAILABLE,
  dataLoss: Code.DATA_LOSS,
} as const;
const createRespond = <T extends Response>(Factory: Class<T>) => {
  const createStatusOptions = (code: Code): Helper<T> => callback => {
    const response = new Factory();
    const status = new Status();
    status.setCode(code);
    response.setStatus(status);

    if (typeof callback === 'object') {
      const options = callback;
      status.setMessage(options.message);
      status.setDetailsList((options.details || []).map(stringToAny));
    }
    if (typeof callback === 'function') {
      callback(response, status);
    }
    return response;
  };

  const helpers = mapValues(namingMap, createStatusOptions);

  return Object.assign(createStatusOptions, helpers);
};
export default createRespond;
