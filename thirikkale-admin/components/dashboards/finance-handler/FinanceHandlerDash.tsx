import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function FinanceHandlerDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Finance Handler Dashboard",
            subtitle: "Monitor payments, transactions, and financial reports"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Finance Handler Dashboard</h2>
                <p className="text-gray-500">Finance management dashboard content will be implemented here.</p>
            </div>
        </div>
    )
}
