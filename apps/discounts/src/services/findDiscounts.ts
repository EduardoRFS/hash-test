import { Discount } from '@hash/protos/dist/discounts_pb';
import * as UserModel from '../models/user';
import * as ProductModel from '../models/product';
import { MakeDiscount } from './makeDiscount';

type Pair = { productId: string; userId: string };
export type FindDiscounts = (pairs: Pair[]) => Promise<Discount[]>;

interface DI {
  services: {
    makeDiscount: MakeDiscount;
  };
  models: {
    users: { findByIds: UserModel.FindByIds };
    products: { findByIds: ProductModel.FindByIds };
  };
}
export default ({ services, models }: DI) => {
  const findDiscounts: FindDiscounts = async pairs => {
    const productIds = pairs.map(pair => pair.productId);
    const userIds = pairs.map(pair => pair.userId);

    const [productsById, usersById] = await Promise.all([
      models.products.findByIds(productIds),
      models.users.findByIds(userIds),
    ]);

    return pairs.map(({ productId, userId }) => {
      const product = productsById[productId];
      const user = usersById[userId];

      if (product) {
        return services.makeDiscount(product, user);
      }
      return new Discount();
    });
  };

  return findDiscounts;
};
