import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  defaultPreload: "intent",
  routeTree,
});

declare module "@tanstack/react-router" {
  // @ts-expect-error needed
  type Register = {
    router: typeof router;
  };
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion,ethang/handle-native-error
const rootElement = document.querySelector("#app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
