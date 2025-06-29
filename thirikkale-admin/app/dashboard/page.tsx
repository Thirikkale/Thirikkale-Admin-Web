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
import { TopNavBar } from "@/components/TopNavBar"

// Admin components
import Analytics from "@/components/dashboards/admin/Analytics"
import DriverManagement from "@/components/dashboards/admin/DriverManagement"
import Pricing from "@/components/dashboards/admin/Pricing"
import RiderManagement from "@/components/dashboards/admin/RiderManagement"
import SystemSettings from "@/components/dashboards/admin/SystemSettings"
import AdminManagement from "@/components/dashboards/admin/AdminManagement"
import FinanceManagement from "@/components/dashboards/admin/FinanceManagement"

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

  // Map userType to available tabs - matches the sidebar configuration
  const tabConfig = {
    Admin: [
      { title: "Dashboard Overview", url: "dashboard", icon: Home },
      { title: "Admin Management", url: "dashboard?tab=admin-management", icon: UserCog },
      { title: "Rider Management", url: "dashboard?tab=rider-management", icon: Users },
      { title: "Driver Management", url: "dashboard?tab=driver-management", icon: Settings2 },
      { title: "Company Revenue", url: "dashboard?tab=company-revenue", icon: HandCoins },
      { title: "Reports & Analytics", url: "dashboard?tab=reports-analytics", icon: ChartColumn },
      { title: "Pricing & Policy Manage", url: "dashboard?tab=pricing-policy", icon: Settings },
      { title: "System Settings", url: "dashboard?tab=system-settings", icon: Settings },
      { title: "Finance Management", url: "dashboard?tab=finance-management", icon: HandCoins }
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
  }

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

  // Render different components based on tab parameter and userType
  const renderTabComponent = () => {
    if (!currentTab) return <Dash />

    const tabTitle = currentTab.title

    // Handle Dashboard tabs
    if (tabTitle === "Dashboard" || tabTitle === "Dashboard Overview") {
      return <Dash />
    }

    // Handle Admin-only components
    if (userType === "Admin") {
      if (tabTitle === "Admin Management" || tabTitle === "Admin Management") {
        return <AdminManagement />
      }
      if (tabTitle === "Rider Management") {
        return <RiderManagement /> // Using UserManagement for now, can be changed to specific component
      }
      if (tabTitle === "Driver Management") {
        return <DriverManagement />
      }
      if (tabTitle === "Finance Management" || tabTitle === "Finance Management") {
        return <FinanceManagement />
      }
      if (tabTitle === "Reports & Analytics" || tabTitle === "Analytics") {
        return <Analytics />
      }
      if (tabTitle === "Pricing & Policy Manage") {
        return <Pricing />
      }
      if (tabTitle === "System Settings") {
        return <SystemSettings />
      }
    }

    // Handle RiderSupport components
    if (userType === "RiderSupport") {
      if (tabTitle === "Rider Verification") {
        return <RiderVerification />
      }
      if (tabTitle === "Ratings & Reviews") {
        return <RiderRatingsAndReviews />
      }
      if (tabTitle === "Support Tickets") {
        return <RiderSupportTickets />
      }
      if (tabTitle === "Account Management") {
        return <RiderAccountManagement />
      }
      if (tabTitle === "Activity Feed") {
        return <RiderActivityFeed />
      }
    }

    // Handle DriverSupport components
    if (userType === "DriverSupport") {
      if (tabTitle === "Document Verification") {
        return <DriverDocumentVerification />
      }
      if (tabTitle === "Driver Performance") {
        return <DriverPerformance />
      }
      if (tabTitle === "Support Tickets") {
        return <DiverSupportTicket />
      }
      if (tabTitle === "Account Management") {
        return <DriverAccountManagement />
      }
      if (tabTitle === "Activity Feed") {
        return <DriverActivityFeed />
      }
    }

    return <Dash />
  }

  return (
    <LoadingProvider>
      <SidebarProvider>
        <AppSidebar userType={userType as "Admin" | "RiderSupport" | "DriverSupport"} />
        <SidebarInset>
          <TopNavBar
            subtitle="Welcome back! Here's what's happening today."
          />
          <div className="flex flex-1 flex-col gap-4 p-6 pt-6">
            {renderTabComponent()}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </LoadingProvider>
  )
}
