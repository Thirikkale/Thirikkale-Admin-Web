import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminDash from './admin/Overview'
import DriverSupportDash from './driver-support/DriverSupportDash'
import RiderSupportDash from './rider-support/RiderSupportDash'
import { useSearchParams } from 'next/navigation'

export default function Dash() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const userType = session?.user?.userType
    
    useEffect(() => {
    if (status === "unauthenticated" ) {
        router.push("/login")
    }
    }, [status, router])
    return (
        <div>
            {userType === 'Admin' && <AdminDash children={null} />}
            {userType === 'RiderSupport' && <RiderSupportDash children={null} />}
            {userType === 'DriverSupport' && <DriverSupportDash children={null} /> }
        </div>
    )
}
