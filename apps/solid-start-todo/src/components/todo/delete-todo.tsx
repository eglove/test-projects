import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { TrashIcon } from "lucide-solid";
import { createSignal } from "solid-js";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { deleteTodoOptions, getTodosOptions, type Todo } from "~/data/todo-db";
import { logError } from "~/utils/console";

export const DeleteTodo = (properties: { todo: Todo }) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const queryClient = useQueryClient();

  const mutation = createMutation(() => {
    return {
      ...deleteTodoOptions(properties.todo.id),
      onSettled() {
        queryClient
          .invalidateQueries({ queryKey: getTodosOptions().queryKey })
          .catch(logError)
          .finally(() => {
            setIsOpen(false);
          });
      },
    };
  });

  return (
    <Dialog
      onOpenChange={setIsOpen}
      open={isOpen()}
    >
      <DialogTrigger
        as={Button}
        variant="ghost"
      >
        <TrashIcon class="size-4 text-destructive" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Todo
            {" "}
            {properties.todo.name}
            ?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              mutation.mutate();
            }}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
