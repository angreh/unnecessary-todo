import { useState } from "react";

import { TodoStatusType, TodoTypeType } from "./../types/todos";

export default function useSelects() {
  const [todoType, setTodoType] = useState<TodoTypeType>();
  const [todoStatus, setTodoStatus] = useState<TodoStatusType>();

  return { todoType, setTodoType, todoStatus, setTodoStatus };
}
