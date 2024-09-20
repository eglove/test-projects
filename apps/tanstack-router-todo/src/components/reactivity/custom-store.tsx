import { useState } from "react";

import { Store } from "../../store/store";

const store = new Store({
  count: 0,
});

export const CustomStore = () => {
  const [isShowingDisplay, setIsShowingDisplay] = useState(true);

  return (
    <div>
      <div>
        Custom
      </div>
      <div ref={store.bindRef(["count"])} />
      <div>
        <button
          onClick={() => {
            const current = store.get(["count"]);
            if (9 === current) {
              setIsShowingDisplay(false);
            }

            store.set(["count"], (current ?? 0) + 1);
          }}
          className="border-2 px-1"
          type="button"
        >
          Increment
        </button>
      </div>
      <div>
        Nested Value
      </div>
      {isShowingDisplay && <Wrapper />}
    </div>
  );
};

const Wrapper = () => {
  return <Display />;
};

const Display = () => {
  return <div ref={store.bindRef(["count"])} />;
};
