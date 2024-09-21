import { Store } from "@ethang/store/store";
import { useEffect, useState } from "react";

const store = new Store({
  count: 0,
});

export const CustomStore = () => {
  const [isShowingDisplay, setIsShowingDisplay] = useState(true);

  useEffect(() => {
    const link = document.querySelector<HTMLInputElement>("#id");
    store.bindRef<HTMLInputElement>((state, element) => {
      element.textContent = String(state.count);
    })(link);
  }, []);

  return (
    <div>
      <div>
        Custom
      </div>
      <div ref={store.bindRef((state, element) => {
        element.textContent = String(state.count);
      })}
      />
      <div>
        <button
          onClick={() => {
            const current = store.state.count;
            if (4 === current) {
              setIsShowingDisplay(false);
            }

            store.set((state) => {
              state.count = current + 1;
            });
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
  return (
    <>
      <div ref={store.bindRef((state, element) => {
        element.textContent = String(state.count);
      })}
      />
      <input
        onChange={(event) => {
          const { value } = event.target;
          store.set((state) => {
            state.count = Number(value);
          });
        }}
        ref={store.bindRef((state, element) => {
          element.value = String(state.count);
        })}
        type="number"
      />
    </>
  );
};
