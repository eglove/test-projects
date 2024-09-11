import { createForm } from "@tanstack/solid-form";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
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
import { addTodoOptions, getTodosOptions } from "~/data/todo-database";
import { logError } from "~/utils/console";

export const AddTodoModal = () => {
  const { isPending, mutate } = createMutation(addTodoOptions);
  const [isOpen, setIsOpen] = createSignal(false);
  const queryClient = useQueryClient();

  const form = createForm(() => {
    return {
      defaultValues: { name: "" },
      onSubmit: (data) => {
        mutate(data.value);
      },
    };
  });

  const handleSubmitForm = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit().catch(logError)
      .finally(() => {
        queryClient
          .invalidateQueries({ queryKey: getTodosOptions().queryKey })
          .catch(logError)
          .finally(() => {
            form.reset();
            setIsOpen(false);
          });
      });
  };


  return (
    <Dialog
      onOpenChange={setIsOpen}
      open={isOpen()}
    >
      <DialogTrigger as={Button}>
        Add Todo
      </DialogTrigger>
      <DialogContent class="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>
            Add Todo
          </DialogTitle>
          <DialogDescription class="sr-only">
            Add a todo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitForm}>
          <form.Field
            children={(field) => {
              return (
                <TextField>
                  <TextFieldLabel>
                    Name
                  </TextFieldLabel>
                  <TextFieldInput
                    required
                    onInput={(event) => {
                      const target = event.target as HTMLInputElement;
                      field().handleChange(target.value);
                    }}
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
              disabled={isPending}
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
