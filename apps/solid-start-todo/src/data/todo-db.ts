import { queryOptions } from "@tanstack/solid-query";
import { data } from "autoprefixer";
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

export const addTodo = async (todo: Omit<Todo, "id">) => {
  const database = await initDatabase();
  const tx = database.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add(todo);
  await tx.done;
};

export const addTodoOptions = () => {
  return {
    mutationFn: addTodo,
    mutationKey: ["todos", "add"],
  };
};


export const getTodos = async () => {
  const database = await initDatabase();
  const tx = database.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const todos = await store.getAll();
  await tx.done;
  return todos as Todo[];
};

export const getTodosOptions = () => {
  return queryOptions({
    queryFn: getTodos,
    queryKey: ["todos"],
  });
};

export const deleteTodo = async (id: number) => {
  const database = await initDatabase();
  const tx = database.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
};

export const deleteTodoOptions = (id: number) => {
  return {
    mutationFn: async () => {
      return deleteTodo(id);
    },
    mutationKey: ["todos", "delete", id],
  };
};

export const updateTodo = async (todo: Todo) => {
  const database = await initDatabase();
  const tx = database.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put(todo);
  await tx.done;
};

export const updateTodoOptions = () => {
  return {
    mutationFn: async (todo: Todo) => {
      return updateTodo(todo);
    },
    mutationKey: ["todos", "update"],
  };
};

export const deleteDatabase = async () => {
  await deleteDB(DB_NAME);
};

export const deleteDatabaseOptions = () => {
  return {
    mutationFn: deleteDatabase,
    mutationKey: ["db", "delete"],
  };
};
