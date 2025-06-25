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
import { usePathname, useSearchParams } from "next/navigation"

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
    { title: "Dashboard", url: "dashboard?tab=admin", icon: Home },
    { title: "User Management", url: "dashboard?tab=user-management", icon: Users },
    { title: "Driver Management", url: "dashboard?tab=driver-management", icon: Settings2 },
    { title: "Ride Management", url: "dashboard?tab=ride-management", icon: MapPinned },
    { title: "Pricing", url: "dashboard?tab=pricing", icon: HandCoins },
    { title: "Analytics", url: "dashboard?tab=analytics", icon: ChartColumn },
    { title: "System Settings", url: "dashboard?tab=system-settings", icon: Settings },
  ],
  RiderSupport: [
    { title: "Dashboard", url: "dashboard?tab=rider-support", icon: Home },
    { title: "Rider Verification", url: "dashboard?tab=rider-verification", icon: UserRoundCheck },
    { title: "Ratings & Reviews", url: "dashboard?tab=ratings-reviews", icon: Star },
    { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
    { title: "Account Management", url: "dashboard?tab=account-management", icon: UserCog },
    { title: "Activity Feed", url: "dashboard?tab=activity-feed", icon: Activity },
  ],
  DriverSupport: [
    { title: "Dashboard", url: "dashboard?tab=driver-support", icon: Home },
    { title: "Document Verification", url: "dashboard?tab=document-verification", icon: UserRoundCheck },
    { title: "Driver Performance", url: "dashboard?tab=driver-performance", icon: Star },
    { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
    { title: "Account Management", url: "dashboard?tab=account-management", icon: UserCog },
    { title: "Activity Feed", url: "dashboard?tab=activity-feed", icon: Activity },
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
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the full path with query string
  const fullPath = React.useMemo(() => {
    const params = searchParams.toString()
    return params ? `${pathname}?${params}` : pathname
  }, [pathname, searchParams])

  // Helper to check if the tab is active
  const isActive = (url: string) => {
    // Compare only after the first slash, since your URLs are relative
    return fullPath.endsWith(url)
  }

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
        <SidebarGroup className="pt-0">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <a
                    href={item.url}
                    className={
                      isActive(item.url)
                      ? "bg-blue-400 text-primary"
                      : undefined
                    }
                    >
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
