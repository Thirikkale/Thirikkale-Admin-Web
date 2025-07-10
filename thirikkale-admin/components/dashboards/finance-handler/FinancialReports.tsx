import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function FinancialReports() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Financial Reports",
            subtitle: "Generate and view financial reports and statements"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Financial Reports</h2>
                <p className="text-gray-500">Financial reports content will be implemented here.</p>
            </div>
        </div>
    )
}
