import { getCookieValue } from "@ethang/toolbelt/http/cookie";
import { queryOptions, useQueries, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import isError from "lodash/isError";
import map from "lodash/map";
import random from "lodash/random";
import times from "lodash/times";

type Item = {
  id: string;
  value: number;
};

const fetchFromMyApi = async (id: string) => {
  if ("undefined" === typeof window) {
    return;
  }

  const token = getCookieValue("token", document.cookie);

  if (isError(token)) {
    const didAuthorize = random(0, 9, false);
    if (0 === didAuthorize) {
      document.cookie += "token=true";
    } else {
      throw new Error("Not authorized");
    }
  }

  return new Promise<Item>((resolve, reject) => {
    const willResolve = random(0, 9, false);

    if (0 === willResolve) {
      setTimeout(() => {
        resolve({
          id,
          value: random(1000, 10_000, true),
        });
      }, 1000);
    } else {
      reject(new Error("Fail"));
    }
  });
};

const createQueries = () => {
  return times(100, () => {
    const id = crypto.randomUUID();

    return queryOptions({
      queryFn: async () => {
        return fetchFromMyApi(id);
      },
      queryKey: ["polling", "amount", id],
      refetchInterval: 100,
      staleTime: Infinity,
    });
  });
};

const queries = createQueries();

const Realtime = () => {
  const queryClient = useQueryClient();
  const results = useQueries({
    queries,
  });

  return (
    <div className="m-4">
      <div className="my-4 flex w-full justify-center gap-4 text-xl">
        <div className="text-blue-500">
          Loading
        </div>
        <div className="text-success">
          Fresh data success
        </div>
        <div className="text-red-500">
          Failed no cache
        </div>
        <div className="text-warning">
          Call failed, returned cached value
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {map(results, (result, index) => {
          if (result.isError) {
            const key = queries[index].queryKey;
            const cached = queryClient.getQueryData(key);

            if (cached) {
              return (
                <div
                  className="text-warning"
                  key={cached.id}
                >
                  {cached.value.toLocaleString(undefined, {
                    currency: "USD",
                    style: "currency",
                  })}
                </div>
              );
            }

            return (
              <div
                className="text-danger"
                key={index}
              >
                {result.error.message}
              </div>
            );
          }

          if (result.isPending) {
            return (
              <div
                className="text-blue-500"
                key={index}
              >
                ...
              </div>
            );
          }

          return (
            <div
              className="text-success"
              key={result.data?.id}
            >
              {result.data?.value.toLocaleString(undefined, {
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

export const Route = createFileRoute("/realtime")({
  component: Realtime,
});
