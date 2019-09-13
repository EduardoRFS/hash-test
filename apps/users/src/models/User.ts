import { User as UserMessage } from '@hash/protos/dist/users_pb';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  FindConditions,
  getRepository,
} from 'typeorm';

@Entity()
export class User {
  @CreateDateColumn()
  public createdAt!: Date;

  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('text')
  public firstName!: string;

  @Column('text')
  public lastName!: string;

  @Column('timestamp')
  public dateOfBirth!: Date;
}

export const create: {
  (base: Partial<User>): Promise<User>;
  (base: Partial<User>[]): Promise<User[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} = (base: any) => getRepository(User).save(base);
export const find = (options?: FindConditions<User>) =>
  getRepository(User).find(options);
export const findById = (id: string) => getRepository(User).findOne({ id });
export const findByIds = (ids: string[]) => getRepository(User).findByIds(ids);
export const toMessage = (model: User) => {
  const proto = new UserMessage();
  proto.setId(model.id);
  proto.setFirstName(model.firstName);
  proto.setLastName(model.lastName);
  proto.setDateOfBirth(model.dateOfBirth.getTime());
  return proto;
};
export type Create = typeof create;
export type Find = typeof find;
export type FindById = typeof findById;
export type FindByIds = typeof findByIds;
