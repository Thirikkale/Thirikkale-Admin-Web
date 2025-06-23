"use client"

import * as React from "react"
import Image from "next/image"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  Shield,
  Home,
  Car,
  MapPinned,
  HandCoins,
  ChartColumn,
  ChartColumnBig,
  Settings,
  UserRoundCheck,
  Star,
  Headset,
  UserCog,
  Activity,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

type UserType = "admin" | "RiderSupport" | "DriverSupport"

const sidebarConfig: Record<UserType, { title: string; url: string; icon: React.ElementType }[]> = {
  admin: [
    { title: "Dashboard", url: "#", icon: Home },
    { title: "User Management", url: "#", icon: Users },
    { title: "Driver Management", url: "#", icon: Settings2 },
    { title: "Ride Management", url: "#", icon: MapPinned },
    { title: "Pricing", url: "#", icon: HandCoins },
    { title: "Analytics", url: "#", icon: ChartColumn },
    { title: "System Settings", url: "#", icon: Settings },
  ],
  RiderSupport: [
    { title: "Dashboard", url: "#", icon: Home },
    { title: "Rider Verification", url: "#", icon: UserRoundCheck },
    { title: "Ratings & Reviews", url: "#", icon: Star },
    { title: "Support Tickets", url: "#", icon: Headset },
    { title: "Account Management", url: "#", icon: UserCog },
    { title: "Activity Feed", url: "#", icon: Activity },
  ],
  DriverSupport: [
    { title: "Dashboard", url: "#", icon: Home },
    { title: "Document Verification", url: "#", icon: UserRoundCheck },
    { title: "Driver Performance", url: "#", icon: Star },
    { title: "Support Tickets", url: "#", icon: Headset },
    { title: "Account Management", url: "#", icon: UserCog },
    { title: "Activity Feed", url: "#", icon: Activity },
  ],
}

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function AppSidebar({
  userType = "admin",
  ...props
}: React.ComponentProps<typeof Sidebar> & { userType?: UserType }) {
  const items = sidebarConfig[userType] || []

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pb-0">
        <Image
          src="/ThirikkaleMain.svg"
          alt="App Logo"
          width={150}
          height={0}
          style={{ width: 150, height: "auto", marginRight: 8 }}
          priority
          className="self-center ml-2"
        />
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup  className="pt-0">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
