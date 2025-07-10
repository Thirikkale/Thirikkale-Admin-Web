import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminDash from './admin/AdminDash'
import UserHandlerDash from './user-handler/UserHandlerDash'
import TripSupportDash from './trip-support/TripSupportDash'
import MarketingHandlerDash from './marketing-handler/MarketingHandlerDash'
import FinanceHandlerDash from './finance-handler/FinanceHandlerDash'

export default function Dash() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const userType = session?.user?.userType

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

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
