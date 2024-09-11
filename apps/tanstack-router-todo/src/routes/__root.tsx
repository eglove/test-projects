// eslint-disable-next-line react/naming-convention/filename
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const queryClient = new QueryClient();

const RootComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});

