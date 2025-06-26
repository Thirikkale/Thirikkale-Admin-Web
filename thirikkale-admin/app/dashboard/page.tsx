"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Loader } from "@/components/ui/loader"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { LoadingProvider } from "@/components/providers/LoaderProvider"
import { useSearchParams } from "next/navigation"
import { Home, Users, Settings2, MapPinned, HandCoins, ChartColumn, Settings, UserRoundCheck, Star, Headset, UserCog, Activity } from "lucide-react"


export default function Page() {
  // Move ALL hooks to the top before any conditional logic
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Show loading state AFTER all hooks are declared
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" text="Loading..." />
      </div>
    )
  }

  // Get userType from session or default to "Admin" if not available
  const userType = session?.user?.userType || "Admin"
  
  // Map userType to available tabs
  const tabConfig = {
    Admin: [
      { title: "Dashboard", url: "dashboard", icon: Home },
      { title: "User Management", url: "dashboard?tab=user-management", icon: Users },
      { title: "Driver Management", url: "dashboard?tab=driver-management", icon: Settings2 },
      { title: "Ride Management", url: "dashboard?tab=ride-management", icon: MapPinned },
      { title: "Pricing", url: "dashboard?tab=pricing", icon: HandCoins },
      { title: "Analytics", url: "dashboard?tab=analytics", icon: ChartColumn },
      { title: "System Settings", url: "dashboard?tab=system-settings", icon: Settings },
    ],
    RiderSupport: [
      { title: "Dashboard", url: "dashboard", icon: Home },
      { title: "Rider Verification", url: "dashboard?tab=rider-verification", icon: UserRoundCheck },
      { title: "Ratings & Reviews", url: "dashboard?tab=ratings-reviews", icon: Star },
      { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
      { title: "Account Management", url: "dashboard?tab=account-management", icon: UserCog },
      { title: "Activity Feed", url: "dashboard?tab=activity-feed", icon: Activity },
    ],
    DriverSupport: [
      { title: "Dashboard", url: "dashboard", icon: Home },
      { title: "Document Verification", url: "dashboard?tab=document-verification", icon: UserRoundCheck },
      { title: "Driver Performance", url: "dashboard?tab=driver-performance", icon: Star },
      { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
      { title: "Account Management", url: "dashboard?tab=account-management", icon: UserCog },
      { title: "Activity Feed", url: "dashboard?tab=activity-feed", icon: Activity },
    ],
  } as const

  const tab = searchParams.get("tab") || "dashboard"
  const tabs = tabConfig[userType as keyof typeof tabConfig]

  // Find the current tab config
  const currentTab = tabs.find(t =>
    t.url === "dashboard"
      ? tab === "dashboard"
      : t.url.endsWith(`tab=${tab}`)
  ) || tabs[0]

  // Render different components based on currentTab.title
  const renderTabComponent = () => {
    switch (currentTab.title) {
      case "Dashboard":
        return <div>Dashboard Content</div>
      case "User Management":
        return <div>User Management Content</div>
      case "Driver Management":
        return <div>Driver Management Content</div>
      case "Ride Management":
        return <div>Ride Management Content</div>
      case "Pricing":
        return <div>Pricing Content</div>
      case "Analytics":
        return <div>Analytics Content</div>
      case "System Settings":
        return <div>System Settings Content</div>
      case "Rider Verification":
        return <div>Rider Verification Content</div>
      case "Ratings & Reviews":
        return <div>Ratings & Reviews Content</div>
      case "Support Tickets":
        return <div>Support Tickets Content</div>
      case "Account Management":
        return <div>Account Management Content</div>
      case "Activity Feed":
        return <div>Activity Feed Content</div>
      case "Document Verification":
        return <div>Document Verification Content</div>
      case "Driver Performance":
        return <div>Driver Performance Content</div>
      default:
        return <div>Dashboard Content</div>
    }
  }

  return (
    <LoadingProvider>
      <SidebarProvider>
        <AppSidebar userType={userType as "Admin" | "RiderSupport" | "DriverSupport"} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Render the appropriate tab component */}
            {renderTabComponent()}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </LoadingProvider>
  )
}
