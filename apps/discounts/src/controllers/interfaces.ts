import Mali from 'mali';
import * as services from '@hash/protos/dist/discounts_grpc_pb';

type Methods = Mali.Methods<typeof services>;
export type FindDiscount = Methods['findDiscount'];
