import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function Analytics() {
  const { setPageHeader } = usePageHeader()

  useEffect(() => {
    setPageHeader({
      title: "Reports & Analytics",
      subtitle: "Analyze performance metrics and generate comprehensive reports"
    })
  }, [setPageHeader])

  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <p className="text-gray-500">Reports & Analytics content will be implemented here.</p>
      </div>
    </div>
  )
}
