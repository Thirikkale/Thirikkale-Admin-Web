import React, { useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function Pricing() {
  const { setPageHeader } = usePageHeader()

  useEffect(() => {
    setPageHeader({
      title: "Pricing & Policy Management",
      subtitle: "Configure pricing models, commission rates, and platform policies"
    })
  }, [setPageHeader])

  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <p className="text-gray-500">Pricing & Policy Management content will be implemented here.</p>
      </div>
    </div>
  )
}
