// package: hash
// file: products.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as discounts_pb from "./discounts_pb";

export class Product extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getPriceInCents(): number;
    setPriceInCents(value: number): void;

    getTitle(): string;
    setTitle(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;


    hasDiscount(): boolean;
    clearDiscount(): void;
    getDiscount(): discounts_pb.Discount | undefined;
    setDiscount(value?: discounts_pb.Discount): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Product.AsObject;
    static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Product;
    static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
    export type AsObject = {
        id: string,
        priceInCents: number,
        title: string,
        description: string,
        discount?: discounts_pb.Discount.AsObject,
    }
}
