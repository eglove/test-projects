import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";

import { addTodoOptions, getTodosOptions } from "../../data/todo-database";

export const AddTodo = () => {
  const queryClient = useQueryClient();
  const {
    isOpen, onClose: handleClose, onOpen, onOpenChange,
  } = useDisclosure();
  const [name, setName] = useState("");

  const { isPending, mutate } = useMutation({
    ...addTodoOptions(),
    async onSettled() {
      await queryClient.invalidateQueries(getTodosOptions()).finally(() => {
        handleClose();
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    mutate({ name });
  };

  return (
    <div className="mx-auto flex max-w-3xl justify-end">
      <Button
        className="my-4"
        color="primary"
        onPress={onOpen}
      >
        Add Todo
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
                  Add Todo
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <Input
                      label="Name"
                      onValueChange={setName}
                      value={name}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button
                      color="primary"
                      isLoading={isPending}
                      type="submit"
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </div>
  );
};
