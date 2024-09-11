import { queryOptions } from "@tanstack/react-query";
import { deleteDB, openDB } from "idb";

export type Todo = {
  id: number;
  name: string;
};

export const DB_NAME = "todoDB";
export const STORE_NAME = "todos";
export const DB_VERSION = 1;

const initDatabase = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, {
          autoIncrement: true,
          keyPath: "id",
        });

        store.createIndex("name", "name", { unique: true });
      }
    },
  });
};

export const addTodoOptions = () => {
  return {
    mutationFn: async (todo: Omit<Todo, "id">) => {
      const database = await initDatabase();
      const tx = database.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.add(todo);
      await tx.done;
    },
    mutationKey: ["todos", "add"],
  };
};

export const getTodosOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const database = await initDatabase();
      const tx = database.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const todos = await store.getAll();
      await tx.done;
      return todos as Todo[];
    },
    queryKey: ["todos"],
  });
};

export const deleteTodoOptions = () => {
  return {
    mutationFn: async (id: number) => {
      const database = await initDatabase();
      const tx = database.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.delete(id);
      await tx.done;
    },
    mutationKey: ["todos", "delete"],
  };
};

export const updateTodoOptions = () => {
  return {
    mutationFn: async (todo: Todo) => {
      const database = await initDatabase();
      const tx = database.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.put(todo);
      await tx.done;
    },
    mutationKey: ["todos", "update"],
  };
};

export const deleteDatabaseOptions = () => {
  return {
    mutationFn: async () => {
      await deleteDB(DB_NAME);
    },
    mutationKey: ["db", "delete"],
  };
};
