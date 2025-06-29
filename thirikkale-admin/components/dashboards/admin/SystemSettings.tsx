import React from 'react'

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure system preferences and global settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <p className="text-gray-500">System Settings content will be implemented here.</p>
      </div>
    </div>
  )
}
