import * as reactQuery from "react-query";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-query");
const reactQueryMock = reactQuery as jest.Mocked<typeof reactQuery>;

test("renders learn react link", () => {
  reactQueryMock.useQuery.mockImplementation(
    () =>
      ({
        data: [],
        isLoading: false,
        error: null,
      } as any)
  );

  render(<App />);

  const box1title = screen.getByText(/Add a new task/i);
  expect(box1title).toBeInTheDocument();

  const box2title = screen.getByText(/List of tasks/i);
  expect(box2title).toBeInTheDocument();

  const addButton = screen.queryByTestId("add-button");
  expect(addButton).toBeInTheDocument();
});
