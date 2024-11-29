import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BadgeCheck,
  Bell,
  Calendar,
  ChevronsUpDown,
  CreditCard,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { useTranslation } from "react-i18next";
import { user } from "@/mocks/user";

type DashboardSidebarProps = {
  currentPath?: string;
};

function getMonogram(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function DashboardSidebar({ currentPath }: DashboardSidebarProps) {
  const { state, isMobile } = useSidebar();

  const { t } = useTranslation("dashboard-sidebar", {
    lng: "en",
  });

  const items = [
    {
      title: t("menu-items.dashboard"),
      url: "/dashboard",
      icon: Home,
    },
    {
      title: t("menu-items.inbox"),
      url: "#",
      icon: Inbox,
    },
    {
      title: t("menu-items.calendar"),
      url: "#",
      icon: Calendar,
    },
    {
      title: t("menu-items.search"),
      url: "#",
      icon: Search,
    },
    {
      title: t("menu-items.settings"),
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            {t("dashboard-title")} <ModeToggle />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItems currentPath={currentPath!} items={items} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="p-0">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.getAvatar()} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {getMonogram(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.getAvatar()} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {getMonogram(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    {t("user-menu.upgrade-to-pro")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to="/dashboard/account">
                    <DropdownMenuItem>
                      <BadgeCheck />
                      {t("user-menu.account")}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <CreditCard />
                    {t("user-menu.billing")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    {t("user-menu.notifications")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  {t("user-menu.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

type SidebarMenuItemProps = {
  currentPath: string;
  items: { title: string; url: string; icon: any }[];
};

function SidebarMenuItems({ currentPath, items }: SidebarMenuItemProps) {
  return items.map((item) => (
    <SidebarMenuItem
      key={item.title}
      className={`${currentPath === item.url && "bg-sidebar-accent text-sidebar-accent-foreground rounded-md"}`}
    >
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
}
