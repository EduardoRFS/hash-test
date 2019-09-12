import Mali from 'mali';
import * as services from '@hash/protos/dist/users_grpc_pb';
import dependencies from './dependencies';
import readUser from './controllers/readUser';
import createUser from './controllers/createUser';

const app = new Mali(services);

app.use('createUser', createUser(dependencies));
app.use('readUser', readUser(dependencies));

export default app;
