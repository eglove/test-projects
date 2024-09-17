/* eslint-disable func-style,@typescript-eslint/no-unnecessary-condition, no-param-reassign */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import map from "lodash/map";
import random from "lodash/random";
import { useEffect } from "react";

const counter = function *(value = 0) {
  while (true) {
    value += 1;
    yield value;
  }
};

const randomNumber = function *() {
  yield random(1, 10_000, true);
};

export const RealTimePush = () => {
  const queryClient = useQueryClient();

  // Set Up EventSource or Socket connection
  useEffect(() => {
    if ("undefined" === typeof window) {
      return;
    }

    const countGenerator = counter();

    const interval = setInterval(() => {
      // Source one, data overrides
      queryClient.setQueryData(["count"], countGenerator.next().value);

      // Source two, push to previous
      const history = queryClient.getQueryData<number[]>(["priceHistory"]) ?? [];
      history.unshift(randomNumber().next().value as number);
      queryClient.setQueryData(["priceHistory"], history);

      if (1000 <= history.length) {
        clearInterval(interval);
      }
    });

    return () => {
      clearInterval(interval);
    };
  }, [queryClient]);

  // Get count in app
  const { data: count } = useQuery<number>({
    queryKey: ["count"],
    staleTime: Infinity,
  });

  // Get priceHistory in app
  const { data: priceHistory } = useQuery<number[]>({
    queryKey: ["priceHistory"],
    staleTime: Infinity,
  });

  return (
    <div className="m-4">
      <p>
        Count:
        {" "}
        {String(count)}
      </p>
      <h2 className="text-2xl font-bold">
        Price History (
        {priceHistory?.length}
        )
      </h2>
      <div className="max-h-96 overflow-auto">
        {map(priceHistory, (item, index) => {
          return (
            <div key={index}>
              {item.toLocaleString(undefined, {
                currency: "USD",
                style: "currency",
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/realtime-push")({
  component: RealTimePush,
});
