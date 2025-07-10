import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function ReportGeneration() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Report Generation",
            subtitle: "Generate comprehensive reports and business analytics"
        })
    }, [setPageHeader])

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Report Generation</h2>
                <p className="text-gray-500">Report generation content will be implemented here.</p>
            </div>
        </div>
    )
}
