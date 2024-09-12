import { Button } from "@nextui-org/button";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";

import { getTodosOptions } from "../../data/todo-database";
import { AddTodo } from "./add-todo";
import { DeleteTodo } from "./delete-todo";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const TodoTable = () => {
  const { data, isPending } = useQuery(getTodosOptions());

  return (
    <>
      <div>
        <AddTodo />
      </div>
      <div >
        <h1 className="mb-2 text-xl font-bold">
          Todos
        </h1>
        {isPending &&
          <p>
            Loading...
          </p>}
        {data && (
          <Table
            isHeaderSticky
            isStriped
            aria-label="Todos"
            className="mx-auto max-w-3xl"
          >
            <TableHeader columns={columns}>
              {(column) => {
                return (
                  <TableColumn key={column.key}>
                    {column.label}
                  </TableColumn>
                );
              }}
            </TableHeader>
            <TableBody items={data}>
              {(item) => {
                return (
                  <TableRow key={item.id}>
                    {(columnKey) => {
                      if ("actions" === columnKey) {
                        return (
                          <TableCell >
                            <div className="flex gap-1">
                              <Button
                                isIconOnly
                                className="border-0"
                                variant="ghost"
                              >
                                <PencilIcon className="size-4" />
                              </Button>
                              <DeleteTodo todo={item} />
                            </div>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell>
                          {getKeyValue(item, columnKey)}
                        </TableCell>
                      );
                    }}
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};
