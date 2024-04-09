import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import server from "../../utils/trpcServer";
import {
  TodoStatusType,
  TodoStatusValues,
  TodoTypeType,
  TodoTypesValues,
} from "../../types/todos";
import {
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query/types/core/types";

type InputFormProps = {
  onFinish: (options?: RefetchOptions & RefetchQueryFilters) => Promise<any>;
};

export const InputForm = ({ onFinish: refetch }: InputFormProps) => {
  const [value, setValue] = useState("");
  const [todoType, setTodoType] = useState<TodoTypeType>();
  const [todoStatus, setTodoStatus] = useState<TodoStatusType>();

  const addTodo = async () => {
    try {
      if (!value || !todoType || !todoStatus) {
        throw new Error("missing values");
      }

      await server.todos.insert.mutate({
        title: value,
        type: todoType as string,
        status: todoStatus as string,
      });

      setValue("");

      // @ts-ignore : reset
      setTodoType("");

      // @ts-ignore : reset
      setTodoStatus("");

      refetch();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Task"
      />

      <Select
        value={todoType}
        onValueChange={(value: TodoTypeType) => setTodoType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          {TodoTypesValues.map((item, index) => (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={todoStatus}
        onValueChange={(value: TodoStatusType) => setTodoStatus(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          {TodoStatusValues.map((item, index) => (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={addTodo}>Add</Button>
    </div>
  );
};
