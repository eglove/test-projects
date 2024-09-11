import "@fontsource/inter";
import { Router, type RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { Suspense } from "solid-js";

import "./app.css";

const queryClient = new QueryClient();

const Root = (properties: RouteSectionProps) => {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        {properties.children}
        <SolidQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
};

const App = () => {
  return (
    <Router
      root={Root}
    >
      <FileRoutes />
    </Router>
  );
};

export default App;
