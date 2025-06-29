import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function SystemSettings() {
  const { setPageHeader } = usePageHeader()

  useEffect(() => {
    setPageHeader({
      title: "System Settings",
      subtitle: "Configure system preferences, security settings, and global configurations"
    })
  }, [setPageHeader])

  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <p className="text-gray-500">System Settings content will be implemented here.</p>
      </div>
    </div>
  )
}
