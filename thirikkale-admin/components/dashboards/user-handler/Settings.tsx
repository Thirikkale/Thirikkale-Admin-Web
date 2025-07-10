import React, { useEffect } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

export default function Settings() {
  const { setPageHeader } = usePageHeader();
  useEffect(() => {
    setPageHeader({
      title: 'Settings',
      subtitle: 'Configure user handler preferences and system options.'
    });
  }, [setPageHeader]);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <p className="text-gray-500">Settings content will be implemented here.</p>
      </div>
    </div>
  );
}
