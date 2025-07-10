import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function MarketingCampaigns() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Marketing Campaigns",
            subtitle: "Create and manage marketing campaigns and promotional activities"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Marketing Campaigns</h2>
                <p className="text-gray-500">Marketing campaigns content will be implemented here.</p>
            </div>
        </div>
    )
}
