import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import AdminDash from './admin/AdminDash'
import UserHandlerDash from './user-handler/UserHandlerDash'
import TripSupportDash from './trip-support/TripSupportDash'
import MarketingHandlerDash from './marketing-handler/MarketingHandlerDash'
import FinanceHandlerDash from './finance-handler/FinanceHandlerDash'

export default function Dash() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const rawUserType = session?.user?.userType

    // Map backend userType (e.g., "ADMIN_ADMIN") to frontend format (e.g., "Admin")
    const userType = useMemo(() => {
        if (!rawUserType) return null
        
        console.log("🔍 Dash Component - Raw UserType:", rawUserType)
        
        // Backend format: "ADMIN_<ROLE>"
        const rolePart = rawUserType.replace("ADMIN_", "")
        
        // Map to frontend format
        switch (rolePart) {
            case "ADMIN":
                return "Admin"
            case "USER_HANDLER":
                return "UserHandler"
            case "TRIP_SUPPORT":
                return "TripSupport"
            case "FINANCE_HANDLER":
                return "FinanceHandler"
            case "MARKETING_HANDLER":
                return "MarketingHandler"
            default:
                console.warn("Unknown admin role in Dash:", rawUserType)
                return null
        }
    }, [rawUserType])

    console.log("✅ Dash Component - Mapped UserType:", userType)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    // Show loading state while session is being fetched
    if (status === "loading") {
        return <div className="p-6">Loading dashboard...</div>
    }

    // Show message if no valid user type
    if (!userType) {
        return (
            <div className="p-6">
                <p className="text-red-500">Invalid user type: {rawUserType}</p>
                <p className="text-sm text-gray-600 mt-2">Please contact administrator.</p>
            </div>
        )
    }

    return (
        <div>
            {userType === 'Admin' && <AdminDash />}
            {userType === 'UserHandler' && <UserHandlerDash />}
            {userType === 'TripSupport' && <TripSupportDash />}
            {userType === 'MarketingHandler' && <MarketingHandlerDash />}
            {userType === 'FinanceHandler' && <FinanceHandlerDash />}
        </div>
    )
}
