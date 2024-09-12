import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";

import { deleteTodoOptions, getTodosOptions, type Todo } from "../../data/todo-database";

type DeleteTodoProperties = {
  todo: Todo;
};

export const DeleteTodo = ({ todo }: Readonly<DeleteTodoProperties>) => {
  const queryClient = useQueryClient();
  const {
    isOpen, onClose: handleClose, onOpen, onOpenChange,
  } = useDisclosure();

  const { isPending, mutate } = useMutation({
    ...deleteTodoOptions(),
    onSettled: async () => {
      await queryClient.invalidateQueries(getTodosOptions()).finally(() => {
        handleClose();
      });
    },
  });

  return (
    <>
      <Button
        isIconOnly
        className="border-0"
        onPress={onOpen}
        variant="ghost"
      >
        <TrashIcon className="size-4 text-danger" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  Delete Todo
                  {todo.name}
                  ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete this?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    onPress={() => {
                      mutate(todo.id);
                    }}
                    color="danger"
                    isLoading={isPending}
                    type="submit"
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};
