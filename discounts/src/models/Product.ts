import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Product {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('int', { unsigned: true })
  public priceInCents!: number;

  @Column('text')
  public title!: string;

  @Column('text')
  public description!: string;
}

export default Product;
