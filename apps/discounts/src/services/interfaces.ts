import { Dictionary } from 'ts-essentials';
import { User } from '@hash/protos/dist/users_pb';
import { Product } from '@hash/protos/dist/products_pb';
import { Discount } from '@hash/protos/dist/discounts_pb';

export interface Context {
  user?: User;
  product: Product;
  previous: Dictionary<Discount | null>;
}
