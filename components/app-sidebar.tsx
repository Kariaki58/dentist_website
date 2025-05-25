"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  MapPinCheckInside,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
  Network,
} from "lucide-react"
import Link from "next/link"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "kariaki",
    email: "kariaki@gmail.com",
    avatar: "/public/profile/profile-1.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: ListIcon,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: UsersIcon,
    },
    {
      title: "Appointments",
      url: "/dashboard/appointments",
      icon: MapPinCheckInside,
    },
    {
      title: "Portfolio",
      url: "/dashboard/portfolio",
      icon: Network,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: UsersIcon,
    },
    {
      title: "Generate Review Link",
      url: "/dashboard/tokens",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Pending Reviews",
      url: "/dashboard/reviews/pending",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Approved Reviews",
      url: "/dashboard/reviews/approved",
      icon: LayoutDashboardIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Dentist</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
