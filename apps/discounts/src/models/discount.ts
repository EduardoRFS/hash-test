import grpc from 'grpc';
import { DiscountsServiceClient } from '@hash/protos/dist/discounts_grpc_pb';
import config from '../config';

export default new DiscountsServiceClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
);
