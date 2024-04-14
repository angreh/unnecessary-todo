import { act, render, screen } from "@testing-library/react";

import { DataTableFooter } from "./data-table-footer";
import userEvent from "@testing-library/user-event";

describe("Component: DataTableFooter", () => {
  const table = {
    getFilteredSelectedRowModel: () => ({
      rows: {
        length: 12,
      },
    }),
    getFilteredRowModel: () => ({
      rows: {
        length: 14,
      },
    }),
    getCanPreviousPage: jest.fn(),
    getCanNextPage: jest.fn(),
  } as any;

  it("should buttons work", async () => {
    render(<DataTableFooter table={table} />);

    const btnPrevious = screen.getByTestId("btn-previous");
    const btnNext = screen.getByTestId("btn-next");

    expect(btnPrevious).toBeInTheDocument();
    expect(btnNext).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(btnPrevious);
      await userEvent.click(btnNext);
    });

    expect(table.getCanPreviousPage).toHaveBeenCalled();
    expect(table.getCanNextPage).toHaveBeenCalled();
  });

  it("should render the right test", () => {
    render(<DataTableFooter table={table} />);

    expect(screen.getByText("12 of 14 row(s) selected.")).toBeInTheDocument();
  });
});
