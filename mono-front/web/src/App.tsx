import "./App.css";
import { useQuery } from "react-query";
import server from "./utils/trpcServer";
import { useState } from "react";
import { columns } from "./components/payments/columns";
import { DataTable } from "./components/payments/data-table";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [value, setValue] = useState("");
  const { data, isLoading, error, refetch } = useQuery("todos", async () => {
    const response = await server.todos.getAll.query();
    return response.todos;
  });

  const addTodo = async () => {
    try {
      await server.todos.insert.mutate({
        title: value,
      });

      refetch();
      setValue("");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      console.log(err);
    }
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (error || typeof data == "undefined") {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="App">
      <br />
      <div className="flex mx-auto px-8">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="New Task"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default App;
