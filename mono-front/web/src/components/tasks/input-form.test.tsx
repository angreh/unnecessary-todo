import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import { InputForm } from "./input-form";
import server from "../../utils/trpcServer";

jest.mock("../../hooks/useSelects", () => () => {
  return {
    todoType: "work",
    setTodoType: jest.fn(),
    todoStatus: "In Progress",
    setTodoStatus: jest.fn(),
  };
});

jest.mock("../../utils/trpcServer", () => ({
  todos: {
    insert: {
      mutate: jest.fn(),
    },
  },
}));

const refetch = jest.fn();

describe("Component: InputForm", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render properly", () => {
    render(<InputForm onFinish={refetch} />);

    const addInput = screen.getByTestId("add-input");
    expect(addInput).toBeInTheDocument();

    const addButton = screen.getByTestId("add-button");
    expect(addButton).toBeInTheDocument();
  });

  it("should not add a new task", async () => {
    render(<InputForm onFinish={refetch} />);
    const addInput = screen.getByTestId("add-input");
    const addButton = screen.getByTestId("add-button");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(addInput, "test");

      await userEvent.click(addButton);
    });

    expect(refetch).toHaveBeenCalled();
    expect(server.todos.insert.mutate).toHaveBeenCalled();
  });
});
