import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";

interface DataTableFooterProps<TData> {
  table: Table<TData>;
}

export function DataTableFooter<TData>({ table }: DataTableFooterProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <div className="flex text-sm justify-start text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
