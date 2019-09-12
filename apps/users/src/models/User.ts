import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
class User {
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

export default User;
