"use client"

import React from 'react'
import { Bell, Search, Settings, ChevronDown, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

interface TopNavBarProps {
    title?: string
    subtitle?: string
}

export function TopNavBar({ title, subtitle = "Welcome back! Here's what's happening today." }: TopNavBarProps) {
    const { data: session } = useSession()

    const userDisplayName = session?.user?.name || "Manager"
    const userType = session?.user?.userType || "Admin"

    // Format userType for display
    const getDashboardName = (userType: string) => {
        switch (userType) {
            case "Admin":
                return "Manager Dashboard"
            case "UserHandler":
                return "User Handler Dashboard"
            case "TripSupport":
                return "Trip & Support Agent Dashboard"
            case "MarketingHandler":
                return "Marketing & Report Handler Dashboard"
            case "FinanceHandler":
                return "Finance Handler Dashboard"
            default:
                return "Manager Dashboard"
        }
    }

    const getUserRole = (userType: string) => {
        switch (userType) {
            case "Admin":
                return "Manager"
            case "UserHandler":
                return "User Handler"
            case "TripSupport":
                return "Trip & Support Agent"
            case "MarketingHandler":
                return "Marketing & Report Handler"
            case "FinanceHandler":
                return "Finance Handler"
            default:
                return "Manager"
        }
    }

    const dashboardName = getDashboardName(userType)
    const userRole = getUserRole(userType)

    // Get user initials for avatar
    const userInitials = userDisplayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 shadow-sm sticky top-0 z-50">
            {/* Left side - Sidebar toggle and title */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <SidebarTrigger className="-ml-1 hover:bg-gray-100 rounded-md p-2 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                    <h1 className="text-xl font-semibold text-gray-900 truncate">{title || dashboardName}</h1>
                    <p className="text-sm text-gray-500 truncate">{subtitle}</p>
                </div>
            </div>

            {/* Right side - Search, notifications, and user menu */}
            <div className="flex items-center gap-3 flex-shrink-0">
                {/* Search */}
                {/* <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search..."
                        className="w-64 xl:w-72 pl-10 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                    />
                </div> */}

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 h-9 w-9 flex-shrink-0">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
                        3
                    </span>
                </Button>

                {/* Settings */}
                {/* <Button variant="ghost" size="icon" className="hover:bg-gray-100 h-9 w-9 flex-shrink-0">
                    <Settings className="h-5 w-5 text-gray-600" />
                </Button> */}

                {/* User Menu */}
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg h-10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
                                    {userInitials}
                                </div>
                                <div className="hidden lg:flex flex-col text-left">
                                    <span className="text-sm font-semibold text-gray-900">{userDisplayName}</span>
                                    <span className="text-xs text-gray-500">{userRole}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 shadow-lg border border-gray-200">
                        <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Profile Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Account Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 hover:bg-red-50 cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
        </header>
    )
}
