// package: hash.test
// file: users.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as google_status_pb from "./google_status_pb";

export class CreateUserRequest extends jspb.Message { 
    getFirstName(): string;
    setFirstName(value: string): void;

    getLastName(): string;
    setLastName(value: string): void;

    getDateOfBirth(): number;
    setDateOfBirth(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
    static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
    export type AsObject = {
        firstName: string,
        lastName: string,
        dateOfBirth: number,
    }
}

export class CreateUserResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): google_status_pb.Status | undefined;
    setError(value?: google_status_pb.Status): void;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserResponse): CreateUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
    static deserializeBinaryFromReader(message: CreateUserResponse, reader: jspb.BinaryReader): CreateUserResponse;
}

export namespace CreateUserResponse {
    export type AsObject = {
        error?: google_status_pb.Status.AsObject,
        user?: User.AsObject,
    }
}

export class ReadUserOptions extends jspb.Message { 
    getCacheAge(): number;
    setCacheAge(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadUserOptions.AsObject;
    static toObject(includeInstance: boolean, msg: ReadUserOptions): ReadUserOptions.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadUserOptions, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadUserOptions;
    static deserializeBinaryFromReader(message: ReadUserOptions, reader: jspb.BinaryReader): ReadUserOptions;
}

export namespace ReadUserOptions {
    export type AsObject = {
        cacheAge: number,
    }
}

export class ReadUserRequest extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ReadUserOptions | undefined;
    setOptions(value?: ReadUserOptions): void;

    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReadUserRequest): ReadUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadUserRequest;
    static deserializeBinaryFromReader(message: ReadUserRequest, reader: jspb.BinaryReader): ReadUserRequest;
}

export namespace ReadUserRequest {
    export type AsObject = {
        options?: ReadUserOptions.AsObject,
        id: string,
    }
}

export class ReadUserResponse extends jspb.Message { 

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): google_status_pb.Status | undefined;
    setStatus(value?: google_status_pb.Status): void;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ReadUserResponse): ReadUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadUserResponse;
    static deserializeBinaryFromReader(message: ReadUserResponse, reader: jspb.BinaryReader): ReadUserResponse;
}

export namespace ReadUserResponse {
    export type AsObject = {
        status?: google_status_pb.Status.AsObject,
        user?: User.AsObject,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getFirstName(): string;
    setFirstName(value: string): void;

    getLastName(): string;
    setLastName(value: string): void;

    getDateOfBirth(): number;
    setDateOfBirth(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        firstName: string,
        lastName: string,
        dateOfBirth: number,
    }
}
