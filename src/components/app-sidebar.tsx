/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { NavLink, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar";
import { getSideBar } from "@/utils/getSideBar";
import Logo from "@/assets/icon/Logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const userStr = localStorage.getItem("user");
  const userData = userStr ? JSON.parse(userStr) : null;
  const userRole = userData?.role;

  const data = {
    navMain: getSideBar(userRole),
  };

  const isActiveRoute = (url: string) => location.pathname === url;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="pl-5">
        <NavLink to="/" className="flex items-center gap-2 text-blue-500 hover:text-blue-500 transition">
          <Logo />
          <span className="text-lg font-semibold tracking-wide">
            Doctor Appointment
          </span>
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`block w-full px-3 py-2 rounded-md transition-colors duration-200 ease-in-out ${isActiveRoute(item.url)
                          ? "text-blue-500 font-semibold bg-blue-100 dark:bg-blue-900/30"
                          : "text-foreground hover:text-foreground hover:bg-gray-700 dark:hover:bg-gray-700/50"
                          }`}
                      >
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}