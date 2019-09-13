import Mali from 'mali';
import * as services from '@hash/protos/dist/discounts_grpc_pb';
import dependencies from './dependencies';
import findDiscount from './controllers/findDiscount';

const app = new Mali(services);

app.use('findDiscount', findDiscount(dependencies))

export default app;