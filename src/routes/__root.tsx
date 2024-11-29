import { Outlet, createRootRoute } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isDevelopment = import.meta.env.DEV;
  return (
    <>
      <Outlet />
      {isDevelopment && <TanStackRouterDevtools position="bottom-right" />}
    </>
  );
}
