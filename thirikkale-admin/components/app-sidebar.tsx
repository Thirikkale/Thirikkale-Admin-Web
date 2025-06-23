"use client";

import * as React from "react"
import Image from "next/image"
import {
  Home,
  Activity,
  AlertCircle,
  Users,
  UserCheck,
  UserX,
  UserCog,
  Shield,
  Send,
  FileCheck,
  DollarSign,
  TrendingUp,
  Coins,
  Map,
  History,
  Globe,
  Gift,
  FileWarning,
  BookOpen,
  FileText,
  Database,
  Server,
  Link,
  Mail,
  MessageCircle,
  Bell,
  UserPlus,
  UserMinus,
  CheckCircle,
  XCircle,
  FileSearch,
  FileX,
  FilePlus,
  Star,
  Lock,
  Key,
  Globe2,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

type UserType = "superadmin" | "driversupport" | "ridersupport";

type SidebarTab = {
  title: string;
  url: string;
  icon: React.ElementType;
};

type SidebarGroupConfig = {
  label: string;
  tabs: SidebarTab[];
};

type SidebarConfig = Record<UserType, SidebarGroupConfig[]>;

const sidebarConfig: SidebarConfig = {
  superadmin: [
    {
      label: "Dashboard",
      tabs: [
        { title: "Dashboard", url: "#", icon: Home },
        { title: "System Health Overview", url: "#", icon: Activity },
        { title: "Key Metrics", url: "#", icon: TrendingUp },
        { title: "Alerts/Notifications", url: "#", icon: AlertCircle },
      ],
    },
    {
      label: "User Management",
      tabs: [
        { title: "Drivers", url: "#", icon: UserCheck },
        { title: "Riders", url: "#", icon: UserX },
        { title: "Support Agents", url: "#", icon: UserCog },
        { title: "Role & Permissions", url: "#", icon: Shield },
      ],
    },
    {
      label: "Financial",
      tabs: [
        { title: "Transactions", url: "#", icon: DollarSign },
        { title: "Payouts", url: "#", icon: Coins },
        { title: "Commission Settings", url: "#", icon: TrendingUp },
        { title: "Surge Pricing Config", url: "#", icon: DollarSign },
      ],
    },
    {
      label: "Operations",
      tabs: [
        { title: "Live Rides Map", url: "#", icon: Map },
        { title: "Ride History", url: "#", icon: History },
        { title: "Service Zones", url: "#", icon: Globe },
        { title: "Promo Codes", url: "#", icon: Gift },
      ],
    },
    {
      label: "Safety & Compliance",
      tabs: [
        { title: "Incident Reports", url: "#", icon: FileWarning },
        { title: "Emergency Logs", url: "#", icon: BookOpen },
        { title: "Audit Trail", url: "#", icon: FileText },
        { title: "Data Requests (GDPR)", url: "#", icon: Database },
      ],
    },
    {
      label: "System",
      tabs: [
        { title: "API Management", url: "#", icon: Server },
        { title: "Webhooks", url: "#", icon: Link },
        { title: "Email/SMS Templates", url: "#", icon: Mail },
        { title: "Third-Party Integrations", url: "#", icon: Globe2 },
      ],
    },
  ],
  driversupport: [
    {
      label: "Dashboard",
      tabs: [
        { title: "Dashboard", url: "#", icon: Home },
        { title: "Pending Verifications", url: "#", icon: CheckCircle },
        { title: "Driver Online Status", url: "#", icon: Activity },
        { title: "Urgent Tickets", url: "#", icon: AlertCircle },
      ],
    },
    {
      label: "Driver Management",
      tabs: [
        { title: "Onboarding Queue", url: "#", icon: UserPlus },
        { title: "Document Verification", url: "#", icon: FileCheck },
        { title: "Active Drivers", url: "#", icon: UserCheck },
        { title: "Deactivated Drivers", url: "#", icon: UserMinus },
      ],
    },
    {
      label: "Ride Support",
      tabs: [
        { title: "Active Ride Issues", url: "#", icon: AlertCircle },
        { title: "Cancellation Requests", url: "#", icon: XCircle },
        { title: "Fare Adjustments", url: "#", icon: DollarSign },
        { title: "Lost Items", url: "#", icon: FileSearch },
      ],
    },
    {
      label: "Payments",
      tabs: [
        { title: "Earnings Disputes", url: "#", icon: FileWarning },
        { title: "Payout Issues", url: "#", icon: FileX },
        { title: "Wallet Adjustments", url: "#", icon: FilePlus },
      ],
    },
    {
      label: "Communications",
      tabs: [
        { title: "Broadcast Messages", url: "#", icon: MessageCircle },
        { title: "Chat Support", url: "#", icon: Send },
        { title: "Notification Center", url: "#", icon: Bell },
      ],
    },
  ],
  ridersupport: [
    {
      label: "Dashboard",
      tabs: [
        { title: "Dashboard", url: "#", icon: Home },
        { title: "Open Tickets", url: "#", icon: AlertCircle },
        { title: "Recent Refund Requests", url: "#", icon: DollarSign },
        { title: "Priority Cases", url: "#", icon: Star },
      ],
    },
    {
      label: "Rider Management",
      tabs: [
        { title: "Account Recovery", url: "#", icon: Lock },
        { title: "Profile Updates", url: "#", icon: UserCog },
        { title: "Blocked Accounts", url: "#", icon: UserX },
      ],
    },
    {
      label: "Ride Support",
      tabs: [
        { title: "Cancellation Requests", url: "#", icon: XCircle },
        { title: "Refund Processing", url: "#", icon: DollarSign },
        { title: "Lost & Found", url: "#", icon: FileSearch },
        { title: "Accessibility Support", url: "#", icon: Key },
      ],
    },
    {
      label: "Payments",
      tabs: [
        { title: "Failed Transactions", url: "#", icon: FileX },
        { title: "Chargebacks", url: "#", icon: FileWarning },
        { title: "Promo Code Issues", url: "#", icon: Gift },
        { title: "Wallet Management", url: "#", icon: FilePlus },
      ],
    },
    {
      label: "Safety",
      tabs: [
        { title: "Incident Reports", url: "#", icon: FileWarning },
        { title: "Block Pairings", url: "#", icon: Lock },
        { title: "Emergency Contacts", url: "#", icon: BookOpen },
      ],
    },
  ],
};

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({
  userType = "superadmin",
  ...props
}: React.ComponentProps<typeof Sidebar> & { userType?: UserType }) {
  const groups = sidebarConfig[userType] || [];

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
        {groups.map((group) => (
          <SidebarGroup
            key={group.label}
            className='pt-0'
          >
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.tabs.map((tab) => (
                <SidebarMenuItem key={tab.title}>
                  <SidebarMenuButton asChild>
                    <a href={tab.url}>
                      <tab.icon />
                      <span>{tab.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
