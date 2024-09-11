// eslint-disable-next-line react/naming-convention/filename
import { NextUIProvider } from "@nextui-org/react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";


const RootComponent = () => {
  return (
    <NextUIProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </NextUIProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});

