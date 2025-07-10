import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function PaymentManagement() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Payment Management",
            subtitle: "Manage payments, refunds, and payment processing"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Management</h2>
                <p className="text-gray-500">Payment management content will be implemented here.</p>
            </div>
        </div>
    )
}
