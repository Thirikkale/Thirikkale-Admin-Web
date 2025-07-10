import React, { useEffect } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

export default function RiderManagement() {
  const { setPageHeader } = usePageHeader();
  useEffect(() => {
    setPageHeader({
      title: 'Rider Management',
      subtitle: 'Manage rider accounts, profiles, and activity.'
    });
  }, [setPageHeader]);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Rider Management</h2>
        <p className="text-gray-500">Rider management content will be implemented here.</p>
      </div>
    </div>
  );
}
