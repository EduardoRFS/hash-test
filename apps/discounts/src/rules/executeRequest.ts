import { Discount } from '@hash/protos/dist/discounts_pb';
import R from 'ramda';
import User from '../services/User';
import Product from '../services/Product';
import findByIds from '../utils/findByIds';
import findDiscount from './findDiscount';

const executeRequest = async (requests: [User, Product][]) => {
  const productIds = requests.map(request => request.getProductId());
  const userIds = requests.map(request => request.getUserId());

  const [products, users] = await Promise.all([
    findByIds(Product, productIds),
    findByIds(User, userIds),
  ]);
  return R.zip(products, users).map(
    ([product, user]): Discount => {
      if (product && user) {
        return findDiscount(product, user);
      }
      return new Discount();
    }
  );
};
export default executeRequest;
