import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function DataAnalytics() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Data Analytics",
            subtitle: "Analyze business data and generate insights"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Data Analytics</h2>
                <p className="text-gray-500">Data analytics content will be implemented here.</p>
            </div>
        </div>
    )
}
