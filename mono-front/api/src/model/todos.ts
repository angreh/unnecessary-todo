import { globalContext } from "./../global-context";
import { Todo } from "todos/todos_pb";
import { extractDate, extractId } from "utils/pb-wrapper";

export type TodoType = Todo.AsObject;

type getAllResponseType = { todos: TodoType[] };
type insertResponseType = {
  success: boolean;
  insertedId: number;
};

export const getAll = async (): Promise<getAllResponseType> => {
  const result = await globalContext.DB.todos.getAll();

  const todos = result.map((item) => ({
    id: extractId(item.getId()),
    title: item.getTitle(),
    type: item.getType(),
    status: item.getStatus(),
    createdat: extractDate(item.getCreatedat()),
  }));

  return { todos } as getAllResponseType;
};

export const insert = async (input: any): Promise<insertResponseType> => {
  const result: number | null = await globalContext.DB.todos.insert(input);

  if (!result) {
    return { success: false, insertedId: 0 };
  }

  return {
    success: true,
    insertedId: result,
  };
};
