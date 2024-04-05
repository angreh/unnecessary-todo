import { z } from "zod";

import { TodoServiceClient } from "../todos/todos_grpc_pb";
import {
  Todo,
  GetAllRequest,
  GetAllResponse,
  InsertRequest,
  InsertResponse,
} from "../todos/todos_pb";
import * as grpc from "@grpc/grpc-js";
import { router, publicProcedure } from "./trcp";
import { extractDate, extractId } from "./../utils/pb-wrapper";

const getTodosClient = <T>(NewRequest: T) => {
  const client = new TodoServiceClient(
    "ct-crud:50001",
    grpc.credentials.createInsecure()
  );

  const request = NewRequest;

  return { client, request };
};

export type TodoType = Todo.AsObject;

type getAllResponseType = { todos: TodoType[] };
type insertResponseType = {
  success: boolean;
  insertedId: number;
};

export const apiRouter = router({
  getAll: publicProcedure.query(
    async () =>
      new Promise<getAllResponseType>((resolve, reject) => {
        const { client, request } = getTodosClient(new GetAllRequest());

        client.getAll(request, (error, response: GetAllResponse) => {
          if (error) {
            reject({ todos: [] } as getAllResponseType);
          }

          const todos = {
            todos: response.getTodosList().map((item) => ({
              id: extractId(item.getId()),
              title: item.getTitle(),
              type: item.getType(),
              status: item.getStatus(),
              createdat: extractDate(item.getCreatedat()),
            })),
          };
          resolve(todos as getAllResponseType);
        });
      })
  ),
  insert: publicProcedure
    .input(
      z.object({
        title: z.string(),
        type: z.string(),
        status: z.string(),
      })
    )
    .mutation(
      async ({ input }) =>
        new Promise<insertResponseType>((resolve, reject) => {
          const { client, request } = getTodosClient(new InsertRequest());

          const todo = new Todo();
          todo.setTitle(input.title);
          todo.setType(input.type);
          todo.setStatus(input.status);

          request.setTodo(todo);

          client.insert(request, (error, response: InsertResponse) => {
            if (error) {
              reject({ success: false, insertedId: 0 } as insertResponseType);
            }

            const insertedId = response.getInsertedid();
            resolve({ success: true, insertedId } as insertResponseType);
          });
        })
    ),
});
