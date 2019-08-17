// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var discounts_pb = require('./discounts_pb.js');

function serialize_hash_Discount(arg) {
  if (!(arg instanceof discounts_pb.Discount)) {
    throw new Error('Expected argument of type hash.Discount');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hash_Discount(buffer_arg) {
  return discounts_pb.Discount.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hash_DiscountRequest(arg) {
  if (!(arg instanceof discounts_pb.DiscountRequest)) {
    throw new Error('Expected argument of type hash.DiscountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hash_DiscountRequest(buffer_arg) {
  return discounts_pb.DiscountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var DiscountsServiceService = exports.DiscountsServiceService = {
  getDiscount: {
    path: '/hash.DiscountsService/GetDiscount',
    requestStream: false,
    responseStream: false,
    requestType: discounts_pb.DiscountRequest,
    responseType: discounts_pb.Discount,
    requestSerialize: serialize_hash_DiscountRequest,
    requestDeserialize: deserialize_hash_DiscountRequest,
    responseSerialize: serialize_hash_Discount,
    responseDeserialize: deserialize_hash_Discount,
  },
  listDiscounts: {
    path: '/hash.DiscountsService/ListDiscounts',
    requestStream: true,
    responseStream: true,
    requestType: discounts_pb.DiscountRequest,
    responseType: discounts_pb.Discount,
    requestSerialize: serialize_hash_DiscountRequest,
    requestDeserialize: deserialize_hash_DiscountRequest,
    responseSerialize: serialize_hash_Discount,
    responseDeserialize: deserialize_hash_Discount,
  },
};

exports.DiscountsServiceClient = grpc.makeGenericClientConstructor(DiscountsServiceService);
