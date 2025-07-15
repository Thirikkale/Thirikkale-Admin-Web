"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Loader } from "@/components/ui/loader"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { LoadingProvider } from "@/components/providers/LoaderProvider"
import { PageHeaderProvider, usePageHeader } from "@/components/providers/PageHeaderProvider"
import { useSearchParams } from "next/navigation"
import { Home, Users, Settings2, HandCoins, ChartColumn, Settings, UserRoundCheck, Star, Headset, UserCog, Activity } from "lucide-react"
import Dash from "@/components/dashboards/Dash"
import { TopNavBar } from "@/components/TopNavBar"

// Admin components
import Analytics from "@/components/dashboards/admin/Analytics"
import AdminDriverManagement from "@/components/dashboards/admin/DriverManagement"
import Pricing from "@/components/dashboards/admin/Pricing"
import AdminRiderManagement from "@/components/dashboards/admin/RiderManagement"
import SystemSettings from "@/components/dashboards/admin/SystemSettings"
import AdminManagement from "@/components/dashboards/admin/AdminManagement"
import FinanceManagement from "@/components/dashboards/admin/FinanceManagement"

// User Handler components
import RiderManagement from "@/components/dashboards/user-handler/RiderManagement"
import DriverManagement from "@/components/dashboards/user-handler/DriverManagement"
import VehicleManagement from "@/components/dashboards/user-handler/VehicleManagement"
import RiderReports from "@/components/dashboards/user-handler/RiderReports"
import DriverReports from "@/components/dashboards/user-handler/DriverReports"
import UserStatistics from "@/components/dashboards/user-handler/UserStatistics"
import SettingsPage from "@/components/dashboards/user-handler/Settings"

// Trip and Support Agent components
import TripManagement from "@/components/dashboards/trip-support/TripManagement"
import SupportTickets from "@/components/dashboards/trip-support/SupportTickets"
import DriverSupport from "@/components/dashboards/trip-support/DriverSupport"

// Marketing & Report Handler components
import MarketingCampaigns from "@/components/dashboards/marketing-handler/MarketingCampaigns"
import ReportGeneration from "@/components/dashboards/marketing-handler/ReportGeneration"
import DataAnalytics from "@/components/dashboards/marketing-handler/DataAnalytics"

// Finance Handler components
import PaymentManagement from "@/components/dashboards/finance-handler/PaymentManagement"
import TransactionMonitoring from "@/components/dashboards/finance-handler/TransactionMonitoring"
import FinancialReports from "@/components/dashboards/finance-handler/FinancialReports"

// Map userType to available tabs - matches the sidebar configuration
const tabConfig = {
  Admin: [
    { title: "Dashboard Overview", url: "dashboard", icon: Home },
    { title: "Admin Management", url: "dashboard?tab=admin-management", icon: UserCog },
    { title: "Rider Management", url: "dashboard?tab=rider-management", icon: Users },
    { title: "Driver Management", url: "dashboard?tab=driver-management", icon: Settings2 },
    { title: "Finance Management", url: "dashboard?tab=finance-management", icon: HandCoins },
    { title: "Company Revenue", url: "dashboard?tab=company-revenue", icon: HandCoins },
    { title: "Reports & Analytics", url: "dashboard?tab=reports-analytics", icon: ChartColumn },
    { title: "Pricing & Policy Manage", url: "dashboard?tab=pricing-policy", icon: Settings },
    { title: "System Settings", url: "dashboard?tab=system-settings", icon: Settings }
  ],

  UserHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Rider Management", url: "dashboard?tab=rider-management", icon: Users },
    { title: "Driver Management", url: "dashboard?tab=driver-management", icon: Settings2 },
    { title: "Vehicle Management", url: "dashboard?tab=vehicle-management", icon: Settings },
    { title: "Verification Queue", url: "dashboard?tab=verification-queue", icon: UserRoundCheck },
    { title: "Reported Users", url: "dashboard?tab=reported-users", icon: Headset },
    { title: "Rider Reports", url: "dashboard?tab=rider-reports", icon: Users },
    { title: "Driver Reports", url: "dashboard?tab=driver-reports", icon: Settings2 },
    { title: "User Statistics", url: "dashboard?tab=user-statistics", icon: Star },
    { title: "Settings", url: "dashboard?tab=settings", icon: Settings },
  ],

  TripSupport: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Trip Management", url: "dashboard?tab=trip-management", icon: Settings2 },
    { title: "Support Tickets", url: "dashboard?tab=support-tickets", icon: Headset },
    { title: "Driver Support", url: "dashboard?tab=driver-support", icon: UserCog },
  ],

  MarketingHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Marketing Campaigns", url: "dashboard?tab=marketing-campaigns", icon: ChartColumn },
    { title: "Report Generation", url: "dashboard?tab=report-generation", icon: Activity },
    { title: "Data Analytics", url: "dashboard?tab=data-analytics", icon: Star },
  ],

  FinanceHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Payment Management", url: "dashboard?tab=payment-management", icon: HandCoins },
    { title: "Transaction Monitoring", url: "dashboard?tab=transaction-monitoring", icon: Activity },
    { title: "Financial Reports", url: "dashboard?tab=financial-reports", icon: ChartColumn },
  ],
}

export default function Page() {
  // ALL HOOKS MUST BE AT THE TOP - NO CONDITIONAL LOGIC BEFORE HOOKS
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get userType from session
  const userType = session?.user?.userType
  const tab = searchParams.get("tab") || "dashboard"

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
    if (userType && tab !== "dashboard") {
      const tabs = userType ? tabConfig[userType as keyof typeof tabConfig] : []
      const isValidTab = tabs.some(t =>
        t.url.endsWith(`tab=${tab}`)
      )

      if (!isValidTab) {
        router.push("/dashboard")
      }
    }
  }, [tab, router, userType])

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

  return (
    <LoadingProvider>
      <PageHeaderProvider>
        <SidebarProvider>
          <AppSidebar userType={userType as "Admin" | "UserHandler" | "TripSupport" | "MarketingHandler" | "FinanceHandler"} />
          <SidebarInset>
            <DashboardContent />
          </SidebarInset>
        </SidebarProvider>
      </PageHeaderProvider>
    </LoadingProvider>
  )
}

function DashboardContent() {
  const { pageHeader } = usePageHeader()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const userType = session?.user?.userType
  const tab = searchParams.get("tab") || "dashboard"

  const tabs = useMemo(() => {
    return userType ? tabConfig[userType as keyof typeof tabConfig] : []
  }, [userType])

  // Find the current tab config
  const currentTab = tabs.find(t =>
    t.url === "dashboard"
      ? tab === "dashboard"
      : t.url.endsWith(`tab=${tab}`)
  ) || tabs[0]

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
      if (tabTitle === "Admin Management") {
        return <AdminManagement />
      }
      if (tabTitle === "Rider Management") {
        return <AdminRiderManagement />
      }
      if (tabTitle === "Driver Management") {
        return <AdminDriverManagement />
      }
      if (tabTitle === "Finance Management") {
        return <FinanceManagement />
      }
      if (tabTitle === "Company Revenue") {
        return <FinanceManagement />
      }
      if (tabTitle === "Reports & Analytics") {
        return <Analytics />
      }
      if (tabTitle === "Pricing & Policy Manage") {
        return <Pricing />
      }
      if (tabTitle === "System Settings") {
        return <SystemSettings />
      }
    }

    // Handle UserHandler components
    if (userType === "UserHandler") {
      if (tabTitle === "Rider Management") {
        return <RiderManagement />
      }
      if (tabTitle === "Driver Management") {
        return <DriverManagement />
      }
      if (tabTitle === "Vehicle Management") {
        return <VehicleManagement />
      }
      if (tabTitle === "Rider Reports") {
        return <RiderReports />
      }
      if (tabTitle === "Driver Reports") {
        return <DriverReports />
      }
      if (tabTitle === "User Statistics") {
        return <UserStatistics />
      }
      if (tabTitle === "Settings") {
        return <SettingsPage />
      }
    }

    // Handle TripSupport components
    if (userType === "TripSupport") {
      if (tabTitle === "Trip Management") {
        return <TripManagement />
      }
      if (tabTitle === "Support Tickets") {
        return <SupportTickets />
      }
      if (tabTitle === "Driver Support") {
        return <DriverSupport />
      }
    }

    // Handle MarketingHandler components
    if (userType === "MarketingHandler") {
      if (tabTitle === "Marketing Campaigns") {
        return <MarketingCampaigns />
      }
      if (tabTitle === "Report Generation") {
        return <ReportGeneration />
      }
      if (tabTitle === "Data Analytics") {
        return <DataAnalytics />
      }
    }

    // Handle FinanceHandler components
    if (userType === "FinanceHandler") {
      if (tabTitle === "Payment Management") {
        return <PaymentManagement />
      }
      if (tabTitle === "Transaction Monitoring") {
        return <TransactionMonitoring />
      }
      if (tabTitle === "Financial Reports") {
        return <FinancialReports />
      }
    }

    return <Dash />
  }

  return (
    <>
      <TopNavBar
        title={pageHeader.title}
        subtitle={pageHeader.subtitle}
      />
      <div className="flex flex-1 flex-col gap-4 p-6 pt-6 overflow-auto">
        {renderTabComponent()}
      </div>
    </>
  )
}
