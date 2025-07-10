import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function TransactionMonitoring() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Transaction Monitoring",
            subtitle: "Monitor and track all financial transactions"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Transaction Monitoring</h2>
                <p className="text-gray-500">Transaction monitoring content will be implemented here.</p>
            </div>
        </div>
    )
}
