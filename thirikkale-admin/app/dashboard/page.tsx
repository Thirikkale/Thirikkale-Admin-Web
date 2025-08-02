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
import { Car, BarChart3 } from "lucide-react"
import { PiggyBank, Wallet } from "lucide-react"
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
import LiveTrips from "@/components/dashboards/trip-support/LiveTrips"
import TripHistory from "@/components/dashboards/trip-support/TripHistory"
import RiderSupport from "@/components/dashboards/trip-support/RiderSupport"
import DriverSupport from "@/components/dashboards/trip-support/DriverSupport"
import EmergencyAlerts from "@/components/dashboards/trip-support/EmergencyAlerts"
import DisputesResolutions from "@/components/dashboards/trip-support/ComplaintsResolutions"
import TripSupportDash from "@/components/dashboards/trip-support/TripSupportDash"
import TripAnalytics from "@/components/dashboards/trip-support/TripAnalytics"

// Marketing & Report Handler components
import DataAnalytics from "@/components/dashboards/marketing-handler/DataAnalytics"
import PromotionCodes from "@/components/dashboards/marketing-handler/PromotionCodes"
import MarketingHandlerSettings from "@/components/dashboards/marketing-handler/Settings"
import PointRules from "@/components/dashboards/marketing-handler/PointRules"
import RewardTiers from "@/components/dashboards/marketing-handler/RewardTiers"
import UserPoints from "@/components/dashboards/marketing-handler/UserPoints"
import RedemptionHistory from "@/components/dashboards/marketing-handler/RedemptionHistory"
import ReferralUsers from "@/components/dashboards/marketing-handler/ReferralUsers"
import ReferredUsers from "@/components/dashboards/marketing-handler/ReferredUsers"
import ReferralPrograms from "@/components/dashboards/marketing-handler/ReferralPrograms"
import SeasonalOffers from "@/components/dashboards/marketing-handler/SeasonalOffers"
import PartnerCampaigns from "@/components/dashboards/marketing-handler/PartnerCampaigns"
import Campaigns from "@/components/dashboards/marketing-handler/Campaigns"


// Finance Handler components
import PaymentManagement from "@/components/dashboards/finance-handler/PaymentManagement"
import DriverToCompany from "@/components/dashboards/finance-handler/DriverToCompany"
import CompanyToDriver from "@/components/dashboards/finance-handler/CompanyToDriver"
import FinanceAnalytics from "@/components/dashboards/finance-handler/FinancialAnalytics"
import CashTransactions from "@/components/dashboards/finance-handler/CashPayments"
import CardTransactions from "@/components/dashboards/finance-handler/CardPayments"
import FinanceHandlerDash from "@/components/dashboards/finance-handler/FinanceHandlerDash"
import TripsPayments from "@/components/dashboards/finance-handler/TripsPayments"
import FinanceHandlerSettings from "@/components/dashboards/finance-handler/Settings"

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
    { title: "Live Trips", url: "dashboard?tab=live-trips", icon: Settings2 },
    { title: "Trip History", url: "dashboard?tab=trip-history", icon: Activity },
    { title: "Emergency Alerts", url: "dashboard?tab=emergency-alerts", icon: Headset },
    { title: "Driver Support", url: "dashboard?tab=driver-support", icon: UserCog },
    { title: "Rider Support", url: "dashboard?tab=rider-support", icon: Users },
    { title: "Disputes & Resolutions", url: "dashboard?tab=disputes-resolutions", icon: Settings },
    { title: "Trip Analytics", url: "dashboard?tab=trip-analytics", icon: Star },
    { title: "Settings", url: "dashboard?tab=settings", icon: Settings },
  ],

  MarketingHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Campaigns", url: "dashboard?tab=campaigns", icon: ChartColumn },
    { title: "Point Rules", url: "dashboard?tab=point-rules", icon: Settings },
    { title: "Reward Tiers", url: "dashboard?tab=reward-tiers", icon: BarChart3 },
    { title: "User Points", url: "dashboard?tab=user-points", icon: Users },
    { title: "Redemption History", url: "dashboard?tab=redemption-history", icon: Activity },
    { title: "Referral Users", url: "dashboard?tab=referral-users", icon: Users },
    { title: "Referred Users", url: "dashboard?tab=referred-users", icon: UserCog },
    { title: "Referral Programs", url: "dashboard?tab=referral-programs", icon: Settings },
    { title: "Discount Codes", url: "dashboard?tab=discount-codes", icon: Activity },
    { title: "Seasonal Offers", url: "dashboard?tab=seasonal-offers", icon: Activity },
    { title: "Partner Campaigns", url: "dashboard?tab=partner-promotions", icon: Activity },
    { title: "Data Analytics", url: "dashboard?tab=data-analytics", icon: BarChart3 },
    { title: "Settings", url: "dashboard?tab=settings", icon: Settings },
  ],

  FinanceHandler: [
    { title: "Dashboard", url: "dashboard", icon: Home },
    { title: "Trips & Payments", url: "dashboard?tab=trips-payments", icon: Car },
    { title: "Payment Management", url: "dashboard?tab=payment-management", icon: HandCoins },
    { title: "Cash", url: "dashboard?tab=cash-transactions", icon: HandCoins },
    { title: "Card", url: "dashboard?tab=card-transactions", icon: Activity },
    { title: "Driver to Company", url: "dashboard?tab=driver-payouts-driver-to-company", icon: PiggyBank },
    { title: "Company to Driver", url: "dashboard?tab=driver-payouts-company-to-driver", icon: Wallet },
    { title: "Financial Analytics", url: "dashboard?tab=financial-analytics", icon: BarChart3 },
    { title: "Settings", url: "dashboard?tab=settings", icon: Settings },
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
      if (userType === "TripSupport") {
        return <TripSupportDash tab={tab} />
      }
      if (userType === "FinanceHandler") {
        return <FinanceHandlerDash />
      }
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
      if (tabTitle === "Live Trips") {
        return <LiveTrips />
      }
      if (tabTitle === "Trip History") {
        return <TripHistory />
      }
      if (tabTitle === "Emergency Alerts") {
        return <EmergencyAlerts />
      }
      if (tabTitle === "Driver Support") {
        return <DriverSupport />
      }
      if (tabTitle === "Rider Support") {
        return <RiderSupport />
      }
      if (tabTitle === "Disputes & Resolutions") {
        return <DisputesResolutions />
      }
      if (tabTitle === "Trip Analytics") {
        return <TripAnalytics />
      }
      if (tabTitle === "Settings") {
        return <SettingsPage />
      }
    }

    // Handle MarketingHandler components
    if (userType === "MarketingHandler") {
      // Removed EmailCampaigns, SMSCampaigns, PushNotifications
      if (tabTitle === "Point Rules") {
        return <PointRules />
      }
      if (tabTitle === "Reward Tiers") {
        return <RewardTiers />
      }
      if (tabTitle === "User Points") {
        return <UserPoints />
      }
      if (tabTitle === "Redemption History") {
        return <RedemptionHistory />
      }
      if (tabTitle === "Referral Users") {
        return <ReferralUsers />
      }
      if (tabTitle === "Referred Users") {
        return <ReferredUsers />
      }
      if (tabTitle === "Referral Programs") {
        return <ReferralPrograms />
      }
      if (tabTitle === "Discount Codes") {
        return <PromotionCodes />
      }
      if (tabTitle === "Seasonal Offers") {
        return <SeasonalOffers />
      }
      if (tabTitle === "Campaigns") {
        return <Campaigns />
      }
      if (tabTitle === "Partner Campaigns") {
        return <PartnerCampaigns />
      }
      if (tabTitle === "Data Analytics") {
        return <DataAnalytics />
      }
      if (tabTitle === "Settings") {
        return <MarketingHandlerSettings />
      }
    }

    // Handle FinanceHandler components
    if (userType === "FinanceHandler") {
      if (tabTitle === "Payment Management") {
        return <PaymentManagement />
      }
      if (tabTitle === "Cash") {
        return <CashTransactions />
      }
      if (tabTitle === "Card") {
        return <CardTransactions />
      }
      if (tabTitle === "Driver to Company") {
        return <DriverToCompany />
      }
      if (tabTitle === "Company to Driver") {
        return <CompanyToDriver />
      }
      if (tabTitle === "Trips & Payments") {
        return <TripsPayments />
      }
      if (tabTitle === "Financial Analytics" || tabTitle === "Reports & Analytics") {
        return <FinanceAnalytics />
      }
      if (tabTitle === "Settings") {
        return <FinanceHandlerSettings />
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
