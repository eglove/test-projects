import { createForm } from "@tanstack/solid-form";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { PencilIcon } from "lucide-solid";
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
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { getTodosOptions, type Todo, updateTodoOptions } from "~/data/todo-database";
import { logError } from "~/utils/console";

export const EditTodo = (properties: { todo: Todo }) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const queryClient = useQueryClient();

  const form = createForm(() => {
    return {
      defaultValues: properties.todo,
    };
  });

  const mutation = createMutation(() => {
    return {
      ...updateTodoOptions(),
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

  const handleSubmitForm = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    mutation.mutate(form.state.values);
  };

  return (
    <Dialog
      onOpenChange={setIsOpen}
      open={isOpen()}
    >
      <DialogTrigger
        as={Button}
        variant="ghost"
      >
        <PencilIcon class="size-4" />
      </DialogTrigger>
      <DialogContent class="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>
            Update Todo
          </DialogTitle>
          <DialogDescription class="sr-only">
            Update a todo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitForm}>
          <form.Field
            children={(field) => {
              return (
                <TextField>
                  <TextFieldLabel class="">
                    Name
                  </TextFieldLabel>
                  <TextFieldInput
                    required
                    onInput={(event) => {
                      const target = event.target as HTMLInputElement;
                      field().handleChange(target.value);
                    }}
                    class=""
                    name={field().name}
                    onBlur={field().handleBlur}
                    type="text"
                    value={field().state.value}
                  />
                </TextField>
              );
            }}
            name="name"
          />
          <DialogFooter>
            <Button
              class="my-4"
              type="submit"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
