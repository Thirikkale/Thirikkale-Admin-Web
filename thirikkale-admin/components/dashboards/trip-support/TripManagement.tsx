import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function TripManagement() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Trip Management",
            subtitle: "Monitor active trips, handle disputes, and manage trip data"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Trip Management</h2>
                <p className="text-gray-500">Trip management content will be implemented here.</p>
            </div>
        </div>
    )
}
