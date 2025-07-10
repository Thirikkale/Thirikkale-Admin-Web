import React, { useEffect } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

export default function VehicleManagement() {
  const { setPageHeader } = usePageHeader();
  useEffect(() => {
    setPageHeader({
      title: 'Vehicle Management',
      subtitle: 'Manage vehicles, registration, and compliance.'
    });
  }, [setPageHeader]);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Vehicle Management</h2>
        <p className="text-gray-500">Vehicle management content will be implemented here.</p>
      </div>
    </div>
  );
}
