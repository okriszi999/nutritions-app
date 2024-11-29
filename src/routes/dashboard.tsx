import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/dashboard-sidebar";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const path = Route.fullPath;
  return (
    <SidebarProvider>
      <DashboardSidebar currentPath={path} />
      <main className="px-6 py-2 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
