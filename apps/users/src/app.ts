import Mali from 'mali';
import * as services from '@hash/protos/dist/users_grpc_pb';
import { logger } from '@hash/utils';
import dependencies from './dependencies';
import readUser from './controllers/readUser';
import createUser from './controllers/createUser';
import listUsers from './controllers/listUsers';

const app = new Mali(services);

app.use(logger(console));

app.use('createUser', createUser(dependencies));
app.use('readUser', readUser(dependencies));
app.use('listUsers', listUsers(dependencies));

export default app;
