import startsWith from "lodash/startsWith.js";

let currentEffect: (() => void) | null = null;

type HasToString = { toString: () => string };

class ReactiveValue<T extends HasToString> {
  private readonly listeners = new Set<() => void>();

  private value: T;

  public constructor(initialValue: T) {
    this.value = initialValue;
  }

  public get() {
    if (currentEffect) {
      this.listeners.add(currentEffect);
    }
    return this.value.toString();
  }

  public set(newValue: T) {
    if (newValue !== this.value) {
      this.value = newValue;
      for (const listener of this.listeners) {
        listener();
      }
    }
  }
}

const createReactiveValue = (value: HasToString) => {
  return new ReactiveValue(value);
};

const effect = (_function: () => void) => {
  currentEffect = _function;

  try {
    _function();
  } finally {
    currentEffect = null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const bindReactiveValue = <T extends HTMLElement>(
  reactiveValue: ReactiveValue<HasToString>,
) => {
  return (element: null | T) => {
    if (element) {
      element.innerHTML = reactiveValue.get();

      effect(() => {
        element.innerHTML = reactiveValue.get();
      });
    }
  };
};

const nameStore = createReactiveValue("John Doe");

export const EffectSystem = () => {
  return (
    <div>
      <div>
        Bound Effects
      </div>
      <div ref={bindReactiveValue(nameStore)} />
      <button
        onClick={() => {
          if (startsWith(nameStore.get(), "John")) {
            nameStore.set("Jane Doe");
          } else {
            nameStore.set("John Doe");
          }
        }}
        className="border-2 px-1"
        type="button"
      >
        Change Name
      </button>
      <div>
        Nested value:
        {" "}
        <EffectWrapper />
      </div>
    </div>
  );
};

export const EffectWrapper = () => {
  return <EffectDisplay />;
};

export const EffectDisplay = () => {
  return (
    <div ref={bindReactiveValue(nameStore)}>
      {nameStore.get()}
    </div>
  );
};

