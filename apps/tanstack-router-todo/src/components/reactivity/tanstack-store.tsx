import { Store, useStore } from "@tanstack/react-store";
import startsWith from "lodash/startsWith";

const tanstackStore = new Store({ name: "John Doe" });

export const TanstackStore = () => {
  const name = useStore(tanstackStore, (state) => {
    return state.name;
  });

  return (
    <div>
      <div>
        TanStack Store
      </div>
      <div>
        {name}
      </div>
      <button
        onClick={() => {
          tanstackStore.setState((state) => {
            return {
              ...state,
              name: startsWith(name, "John")
                ? "Jane Doe"
                : "John Doe",
            };
          });
        }}
        className="border-2 px-1"
        type="button"
      >
        Change Name
      </button>
      <div>
        Nested value
        {" "}
        <Wrapper />
      </div>
    </div>
  );
};

export const Wrapper = () => {
  return <Display />;
};

export const Display = () => {
  const name = useStore(tanstackStore, (state) => {
    return state.name;
  });

  return (
    <div>
      {name}
    </div>
  );
};

