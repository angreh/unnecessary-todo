// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var todos_pb = require('./todos_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

function serialize_todos_GetAllRequest(arg) {
  if (!(arg instanceof todos_pb.GetAllRequest)) {
    throw new Error('Expected argument of type todos.GetAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_todos_GetAllRequest(buffer_arg) {
  return todos_pb.GetAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_todos_GetAllResponse(arg) {
  if (!(arg instanceof todos_pb.GetAllResponse)) {
    throw new Error('Expected argument of type todos.GetAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_todos_GetAllResponse(buffer_arg) {
  return todos_pb.GetAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_todos_InsertRequest(arg) {
  if (!(arg instanceof todos_pb.InsertRequest)) {
    throw new Error('Expected argument of type todos.InsertRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_todos_InsertRequest(buffer_arg) {
  return todos_pb.InsertRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_todos_InsertResponse(arg) {
  if (!(arg instanceof todos_pb.InsertResponse)) {
    throw new Error('Expected argument of type todos.InsertResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_todos_InsertResponse(buffer_arg) {
  return todos_pb.InsertResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TodoServiceService = exports.TodoServiceService = {
  getAll: {
    path: '/todos.TodoService/GetAll',
    requestStream: false,
    responseStream: false,
    requestType: todos_pb.GetAllRequest,
    responseType: todos_pb.GetAllResponse,
    requestSerialize: serialize_todos_GetAllRequest,
    requestDeserialize: deserialize_todos_GetAllRequest,
    responseSerialize: serialize_todos_GetAllResponse,
    responseDeserialize: deserialize_todos_GetAllResponse,
  },
  insert: {
    path: '/todos.TodoService/Insert',
    requestStream: false,
    responseStream: false,
    requestType: todos_pb.InsertRequest,
    responseType: todos_pb.InsertResponse,
    requestSerialize: serialize_todos_InsertRequest,
    requestDeserialize: deserialize_todos_InsertRequest,
    responseSerialize: serialize_todos_InsertResponse,
    responseDeserialize: deserialize_todos_InsertResponse,
  },
};

exports.TodoServiceClient = grpc.makeGenericClientConstructor(TodoServiceService);
