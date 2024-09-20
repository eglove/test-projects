import { produce } from "immer";
import get from "lodash/get.js";
import set from "lodash/set.js";

export type Listener = () => void;

type BaseRecord = Record<number | string | symbol, unknown>;

export class Store<TState extends BaseRecord> {
  private currentEffect: (() => void) | null = null;

  private readonly initialState: TState;

  private readonly listeners = new Set<Listener>();


  private state: TState;

  public constructor(initialState: TState) {
    this.state = initialState;
    this.initialState = initialState;
  }

  private effect(_function: () => void) {
    this.currentEffect = _function;

    try {
      _function();
    } finally {
      this.currentEffect = null;
    }
  }

  private notifySubscribers() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public bindValue<
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    Reference extends HTMLElement, TKey extends keyof TState,
  >(
    path: [TKey] | TKey,
    fallback?: TState[TKey],
  ) {
    return (element: null | Reference) => {
      if (element) {
        const updateElement = () => {
          element.textContent = String(this.get(path, fallback));
        };

        updateElement();

        this.effect(updateElement);

        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if ("childList" === mutation.type && 0 === mutation.addedNodes.length && 0 < mutation.removedNodes.length) {
              this.listeners.delete(updateElement);
            }
          }
        });

        if (element.parentNode) {
          observer.observe(element.parentNode, {
            childList: true,
            subtree: true,
          });
        }
      }
    };
  }

  public get<TKey extends keyof TState>(
    path: [TKey] | TKey,
    fallback?: TState[TKey],
  ) {
    if (this.currentEffect) {
      this.listeners.add(this.currentEffect);
    }

    return get(this.state, path, fallback);
  }

  public resetState() {
    this.state = this.initialState;
    this.notifySubscribers();
  }

  public set<TKey extends keyof TState>(
    path: [TKey] | TKey,
    value: TState[TKey],
  ) {
    this.state = produce(this.state, (draft) => {
      set(draft, path, value);
    });

    this.notifySubscribers();
  }

  public setBatch<TKey extends keyof TState>(
    batch: {
      path: [TKey] | TKey;
      value: TState[TKey];
    }[],
  ) {
    this.state = produce(this.state, (draft) => {
      for (const value of batch) {
        set(draft, value.path, value.value);
      }
    });

    this.notifySubscribers();
  }
}
