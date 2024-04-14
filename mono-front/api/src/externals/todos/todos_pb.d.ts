// package: todos
// file: todos.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class Todo extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): google_protobuf_any_pb.Any | undefined;
    setId(value?: google_protobuf_any_pb.Any): Todo;
    getTitle(): string;
    setTitle(value: string): Todo;
    getType(): string;
    setType(value: string): Todo;
    getStatus(): string;
    setStatus(value: string): Todo;

    hasCreatedat(): boolean;
    clearCreatedat(): void;
    getCreatedat(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedat(value?: google_protobuf_timestamp_pb.Timestamp): Todo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Todo.AsObject;
    static toObject(includeInstance: boolean, msg: Todo): Todo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Todo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Todo;
    static deserializeBinaryFromReader(message: Todo, reader: jspb.BinaryReader): Todo;
}

export namespace Todo {
    export type AsObject = {
        id?: google_protobuf_any_pb.Any.AsObject,
        title: string,
        type: string,
        status: string,
        createdat?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class GetAllRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllRequest): GetAllRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllRequest;
    static deserializeBinaryFromReader(message: GetAllRequest, reader: jspb.BinaryReader): GetAllRequest;
}

export namespace GetAllRequest {
    export type AsObject = {
    }
}

export class GetAllResponse extends jspb.Message { 
    getSuccess(): string;
    setSuccess(value: string): GetAllResponse;
    clearTodosList(): void;
    getTodosList(): Array<Todo>;
    setTodosList(value: Array<Todo>): GetAllResponse;
    addTodos(value?: Todo, index?: number): Todo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllResponse): GetAllResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllResponse;
    static deserializeBinaryFromReader(message: GetAllResponse, reader: jspb.BinaryReader): GetAllResponse;
}

export namespace GetAllResponse {
    export type AsObject = {
        success: string,
        todosList: Array<Todo.AsObject>,
    }
}

export class InsertRequest extends jspb.Message { 

    hasTodo(): boolean;
    clearTodo(): void;
    getTodo(): Todo | undefined;
    setTodo(value?: Todo): InsertRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InsertRequest.AsObject;
    static toObject(includeInstance: boolean, msg: InsertRequest): InsertRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InsertRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InsertRequest;
    static deserializeBinaryFromReader(message: InsertRequest, reader: jspb.BinaryReader): InsertRequest;
}

export namespace InsertRequest {
    export type AsObject = {
        todo?: Todo.AsObject,
    }
}

export class InsertResponse extends jspb.Message { 
    getSuccess(): string;
    setSuccess(value: string): InsertResponse;
    getInsertedid(): number;
    setInsertedid(value: number): InsertResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InsertResponse.AsObject;
    static toObject(includeInstance: boolean, msg: InsertResponse): InsertResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InsertResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InsertResponse;
    static deserializeBinaryFromReader(message: InsertResponse, reader: jspb.BinaryReader): InsertResponse;
}

export namespace InsertResponse {
    export type AsObject = {
        success: string,
        insertedid: number,
    }
}
