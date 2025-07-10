import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function UserHandlerDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "User Handler Dashboard",
            subtitle: "Manage user accounts, verification, and support requests"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">User Handler Dashboard</h2>
                <p className="text-gray-500">User management dashboard content will be implemented here.</p>
            </div>
        </div>
    )
}
