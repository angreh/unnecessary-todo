// package: todos
// file: todos.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as todos_pb from "./todos_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

interface ITodoServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getAll: ITodoServiceService_IGetAll;
    insert: ITodoServiceService_IInsert;
}

interface ITodoServiceService_IGetAll extends grpc.MethodDefinition<todos_pb.GetAllRequest, todos_pb.GetAllResponse> {
    path: "/todos.TodoService/GetAll";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<todos_pb.GetAllRequest>;
    requestDeserialize: grpc.deserialize<todos_pb.GetAllRequest>;
    responseSerialize: grpc.serialize<todos_pb.GetAllResponse>;
    responseDeserialize: grpc.deserialize<todos_pb.GetAllResponse>;
}
interface ITodoServiceService_IInsert extends grpc.MethodDefinition<todos_pb.InsertRequest, todos_pb.InsertResponse> {
    path: "/todos.TodoService/Insert";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<todos_pb.InsertRequest>;
    requestDeserialize: grpc.deserialize<todos_pb.InsertRequest>;
    responseSerialize: grpc.serialize<todos_pb.InsertResponse>;
    responseDeserialize: grpc.deserialize<todos_pb.InsertResponse>;
}

export const TodoServiceService: ITodoServiceService;

export interface ITodoServiceServer extends grpc.UntypedServiceImplementation {
    getAll: grpc.handleUnaryCall<todos_pb.GetAllRequest, todos_pb.GetAllResponse>;
    insert: grpc.handleUnaryCall<todos_pb.InsertRequest, todos_pb.InsertResponse>;
}

export interface ITodoServiceClient {
    getAll(request: todos_pb.GetAllRequest, callback: (error: grpc.ServiceError | null, response: todos_pb.GetAllResponse) => void): grpc.ClientUnaryCall;
    getAll(request: todos_pb.GetAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: todos_pb.GetAllResponse) => void): grpc.ClientUnaryCall;
    getAll(request: todos_pb.GetAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: todos_pb.GetAllResponse) => void): grpc.ClientUnaryCall;
    insert(request: todos_pb.InsertRequest, callback: (error: grpc.ServiceError | null, response: todos_pb.InsertResponse) => void): grpc.ClientUnaryCall;
    insert(request: todos_pb.InsertRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: todos_pb.InsertResponse) => void): grpc.ClientUnaryCall;
    insert(request: todos_pb.InsertRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: todos_pb.InsertResponse) => void): grpc.ClientUnaryCall;
}

export class TodoServiceClient extends grpc.Client implements ITodoServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getAll(request: todos_pb.GetAllRequest, callback: (error: grpc.ServiceError | null, response: todos_pb.GetAllResponse) => void): grpc.ClientUnaryCall;
    public getAll(request: todos_pb.GetAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: todos_pb.GetAllResponse) => void): grpc.ClientUnaryCall;
    public getAll(request: todos_pb.GetAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: todos_pb.GetAllResponse) => void): grpc.ClientUnaryCall;
    public insert(request: todos_pb.InsertRequest, callback: (error: grpc.ServiceError | null, response: todos_pb.InsertResponse) => void): grpc.ClientUnaryCall;
    public insert(request: todos_pb.InsertRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: todos_pb.InsertResponse) => void): grpc.ClientUnaryCall;
    public insert(request: todos_pb.InsertRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: todos_pb.InsertResponse) => void): grpc.ClientUnaryCall;
}
