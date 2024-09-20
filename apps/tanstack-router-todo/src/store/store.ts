import { produce } from "immer";
import get from "lodash/get.js";
import isNil from "lodash/isNil";
import set from "lodash/set.js";

export type Listener = () => void;

type BaseRecord = Record<number | string | symbol, unknown>;

export class Store<TState extends BaseRecord> {
  private readonly initialState: TState;

  private readonly listeners = new Set<Listener>();

  private state: TState;

  public constructor(initialState: TState) {
    this.state = initialState;
    this.initialState = initialState;
  }

  private notifySubscribers() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public bindRef<
    TKey extends keyof TState,
    Element extends HTMLElement,
  >(
    path: [TKey] | TKey,
    elementAccessor: keyof Element | undefined,
    callback?: (element: Element) => void,
  ) {
    return (element: Element | null) => {
      if (element) {
        const updateElement = () => {
          if (!isNil(elementAccessor)) {
            element[elementAccessor] =
                String(this.get(path)) as Element[keyof Element];
          }
          callback?.(element);
        };

        updateElement();
        this.listeners.add(updateElement);

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
