import React, { useEffect } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

export default function UserStatistics() {
  const { setPageHeader } = usePageHeader();
  useEffect(() => {
    setPageHeader({
      title: 'User Statistics',
      subtitle: 'Analyze user activity, growth, and engagement.'
    });
  }, [setPageHeader]);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">User Statistics</h2>
        <p className="text-gray-500">User statistics content will be implemented here.</p>
      </div>
    </div>
  );
}
