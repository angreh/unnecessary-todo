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

export const InputForm = () => {
  const [value, setValue] = useState("");
  const [todoType, setTodoType] = useState<TodoTypeType>();
  const [todoStatus, setTodoStatus] = useState<TodoStatusType>();

  const addTodo = async () => {
    try {
      await server.todos.insert.mutate({
        title: value,
        type: todoType as string,
        status: todoStatus as string,
      });

      setValue("");
      setTodoType(undefined);
      setTodoStatus(undefined);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      console.log(err);
    }
  };

  const setTdType = (tdType: TodoTypeType) => {
    setTodoType(tdType);
  };

  const setTdStatus = (tdStatus: TodoStatusType) => {
    setTodoStatus(tdStatus);
  };

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Task"
      />
      <Select onValueChange={setTdType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {TodoTypesValues.map((item) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={setTdStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {TodoStatusValues.map((item) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={addTodo}>Add</Button>
    </div>
  );
};
