import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

const sampleVehicles = [
  {
    id: 'V100',
    plate: 'WP-1234',
    type: 'Car',
    owner: 'Kasun Rajapaksa',
    status: 'Approved',
    registered: '2025-04-26',
    avatar: '🚗',
  },
  {
    id: 'V101',
    plate: 'CP-5678',
    type: 'Van',
    owner: 'Roshan Jayawardena',
    status: 'Pending',
    registered: '2025-04-25',
    avatar: '🚐',
  },
  {
    id: 'V102',
    plate: 'SP-4321',
    type: 'Bike',
    owner: 'Nimal Perera',
    status: 'Rejected',
    registered: '2025-04-24',
    avatar: '🏍️',
  },
];

const tabs = [
  { name: 'All', count: sampleVehicles.length },
  { name: 'Approved', count: sampleVehicles.filter((v) => v.status === 'Approved').length },
  { name: 'Pending', count: sampleVehicles.filter((v) => v.status === 'Pending').length },
  { name: 'Rejected', count: sampleVehicles.filter((v) => v.status === 'Rejected').length },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'Rejected':
      return 'bg-red-100 text-red-800 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

export default function VehicleManagement() {
  const { setPageHeader } = usePageHeader();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPageHeader({
      title: 'Vehicle Management',
      subtitle: 'Manage vehicles, registration, and compliance.',
    });
  }, [setPageHeader]);

  const filteredVehicles = sampleVehicles.filter(
    (vehicle) =>
      (activeTab === 'All' || vehicle.status === activeTab) &&
      (vehicle.plate.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.owner.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.id.toLowerCase().includes(search.toLowerCase()))
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
            placeholder="Search by plate, owner, type, or ID"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="bg-gray-100 border-b-2 border-gray-300">
            <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Vehicle Info</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Type</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Owner</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Registered</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
            </div>
          </div>
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}>
                {/* Vehicle Info Column */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg border border-gray-300">
                      {vehicle.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{vehicle.plate}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">ID:</span>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {vehicle.id}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Type Column */}
                <div className="text-sm text-gray-700 text-center">{vehicle.type}</div>
                {/* Owner Column */}
                <div className="text-sm text-gray-700 text-center">{vehicle.owner}</div>
                {/* Registered Column */}
                <div className="text-sm text-gray-700 text-center">{vehicle.registered}</div>
                {/* Status Column */}
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
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
