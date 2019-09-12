import { Status } from '@hash/protos/dist/google_status_pb';
import yup from 'yup';
import { Cache } from '../cache';

export interface Request {
  toObject(): object;
}
export interface Response {
  getStatus(): Status | undefined;
  setStatus(status?: Status): void;
}
export interface Class<T extends Response> {
  new (): T;
}