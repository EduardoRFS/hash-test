import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Product {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  // TODO: should this be unsigned? I don't know
  @Column('int', { unsigned: true })
  public priceInCents!: number;

  @Column('text')
  public title!: string;

  @Column('text')
  public description!: string;
}
export default Product;
