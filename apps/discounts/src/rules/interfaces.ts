import { Dictionary } from 'ts-essentials';
import { Discount } from '@hash/protos/dist/discounts_pb';
import User from '../services/User';
import Product from '../services/Product';

export interface Context {
  readonly user: User;
  readonly product: Product;
  readonly previous: Dictionary<Discount | null>;
}
// null when doesn't apply to it
export type Rule = (context: Context) => Discount | null;
export type Rules = Dictionary<Rule>;
