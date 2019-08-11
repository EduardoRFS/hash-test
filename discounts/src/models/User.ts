import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
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
