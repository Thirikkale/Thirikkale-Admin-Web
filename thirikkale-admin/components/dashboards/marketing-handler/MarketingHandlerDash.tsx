import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function MarketingHandlerDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Marketing & Report Handler Dashboard",
            subtitle: "Manage marketing campaigns, generate reports, and analyze data"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Marketing & Report Handler Dashboard</h2>
                <p className="text-gray-500">Marketing and reporting dashboard content will be implemented here.</p>
            </div>
        </div>
    )
}
