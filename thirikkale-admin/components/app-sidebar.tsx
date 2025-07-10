"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Users,
  Shield,
  Home,
  Car,
  HandCoins,
  ChartColumnBig,
  Settings,
  UserRoundCheck,
  Star,
  Headset,
  UserCog,
  Activity,
  ChevronDown,
  PieChart,
  CarFront,
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

type UserType = "Admin" | "UserHandler" | "TripSupport" | "MarketingHandler" | "FinanceHandler"

type SidebarItem = {
  title: string
  url?: string
  icon: React.ElementType
  children?: SidebarItem[]
}

const sidebarConfig: Record<UserType, SidebarItem[]> = {
  Admin: [
    { title: "Dashboard Overview", url: "dashboard", icon: Home },
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
    { title: "Reports & Analytics", url: "dashboard?tab=reports-analytics", icon: ChartColumnBig },
    { title: "Pricing & Policy Manage", url: "dashboard?tab=pricing-policy", icon: Shield },
    { title: "System Settings", url: "dashboard?tab=system-settings", icon: Settings },
  ],
  UserHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Rider Management", url: "dashboard?tab=rider-management", icon: Users },
    { title: "Driver Management", url: "dashboard?tab=driver-management", icon: Car },
    { title: "Vehicle Management", url: "dashboard?tab=vehicle-management", icon: CarFront },
    { title: "Verification Queue", url: "dashboard?tab=verification-queue", icon: UserRoundCheck },
    { title: "Reported Users", url: "dashboard?tab=reported-users", icon: Shield },
    { title: "User Statistics", url: "dashboard?tab=user-statistics", icon: PieChart },
    { title: "Settings", url: "dashboard?tab=settings", icon: Settings },
  ],
  TripSupport: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Trip Management", url: "dashboard?tab=trip-management", icon: Car },
    { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
    { title: "Driver Support", url: "dashboard?tab=driver-support", icon: UserCog },
  ],
  MarketingHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Marketing Campaigns", url: "dashboard?tab=marketing-campaigns", icon: ChartColumnBig },
    { title: "Report Generation", url: "dashboard?tab=report-generation", icon: Activity },
    { title: "Data Analytics", url: "dashboard?tab=data-analytics", icon: Star },
  ],
  FinanceHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Payment Management", url: "dashboard?tab=payment-management", icon: HandCoins },
    { title: "Transaction Monitoring", url: "dashboard?tab=transaction-monitoring", icon: Activity },
    { title: "Financial Reports", url: "dashboard?tab=financial-reports", icon: ChartColumnBig },
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
  userType = "Admin",
  ...props
}: React.ComponentProps<typeof Sidebar> & { userType?: UserType }) {
  const items = React.useMemo(() => sidebarConfig[userType] || [], [userType])
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

  // Toggle collapsible item
  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  // Helper to check if the tab is active
  const isActive = React.useCallback((url?: string) => {
    if (!url) return false

    // Extract the tab parameter from the URL
    const urlParts = url.split('?tab=')
    const tabName = urlParts[1]
    const currentTab = searchParams.get('tab')

    // If it's the main dashboard without tab parameter
    if (url === "dashboard" || url === "/dashboard") {
      return pathname === "/dashboard" && !currentTab
    }

    // If it's a tab-based URL, check if the current tab matches
    if (tabName) {
      return pathname === "/dashboard" && currentTab === tabName
    }

    return false
  }, [pathname, searchParams])

  // Helper to check if any child is active
  const isChildActive = (children?: SidebarItem[]) => {
    if (!children) return false
    return children.some(child => isActive(child.url))
  }

  // Close dropdowns when clicking on non-dropdown items
  const handleItemClick = () => {
    setOpenItems([])
  }

  // Auto-open dropdown if a child item is active, and close others when navigating away
  React.useEffect(() => {
    const shouldBeOpen: string[] = []

    items.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => isActive(child.url))
        if (hasActiveChild) {
          shouldBeOpen.push(item.title)
        }
      }
    })

    setOpenItems(shouldBeOpen)
  }, [searchParams, items, isActive])

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white" {...props}>
      <SidebarHeader className="pb-4 pt-6 flex justify-center border-b border-gray-100">
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
              width={140}
              height={58}
              style={{ width: 140, height: "auto" }}
              priority
              unoptimized
            />
          )}
        </div>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent className="overflow-hidden px-2">
        <SidebarGroup className="pt-0">
          <SidebarMenu className="overflow-y-auto overflow-x-hidden space-y-1">
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
                        tooltip={isCollapsed ? item.title : undefined}
                        size="lg"
                        className={`w-full h-12 rounded-lg sidebar-item ${isCollapsed ? 'justify-center' : 'px-3 py-2'} ${isChildActive(item.children)
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                          }`}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && (
                          <>
                            <span className="truncate font-medium text-sm">{item.title}</span>
                            <ChevronDown className={`ml-auto h-4 w-4 sidebar-chevron ${openItems.includes(item.title) ? 'sidebar-chevron-open' : ''}`} />
                          </>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className={`sidebar-dropdown-content ${openItems.includes(item.title) ? 'sidebar-dropdown-open' : ''}`}>
                      <SidebarMenu className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <SidebarMenuItem key={child.title} className="sidebar-dropdown-item">
                            <SidebarMenuButton asChild className="w-full">
                              <Link
                                href={child.url || "#"}
                                className={`h-10 rounded-lg px-3 py-2 flex items-center gap-3 text-sm font-medium sidebar-item ${isActive(child.url)
                                  ? "bg-blue-500 text-white shadow-sm"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                  }`}
                              >
                                <child.icon className="h-4 w-4 shrink-0" />
                                <span className="truncate">{child.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  // Render regular menu item
                  <SidebarMenuButton asChild className="w-full" tooltip={isCollapsed ? item.title : undefined} size="lg">
                    <Link
                      href={item.url || "#"}
                      onClick={handleItemClick}
                      className={`h-12 rounded-lg flex items-center text-sm font-medium sidebar-item ${isCollapsed ? 'justify-center px-2' : 'px-3 py-2 gap-3'} ${isActive(item.url)
                        ? "bg-blue-500 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-100 p-4">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
