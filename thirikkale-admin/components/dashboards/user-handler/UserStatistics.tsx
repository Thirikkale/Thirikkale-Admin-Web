import React, { useEffect } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

const stats = [
  { label: 'Total Users', value: 1240, icon: '👥', color: 'bg-blue-100 text-blue-800' },
  { label: 'Active Riders', value: 860, icon: '🧑‍🦰', color: 'bg-green-100 text-green-800' },
  { label: 'Active Drivers', value: 320, icon: '🚗', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'New Signups (30d)', value: 110, icon: '✨', color: 'bg-purple-100 text-purple-800' },
  { label: 'Suspended Accounts', value: 12, icon: '⛔', color: 'bg-red-100 text-red-800' },
];

const growthData = [
  { month: 'Jan', users: 900 },
  { month: 'Feb', users: 950 },
  { month: 'Mar', users: 1050 },
  { month: 'Apr', users: 1150 },
  { month: 'May', users: 1240 },
];

export default function UserStatistics() {
  const { setPageHeader } = usePageHeader();
  useEffect(() => {
    setPageHeader({
      title: 'User Statistics',
      subtitle: 'Analyze user activity, growth, and engagement.',
    });
  }, [setPageHeader]);

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">User Statistics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`flex items-center space-x-4 p-4 rounded-lg shadow-sm border ${stat.color}`}>
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-md font-semibold mb-2">User Growth (Last 5 Months)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Month</th>
                  <th className="px-4 py-2 text-left">Users</th>
                </tr>
              </thead>
              <tbody>
                {growthData.map((row) => (
                  <tr key={row.month}>
                    <td className="px-4 py-2">{row.month}</td>
                    <td className="px-4 py-2">{row.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
