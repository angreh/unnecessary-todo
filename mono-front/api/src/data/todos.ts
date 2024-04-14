import * as grpc from "@grpc/grpc-js";

import { TodoServiceClient } from "externals/todos/todos_grpc_pb";
import {
  GetAllRequest,
  GetAllResponse,
  InsertRequest,
  InsertResponse,
  Todo,
} from "externals/todos/todos_pb";

const getTodosClient = <T>(NewRequest: T) => {
  const client = new TodoServiceClient(
    "ct-crud:50001",
    grpc.credentials.createInsecure()
  );

  const request = NewRequest;

  return { client, request };
};

export type TodoType = Todo.AsObject;

export const getAll = async (): Promise<Todo[]> =>
  new Promise<Todo[]>((resolve, reject) => {
    const { client, request } = getTodosClient(new GetAllRequest());

    client.getAll(request, (error, response: GetAllResponse) => {
      if (error) {
        reject({ todos: [] });
      }

      resolve(response.getTodosList());
    });
  });

export const insert = async (input: any): Promise<number | null> =>
  new Promise<number | null>((resolve, reject) => {
    const { client, request } = getTodosClient(new InsertRequest());

    const todo = new Todo();
    todo.setTitle(input.title);
    todo.setType(input.type);
    todo.setStatus(input.status);

    request.setTodo(todo);

    client.insert(request, (error, response: InsertResponse) => {
      if (error) {
        reject(null);
      }

      resolve(response.getInsertedid());
    });
  });
