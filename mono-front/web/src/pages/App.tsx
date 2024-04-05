import { useQuery } from "react-query";

import server from "../utils/trpcServer";
import { columns } from "../components/tasks/columns";
import { DataTable } from "../components/tasks/data-table";

import "./../styles/App.css";
import { BoxHeader } from "../components/box-header";
import { InputForm } from "../components/tasks/input-form";

function App() {
  const { data, isLoading, error } = useQuery("todos", async () => {
    const response = await server.todos.getAll.query();
    return response.todos;
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (error || typeof data == "undefined") {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="App container relative">
      <div className="rounded-[0.5rem] border mb-4 mt-8">
        <BoxHeader title="New Task" description="Add a new task" />

        <div className="px-8 py-4">
          <InputForm />
        </div>
      </div>

      <div className="rounded-[0.5rem] border">
        <BoxHeader title="Task" description="List of tasks" />

        <div className="px-8 py-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
