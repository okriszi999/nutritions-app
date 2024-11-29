import "@/lib/i18n";

import { Outlet, createRootRoute } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isDevelopment = import.meta.env.DEV;
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Outlet />
      {isDevelopment && <TanStackRouterDevtools position="bottom-right" />}
    </ThemeProvider>
  );
}
