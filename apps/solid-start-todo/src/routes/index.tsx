import { DateTime } from "luxon";
import { createSignal, onCleanup } from "solid-js";

import { TodoTable } from "~/components/todo/todo-table";

const Home = () => {
  const [date, setDate] = createSignal(DateTime.now());

  const interval = setInterval(() => {
    setDate(DateTime.now());
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <main class="mx-auto p-4 text-center">
      <div>
        {date().toFormat("LLL. d, yyyy HH:mm:ss.SSS")}
      </div>
      <TodoTable />
    </main>
  );
};

export default Home;
