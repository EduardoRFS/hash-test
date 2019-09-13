import grpc from 'grpc';
import uuid from 'uuid/v4';
import R from 'ramda';
import { withContext as describe } from 'jest-with-context';
import {
  User,
  CreateUserRequest,
  ReadUserRequest,
  CreateUserResponse,
  ReadUserOptions,
  ListUsersRequest,
  ListUsersOptions,
} from '@hash/protos/dist/users_pb';
import { UsersServiceClient } from '@hash/protos/dist/users_grpc_pb';
import { Status } from '@hash/protos/dist/google_status_pb';
import { Code } from '@hash/protos/dist/google_code_pb';
import { getRepository } from 'typeorm';
import * as Model from '../src/models/User';
import env from '../src/config';
import appPromise from '../src';

const SERVER_URL = env.listen;

interface Context {
  service: UsersServiceClient;
  user: Model.User;
  users: Model.User[];
}

const setup = async (state: Context): Promise<Context> => {
  const createUser = (i: number = Math.random()) => ({
    createdAt: new Date(),
    id: uuid(),
    firstName: `User ${i}`,
    lastName: `Square ${i * i}`,
    dateOfBirth: new Date(Date.now() - Math.random() * 1e12),
  });
  const createUsers = (amount: number) => {
    const users = R.times(createUser, amount);
    return Model.create(users);
  };
  await appPromise;
  await getRepository(Model.User).clear();

  const service =
    (state || {}).service ||
    new UsersServiceClient(SERVER_URL, grpc.credentials.createInsecure());
  const users = await createUsers(10);
  return { service, users, user: users[0] };
};

describe<Context>('createUser', ({ test, beforeAll }) => {
  beforeAll(setup);

  const request = (
    service: UsersServiceClient,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: number
  ) => {
    const request = new CreateUserRequest();
    if (firstName) {
      request.setFirstName(firstName);
    }
    if (lastName) {
      request.setLastName(lastName);
    }
    if (dateOfBirth) {
      request.setDateOfBirth(dateOfBirth);
    }
    return service.createUser(request);
  };
  test('createUser', async ({ service }) => {
    const response = await request(service, 'Edu', 'Dudu', 937519079881);
    const status = response.getStatus() as Status;
    const user = response.getUser() as User;

    expect(status).toBeDefined();
    expect(user).toBeDefined();

    expect(status.getCode()).toBe(Code.OK);
    expect(user.getFirstName()).toBe('Edu');
    expect(user.getLastName()).toBe('Dudu');
    expect(user.getDateOfBirth()).toBe(937519079881);
  });
  test('validation fail', async ({ service }) => {
    const assert = (response: CreateUserResponse) => {
      const status = response.getStatus() as Status;
      const user = response.getUser() as User;

      expect(status).toBeDefined();
      expect(user).toBeUndefined();

      expect(status.getCode()).toBe(Code.INVALID_ARGUMENT);
    };

    const responses = await Promise.all([
      request(service, undefined, 'xxx', 937519079881),
      request(service, 'yyy', undefined, 937519079881),
      request(service, 'aaa', 'bbb', undefined),
    ]);
    responses.forEach(assert);
  });
});

describe<Context>('readUser', ({ test, beforeAll }) => {
  beforeAll(setup);

  const request = (
    service: UsersServiceClient,
    id?: string,
    maxAge?: number
  ) => {
    const request = new ReadUserRequest();
    if (id) {
      request.setId(id);
    }
    if (maxAge) {
      const options = new ReadUserOptions();
      options.setCacheAge(maxAge);
      request.setOptions(options);
    }
    return service.readUser(request);
  };
  test('single read', async ({ service, user: model }) => {
    const response = await request(service, model.id);
    const status = response.getStatus() as Status;
    const user = response.getUser() as User;

    expect(status).toBeDefined();
    expect(user).toBeDefined();

    expect(status.getCode()).toBe(Code.OK);
    expect(user.getId()).toBe(model.id);
    expect(user.getFirstName()).toBe(model.firstName);
    expect(user.getLastName()).toBe(model.lastName);
    expect(user.getDateOfBirth()).toBe(model.dateOfBirth.getTime());
  });
  test('not found', async ({ service }) => {
    const response = await request(service, uuid());
    const status = response.getStatus() as Status;

    expect(status).toBeDefined();
    expect(response.getUser()).toBeUndefined();

    expect(status.getCode()).toBe(Code.NOT_FOUND);
  });
  test('invalid id', async ({ service }) => {
    const response = await request(service, 'invalid id');
    const status = response.getStatus() as Status;

    expect(status).toBeDefined();
    expect(response.getUser()).toBeUndefined();

    expect(status.getCode()).toBe(Code.INVALID_ARGUMENT);
  });
});

describe<Context>('listUsers', ({ test, beforeAll }) => {
  beforeAll(setup);

  const request = (
    service: UsersServiceClient,
    ids?: string[],
    maxAge?: number
  ) => {
    const request = new ListUsersRequest();
    if (ids) {
      request.setIdList(ids);
    }
    if (maxAge) {
      const options = new ListUsersOptions();
      options.setCacheAge(maxAge);
      request.setOptions(options);
    }
    return service.listUsers(request);
  };
  test('list all users', async ({ service, users: models }) => {
    const response = await request(service);
    const status = response.getStatus() as Status;
    const users = response.getUsersList();

    expect(status).toBeDefined();
    expect(users.length).toBe(models.length);

    expect(status.getCode()).toBe(Code.OK);
    R.zip(users, models).forEach(([user, model]) => {
      expect(user.getId()).toBe(model.id);
      expect(user.getFirstName()).toBe(model.firstName);
      expect(user.getLastName()).toBe(model.lastName);
      expect(user.getDateOfBirth()).toBe(model.dateOfBirth.getTime());
    });
  });
  test('by ids', async ({ service, users: models }) => {
    const selectedModels = models.slice(2, 5);
    const ids = selectedModels.map(model => model.id);
    const response = await request(service, ids);

    const status = response.getStatus() as Status;
    const users = response.getUsersList();

    expect(status).toBeDefined();
    expect(users.length).toBe(selectedModels.length);

    expect(status.getCode()).toBe(Code.OK);
    R.zip(users, selectedModels).forEach(([user, model]) => {
      expect(user.getId()).toBe(model.id);
      expect(user.getFirstName()).toBe(model.firstName);
      expect(user.getLastName()).toBe(model.lastName);
      expect(user.getDateOfBirth()).toBe(model.dateOfBirth.getTime());
    });
  });
});

afterAll(async () => {
  const { server, connection } = await appPromise;
  server.tryShutdown(() => {});
  await connection.close();
});
