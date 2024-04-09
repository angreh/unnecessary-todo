import { Table } from "@tanstack/react-table";
import { CheckIcon, XIcon, CrosshairIcon, PlusCircleIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { TodoStatusValues, TodoTypesValues } from "./../../types/todos";
import { cn } from "./../../utils/utilsCn";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const columnType = table.getColumn("title");
  const selectedTypes = new Set(columnType?.getFilterValue() as string[]);

  const columnStatus = table.getColumn("status");
  const selectedValues = new Set(columnStatus?.getFilterValue() as string[]);

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center py-4">
      <div className="flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircleIcon className="mr-2 w-4" />
              Type
              {selectedTypes.size > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal">
                    {selectedTypes.size} selected
                  </Badge>
                </>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start">
            <Command>
              <CommandInput placeholder="Type" />

              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                <CommandList>
                  {TodoTypesValues.map((option, index) => {
                    const isSelected = selectedTypes.has(option);

                    return (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          if (isSelected) {
                            selectedTypes.delete(option);
                          } else {
                            selectedTypes.add(option);
                          }

                          const filterValues = Array.from(selectedTypes);
                          columnType?.setFilterValue(
                            filterValues.length ? filterValues : undefined
                          );
                        }}>
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}>
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        <span>{option}</span>
                      </CommandItem>
                    );
                  })}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircleIcon className="mr-2 w-4" />
              Status
              {selectedValues.size > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                </>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start">
            <Command>
              <CommandInput placeholder="status" />

              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                <CommandList>
                  {TodoStatusValues.map((option, index) => {
                    const isSelected = selectedValues.has(option);

                    return (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(option);
                          } else {
                            selectedValues.add(option);
                          }

                          const filterValues = Array.from(selectedValues);
                          columnStatus?.setFilterValue(
                            filterValues.length ? filterValues : undefined
                          );
                        }}>
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}>
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        {option}
                      </CommandItem>
                    );
                  })}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
