import React, { useEffect } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

export default function ReportedUsers() {
  const { setPageHeader } = usePageHeader();
  useEffect(() => {
    setPageHeader({
      title: 'Reported Users',
      subtitle: 'View and manage users reported for violations.'
    });
  }, [setPageHeader]);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Reported Users</h2>
        <p className="text-gray-500">Reported users content will be implemented here.</p>
      </div>
    </div>
  );
}
