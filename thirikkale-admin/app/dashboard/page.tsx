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
import Dash from "@/components/dashboards/Dash"

// Admin components
import Analytics from "@/components/dashboards/admin/Analytics"
import DriverManagement from "@/components/dashboards/admin/DriverManagement"
import Pricing from "@/components/dashboards/admin/Pricing"
import RideManagement from "@/components/dashboards/admin/RideManagement"
import SystemSettings from "@/components/dashboards/admin/SystemSettings"
import UserManagement from "@/components/dashboards/admin/UserManagement"

// driver support components
import DriverAccountManagement from "@/components/dashboards/driver-support/AccountManagement"
import DriverActivityFeed from "@/components/dashboards/driver-support/ActivityFeed"
import DriverDocumentVerification from "@/components/dashboards/driver-support/DocumentVerification"
import DriverPerformance from "@/components/dashboards/driver-support/DriverPerformance"
import DiverSupportTicket from "@/components/dashboards/driver-support/SupportTicket"

// rider support components
import RiderAccountManagement from "@/components/dashboards/rider-support/AccountManagement"
import RiderActivityFeed from "@/components/dashboards/rider-support/ActivityFeed"
import RiderRatingsAndReviews from "@/components/dashboards/rider-support/RatingsAndReviews"
import RiderVerification from "@/components/dashboards/rider-support/RiderVerification"
import RiderSupportTickets from "@/components/dashboards/rider-support/SupportTickets"

export default function Page() {
  // ALL HOOKS MUST BE AT THE TOP - NO CONDITIONAL LOGIC BEFORE HOOKS
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get userType from session
  const userType = session?.user?.userType
  const tab = searchParams.get("tab") || "dashboard"

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

  const tabs = userType ? tabConfig[userType as keyof typeof tabConfig] : []

  // Find the current tab config
  const currentTab = tabs.find(t =>
    t.url === "dashboard"
      ? tab === "dashboard"
      : t.url.endsWith(`tab=${tab}`)
  ) || tabs[0]

  // FIRST useEffect: Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // SECOND useEffect: Redirect if no userType
  useEffect(() => {
    if (status !== "loading" && !userType) {
      router.push("/login")
    }
  }, [status, userType, router])

  // THIRD useEffect: Tab validation
  useEffect(() => {
    if (userType && tab !== "dashboard" && tabs.length > 0) {
      const isValidTab = tabs.some(t => 
        t.url.endsWith(`tab=${tab}`)
      )
      
      if (!isValidTab) {
        router.push("/dashboard")
      }
    }
  }, [tab, tabs, router, userType])

  // NOW we can have conditional returns AFTER all hooks
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" text="Loading..." />
      </div>
    )
  }

  if (!userType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" text="Redirecting..." />
      </div>
    )
  }

  // Render different components based on currentTab.title and userType
  const renderTabComponent = () => {
    if (!currentTab) return <Dash />

    switch (currentTab.title) {
      case "Dashboard":
        return <Dash />
      
      // Admin-only components
      case "User Management":
        return userType === "Admin" ? <UserManagement /> : <Dash />
      case "Driver Management":
        return userType === "Admin" ? <DriverManagement /> : <Dash />
      case "Ride Management":
        return userType === "Admin" ? <RideManagement /> : <Dash />
      case "Pricing":
        return userType === "Admin" ? <Pricing /> : <Dash />
      case "Analytics":
        return userType === "Admin" ? <Analytics /> : <Dash />
      case "System Settings":
        return userType === "Admin" ? <SystemSettings /> : <Dash />
      
      // Rider Support components
      case "Rider Verification":
        return userType === "RiderSupport" ? <RiderVerification /> : <Dash />
      case "Ratings & Reviews":
        return userType === "RiderSupport" ? <RiderRatingsAndReviews /> : <Dash />
      
      // Driver Support components
      case "Document Verification":
        return userType === "DriverSupport" ? <DriverDocumentVerification /> : <Dash />
      case "Driver Performance":
        return userType === "DriverSupport" ? <DriverPerformance /> : <Dash />
      
      // Shared components that need user-type specific handling
      case "Support Tickets":
        switch (userType) {
          case "RiderSupport":
            return <RiderSupportTickets />
          case "DriverSupport":
            return <DiverSupportTicket />
          default:
            return <Dash />
        }
      
      case "Account Management":
        switch (userType) {
          case "RiderSupport":
            return <RiderAccountManagement />
          case "DriverSupport":
            return <DriverAccountManagement />
          default:
            return <Dash />
        }
      
      case "Activity Feed":
        switch (userType) {
          case "RiderSupport":
            return <RiderActivityFeed />
          case "DriverSupport":
            return <DriverActivityFeed />
          default:
            return <Dash />
        }
      
      default:
        return <Dash />
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
            {renderTabComponent()}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </LoadingProvider>
  )
}
