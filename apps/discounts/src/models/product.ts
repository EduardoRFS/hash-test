import R from 'ramda';
import grpc from 'grpc';
import { ProductsServiceClient } from '@hash/protos/dist/products_grpc_pb';
import {
  ReadProductRequest,
  ListProductsRequest,
} from '@hash/protos/dist/products_pb';
import config from '../config';

const service = new ProductsServiceClient(
  config.services.products,
  grpc.credentials.createInsecure()
);
export const findById = async (id: string) => {
  const request = new ReadProductRequest();
  request.setId(id);

  const response = await service.readProduct(request);
  return response.getProduct();
};
export const findByIds = async (ids: string[]) => {
  const request = new ListProductsRequest();
  request.setIdList(ids);

  const response = await service.listProducts(request);
  const products = response.getProductsList();
  return R.indexBy(product => product.getId(), products);
};

export type FindById = typeof findById;
export type FindByIds = typeof findByIds;
