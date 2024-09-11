import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import { TodoTable } from "../components/todo/todo-table";

const HomeComponent = () => {
  const [date, setDate] = useState(DateTime.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(DateTime.now());
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="mx-auto p-4 text-center">
      <div className="my-4">
        {date.toFormat("LLL. d, yyyy HH:mm:ss.SSS")}
      </div>
      <TodoTable />
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: HomeComponent,
});
