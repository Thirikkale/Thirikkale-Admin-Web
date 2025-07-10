import React, { useEffect } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

export default function VerificationQueue() {
  const { setPageHeader } = usePageHeader();
  useEffect(() => {
    setPageHeader({
      title: 'Verification Queue',
      subtitle: 'Review and verify pending user and vehicle documents.'
    });
  }, [setPageHeader]);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Verification Queue</h2>
        <p className="text-gray-500">Verification queue content will be implemented here.</p>
      </div>
    </div>
  );
}
