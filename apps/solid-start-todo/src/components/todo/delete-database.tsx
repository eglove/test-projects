import { createMutation, useQueryClient } from "@tanstack/solid-query";

import { Button } from "~/components/ui/button";
import { deleteDatabaseOptions, getTodosOptions } from "~/data/todo-db";
import { logError } from "~/utils/console";

export const DeleteDatabase = () => {
  const queryClient = useQueryClient();

  const mutation = createMutation(() => {
    return {
      ...deleteDatabaseOptions(),
      onSettled() {
        queryClient
          .invalidateQueries({ queryKey: getTodosOptions().queryKey })
          .catch(logError);
      },
    };
  });

  return (
    <Button
      onClick={() => {
        mutation.mutate();
      }}
      class="my-4"
      disabled={mutation.isPending}
      variant="destructive"
    >
      Delete All
    </Button>
  );
};
