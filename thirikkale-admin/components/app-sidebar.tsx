"use client"

import * as React from "react"
import Image from "next/image"
import {
  Home,
  Car,
  MapPinned,
  HandCoins,
  ChartColumn,
  Settings,
  UserRoundCheck,
  Star,
  Headset,
  UserCog,
  Activity,
  Users,
  Settings2,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { usePathname, useSearchParams } from "next/navigation"

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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type UserType = "Admin" | "RiderSupport" | "DriverSupport"

type SidebarItem = {
  title: string
  url?: string
  icon: React.ElementType
  children?: SidebarItem[]
}

const sidebarConfig: Record<UserType, SidebarItem[]> = {
  Admin: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    {
      title: "User Management",
      icon: Users,
      children: [
        { title: "Admin Management", url: "dashboard?tab=admin-management", icon: UserCog },
        { title: "Rider Management", url: "dashboard?tab=rider-management", icon: Users },
        { title: "Driver Management", url: "dashboard?tab=driver-management", icon: Car },
      ],
    },
    { title: "Finance Management", url: "dashboard?tab=finance-management", icon: HandCoins },
    { title: "Pricing & Policy Manage", url: "dashboard?tab=pricing-policy", icon: Settings },
    { title: "Reports & Analytics", url: "dashboard?tab=reports-analytics", icon: ChartColumn },
    { title: "System Settings", url: "dashboard?tab=system-settings", icon: Settings },
  ],
  RiderSupport: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Account Management", url: "dashboard?tab=account-management", icon: UserCog },
    { title: "Rider Verification", url: "dashboard?tab=rider-verification", icon: UserRoundCheck },
    { title: "Ratings & Reviews", url: "dashboard?tab=ratings-reviews", icon: Star },
    { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
    { title: "Activity Feed", url: "dashboard?tab=activity-feed", icon: Activity },
  ],
  DriverSupport: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Account Management", url: "dashboard?tab=account-management", icon: UserCog },
    { title: "Document Verification", url: "dashboard?tab=document-verification", icon: UserRoundCheck },
    { title: "Driver Performance", url: "dashboard?tab=driver-performance", icon: Star },
    { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
    { title: "Activity Feed", url: "dashboard?tab=activity-feed", icon: Activity },
  ],
}

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "", // Empty string will trigger fallback
  }
}

export function AppSidebar({
  userType = "Admin",
  ...props
}: React.ComponentProps<typeof Sidebar> & { userType?: UserType }) {
  const items = sidebarConfig[userType] || []
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sidebarContext = useSidebar();
  const isCollapsed = sidebarContext.state === "expanded" ? false : true;

  // State to manage which collapsible items are open
  const [openItems, setOpenItems] = React.useState<string[]>([])

  // Close all collapsible items when sidebar collapses
  React.useEffect(() => {
    if (isCollapsed) {
      setOpenItems([])
    }
  }, [isCollapsed])

  // Get the full path with query string
  const fullPath = React.useMemo(() => {
    const params = searchParams.toString()
    return params ? `${pathname}?${params}` : pathname
  }, [pathname, searchParams])

  // Toggle collapsible item
  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  // Helper to check if the tab is active
  const isActive = (url?: string) => {
    if (!url) return false
    // For other items, check if the URL ends with this item's URL
    return fullPath.endsWith(url);
  }

  // Helper to check if any child is active
  const isChildActive = (children?: SidebarItem[]) => {
    if (!children) return false
    return children.some(child => isActive(child.url))
  }

  // Auto-open dropdown if a child item is active
  React.useEffect(() => {
    let shouldBeOpen: string[] = []

    items.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => isActive(child.url))
        if (hasActiveChild) {
          shouldBeOpen.push(item.title)
        }
      }
    })

    setOpenItems(shouldBeOpen)
  }, [searchParams, items])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pb-0 flex justify-center">
        <div
          style={{
            transition: "opacity 0.3s, width 0.3s",
            opacity: isCollapsed ? 0 : 1,
            width: isCollapsed ? 0 : "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
          {!isCollapsed && (
            <Image
              src="/ThirikkaleMain.svg"
              alt="App Logo"
              width={150}
              height={60}
              style={{ width: 150, height: "auto" }}
              priority
            />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.children ? (
                  // Render collapsible menu for items with children
                  <Collapsible
                    open={!isCollapsed && openItems.includes(item.title)}
                    onOpenChange={() => !isCollapsed && toggleItem(item.title)}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={`w-full ${isChildActive(item.children)
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50 text-gray-700'
                          }`}
                      >
                        <item.icon />
                        {!isCollapsed && (
                          <>
                            <span>{item.title}</span>
                            <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${openItems.includes(item.title) ? 'rotate-180' : ''}`} />
                          </>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu className="ml-6 mt-1">
                        {item.children.map((child) => (
                          <SidebarMenuItem key={child.title}>
                            <SidebarMenuButton asChild>
                              <a
                                href={child.url || "#"}
                                className={
                                  isActive(child.url)
                                    ? "bg-blue-400 text-white"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
                              >
                                <child.icon />
                                <span>{child.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  // Render regular menu item
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url || "#"}
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
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
