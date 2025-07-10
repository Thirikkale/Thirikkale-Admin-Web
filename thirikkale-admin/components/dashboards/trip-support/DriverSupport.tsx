import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function DriverSupport() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Driver Support",
            subtitle: "Provide assistance to drivers and resolve driver-related issues"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Driver Support</h2>
                <p className="text-gray-500">Driver support content will be implemented here.</p>
            </div>
        </div>
    )
}
