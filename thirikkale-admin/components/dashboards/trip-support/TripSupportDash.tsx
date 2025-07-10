import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function TripSupportDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Trip & Support Agent Dashboard",
            subtitle: "Monitor trips, resolve driver issues, and manage support tickets"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Trip & Support Agent Dashboard</h2>
                <p className="text-gray-500">Trip management and support dashboard content will be implemented here.</p>
            </div>
        </div>
    )
}
