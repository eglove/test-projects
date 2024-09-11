import { createQuery } from "@tanstack/solid-query";
import { For, Match, Switch } from "solid-js";

import { AddTodoModal } from "~/components/todo/add-todo-modal";
import { DeleteDatabase } from "~/components/todo/delete-database";
import { DeleteTodo } from "~/components/todo/delete-todo";
import { EditTodo } from "~/components/todo/edit-todo";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { getTodosOptions } from "~/data/todo-db";

export const TodoTable = () => {
  const query = createQuery(getTodosOptions);

  return (
    <>
      <div class="flex w-full justify-end">
        <AddTodoModal />
      </div>
      <div>
        <h1 class="mb-2 text-xl font-bold">
          Todos
        </h1>
        <Switch>
          <Match when={query.isPending}>
            <p>
              Loading...
            </p>
          </Match>
          <Match when={query.isSuccess}>

            <Table class="mx-auto max-w-3xl border-2">
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Name
                  </TableHead>
                  <TableHead>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={query.data}>
                  {(todo) => {
                    return (
                      <TableRow>
                        <TableCell class="text-left">
                          {todo.name}
                        </TableCell>
                        <TableCell>
                          <div class="flex items-center justify-end gap-1">
                            <EditTodo todo={todo} />
                            <DeleteTodo todo={todo} />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }}
                </For>
              </TableBody>
            </Table>
          </Match>
        </Switch>
      </div>
      <DeleteDatabase />
    </>
  );
};
