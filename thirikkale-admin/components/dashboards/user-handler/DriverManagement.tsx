import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

const sampleDrivers = [
  {
    id: 'D100',
    name: 'Kasun Rajapaksa',
    city: 'Colombo',
    email: 'kasun@email.com',
    gender: 'Male',
    status: 'Active',
    createdTime: '2025-04-26 10:01:41',
    avatar: '🧑',
  },
  {
    id: 'D101',
    name: 'Sanduni Wickramasinghe',
    city: 'Negombo',
    email: 'sanduni@email.com',
    gender: 'Female',
    status: 'Suspended',
    createdTime: '2025-04-25 09:15:30',
    avatar: '👩',
  },
  {
    id: 'D102',
    name: 'Roshan Jayawardena',
    city: 'Jaffna',
    email: 'roshan@email.com',
    gender: 'Male',
    status: 'Pending',
    createdTime: '2025-04-24 14:30:15',
    avatar: '👨',
  },
];

const tabs = [
  { name: 'All', count: sampleDrivers.length },
  { name: 'Active', count: sampleDrivers.filter((u) => u.status === 'Active').length },
  { name: 'Suspended', count: sampleDrivers.filter((u) => u.status === 'Suspended').length },
  { name: 'Pending', count: sampleDrivers.filter((u) => u.status === 'Pending').length },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'Suspended':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

export default function DriverManagement() {
  const { setPageHeader } = usePageHeader();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPageHeader({
      title: 'Driver Management',
      subtitle: 'Manage driver accounts, profiles, and activity.',
    });
  }, [setPageHeader]);

  const filteredDrivers = sampleDrivers.filter(
    (driver) =>
      (activeTab === 'All' || driver.status === activeTab) &&
      (driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.email.toLowerCase().includes(search.toLowerCase()) ||
        driver.city.toLowerCase().includes(search.toLowerCase()) ||
        driver.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        {/* Status Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-hidden flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.name
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.name}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeTab === tab.name ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Filter */}
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search by name, email, city, or ID"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="bg-gray-100 border-b-2 border-gray-300">
            <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1.2fr 1.5fr' }}>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Driver Info</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
            </div>
          </div>
          {filteredDrivers.map((driver) => (
            <div key={driver.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1.2fr 1.5fr' }}>
                {/* Driver Info Column */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm border border-gray-300">
                      {driver.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{driver.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{driver.city}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">ID:</span>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {driver.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{driver.createdTime}</p>
                  </div>
                </div>
                {/* Email Column */}
                <div className="text-sm text-gray-700 truncate text-center" title={driver.email}>
                  {driver.email}
                </div>
                {/* Gender Column */}
                <div className="text-sm text-gray-700 text-center">
                  {driver.gender}
                </div>
                {/* Status Column */}
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(driver.status)}`}>
                    {driver.status}
                  </span>
                </div>
                {/* Actions Column */}
                <div className="flex flex-col space-y-1 items-center">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded-md border border-red-300 hover:bg-red-50 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
