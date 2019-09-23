import Mali from 'mali';
import * as services from '@hash/protos/dist/discounts_grpc_pb';
import { logger } from '@hash/utils';
import dependencies from './dependencies';
import findDiscount from './controllers/findDiscount';
import findDiscounts from './controllers/findDiscounts';

const app = new Mali(services);

app.use(logger(console));

app.use('findDiscount', findDiscount(dependencies));
app.use('findDiscounts', findDiscounts(dependencies));

export default app;
