import Mali from 'mali';
import * as services from '@hash/protos/build/discounts_grpc_pb';

const app = new Mali(services);

// TODO: concurrently with createConnection
import('./controllers/DiscountController');

export default app;
