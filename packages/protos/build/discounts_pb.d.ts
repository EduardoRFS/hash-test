// package: hash
// file: discounts.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class DiscountRequest extends jspb.Message { 
    getProductId(): string;
    setProductId(value: string): void;

    getUserId(): string;
    setUserId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiscountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DiscountRequest): DiscountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiscountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiscountRequest;
    static deserializeBinaryFromReader(message: DiscountRequest, reader: jspb.BinaryReader): DiscountRequest;
}

export namespace DiscountRequest {
    export type AsObject = {
        productId: string,
        userId: string,
    }
}

export class Discount extends jspb.Message { 
    getPct(): number;
    setPct(value: number): void;

    getValueInCents(): number;
    setValueInCents(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Discount.AsObject;
    static toObject(includeInstance: boolean, msg: Discount): Discount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Discount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Discount;
    static deserializeBinaryFromReader(message: Discount, reader: jspb.BinaryReader): Discount;
}

export namespace Discount {
    export type AsObject = {
        pct: number,
        valueInCents: number,
    }
}
