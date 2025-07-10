import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function SupportTickets() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Support Tickets",
            subtitle: "Handle support requests from drivers and riders"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Support Tickets</h2>
                <p className="text-gray-500">Support tickets content will be implemented here.</p>
            </div>
        </div>
    )
}
