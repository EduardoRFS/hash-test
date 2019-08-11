// package: hash
// file: discounts.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as discounts_pb from "./discounts_pb";

interface IDiscountsServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getDiscount: IDiscountsServiceService_IGetDiscount;
    listDiscounts: IDiscountsServiceService_IListDiscounts;
}

interface IDiscountsServiceService_IGetDiscount extends grpc.MethodDefinition<discounts_pb.DiscountRequest, discounts_pb.Discount> {
    path: string; // "/hash.DiscountsService/GetDiscount"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<discounts_pb.DiscountRequest>;
    requestDeserialize: grpc.deserialize<discounts_pb.DiscountRequest>;
    responseSerialize: grpc.serialize<discounts_pb.Discount>;
    responseDeserialize: grpc.deserialize<discounts_pb.Discount>;
}
interface IDiscountsServiceService_IListDiscounts extends grpc.MethodDefinition<discounts_pb.DiscountRequest, discounts_pb.Discount> {
    path: string; // "/hash.DiscountsService/ListDiscounts"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<discounts_pb.DiscountRequest>;
    requestDeserialize: grpc.deserialize<discounts_pb.DiscountRequest>;
    responseSerialize: grpc.serialize<discounts_pb.Discount>;
    responseDeserialize: grpc.deserialize<discounts_pb.Discount>;
}

export const DiscountsServiceService: IDiscountsServiceService;

export interface IDiscountsServiceServer {
    getDiscount: grpc.handleUnaryCall<discounts_pb.DiscountRequest, discounts_pb.Discount>;
    listDiscounts: grpc.handleBidiStreamingCall<discounts_pb.DiscountRequest, discounts_pb.Discount>;
}

export interface IDiscountsServiceClient {
    getDiscount(request: discounts_pb.DiscountRequest, callback?: (error: grpc.ServiceError | null, response: discounts_pb.Discount) => void): grpc.ClientUnaryCall & PromiseLike<discounts_pb.Discount>;
    getDiscount(request: discounts_pb.DiscountRequest, metadata: grpc.Metadata, callback?: (error: grpc.ServiceError | null, response: discounts_pb.Discount) => void): grpc.ClientUnaryCall & PromiseLike<discounts_pb.Discount>;
    getDiscount(request: discounts_pb.DiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback?: (error: grpc.ServiceError | null, response: discounts_pb.Discount) => void): grpc.ClientUnaryCall & PromiseLike<discounts_pb.Discount>;
    listDiscounts(): grpc.ClientDuplexStream<discounts_pb.DiscountRequest, discounts_pb.Discount>;
    listDiscounts(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<discounts_pb.DiscountRequest, discounts_pb.Discount>;
    listDiscounts(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<discounts_pb.DiscountRequest, discounts_pb.Discount>;
}

export class DiscountsServiceClient extends grpc.Client implements IDiscountsServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getDiscount(request: discounts_pb.DiscountRequest, callback?: (error: grpc.ServiceError | null, response: discounts_pb.Discount) => void): grpc.ClientUnaryCall & PromiseLike<discounts_pb.Discount>;
    public getDiscount(request: discounts_pb.DiscountRequest, metadata: grpc.Metadata, callback?: (error: grpc.ServiceError | null, response: discounts_pb.Discount) => void): grpc.ClientUnaryCall & PromiseLike<discounts_pb.Discount>;
    public getDiscount(request: discounts_pb.DiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback?: (error: grpc.ServiceError | null, response: discounts_pb.Discount) => void): grpc.ClientUnaryCall & PromiseLike<discounts_pb.Discount>;
    public listDiscounts(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<discounts_pb.DiscountRequest, discounts_pb.Discount>;
    public listDiscounts(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<discounts_pb.DiscountRequest, discounts_pb.Discount>;
}
