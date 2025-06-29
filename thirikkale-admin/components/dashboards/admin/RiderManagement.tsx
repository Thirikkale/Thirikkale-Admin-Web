import React, { useState } from 'react'

interface Rider {
  id: string
  name: string
  city: string
  email: string
  gender: string
  riderType: string
  workExperience: string
  status: 'Hire Overdue' | 'Active' | 'Pending' | 'Deactivated' | 'Online' | 'Offline'
  createdTime: string
  avatar: string
}

const sampleRiders: Rider[] = [
  {
    id: 'R50',
    name: 'Saman Perera',
    city: 'Colombo',
    email: 'saman@gmail.com',
    gender: 'Male',
    riderType: 'Regular Rider',
    workExperience: '2 Years',
    status: 'Active',
    createdTime: '2025-04-26 10:01:41',
    avatar: '🚗'
  },
  {
    id: 'R51',
    name: 'Nimal Silva',
    city: 'Kandy',
    email: 'nimal@gmail.com',
    gender: 'Male',
    riderType: 'Premium Rider',
    workExperience: '3 Years',
    status: 'Online',
    createdTime: '2025-04-26 10:01:41',
    avatar: '🚕'
  },
  {
    id: 'R52',
    name: 'Kamala Fernando',
    city: 'Galle',
    email: 'kamala@gmail.com',
    gender: 'Female',
    riderType: 'Business Rider',
    workExperience: '1 Year',
    status: 'Active',
    createdTime: '2025-04-25 14:30:15',
    avatar: '🚙'
  },
  {
    id: 'R53',
    name: 'Ruwan Jayasinghe',
    city: 'Matara',
    email: 'ruwan@gmail.com',
    gender: 'Male',
    riderType: 'Regular Rider',
    workExperience: '4 Years',
    status: 'Pending',
    createdTime: '2025-04-24 09:15:30',
    avatar: '🚗'
  },
  {
    id: 'R54',
    name: 'Sunitha Rathnayake',
    city: 'Negombo',
    email: 'sunitha@gmail.com',
    gender: 'Female',
    riderType: 'Premium Rider',
    workExperience: '5 Years',
    status: 'Offline',
    createdTime: '2025-04-23 16:45:20',
    avatar: '🚕'
  },
  {
    id: 'R55',
    name: 'Anil Wickramasinghe',
    city: 'Jaffna',
    email: 'anil@gmail.com',
    gender: 'Male',
    riderType: 'Business Rider',
    workExperience: '6 Years',
    status: 'Active',
    createdTime: '2025-04-22 11:20:10',
    avatar: '🚙'
  },
  {
    id: 'R56',
    name: 'Malika Perera',
    city: 'Kurunegala',
    email: 'malika@gmail.com',
    gender: 'Female',
    riderType: 'Regular Rider',
    workExperience: '2 Years',
    status: 'Deactivated',
    createdTime: '2025-04-21 08:30:25',
    avatar: '🚗'
  }
]

export default function RiderManagement() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    id: '',
    name: '',
    dateFrom: '',
    dateTo: ''
  })

  const tabs = [
    { name: 'All', count: 156 },
    { name: 'Pending Requests', count: 12 },
    { name: 'Activated Accounts', count: 98 },
    { name: 'Deactivated Accounts', count: 8 },
    { name: 'Online Accounts', count: 45 },
    { name: 'Offline Accounts', count: 53 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hire Overdue':
        return 'bg-red-100 text-red-800 border border-red-200'
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      case 'Deactivated':
        return 'bg-gray-100 text-gray-800 border border-gray-200'
      case 'Online':
        return 'bg-blue-100 text-blue-800 border border-blue-200'
      case 'Offline':
        return 'bg-gray-100 text-gray-800 border border-gray-200'
      case 'Suspended':
        return 'bg-purple-100 text-purple-800 border border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rider Management</h1>
          <p className="text-gray-600 mt-1">Manage rider accounts, verification, and support</p>
        </div>
      </div>

      {/* Content */}
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

        {/* Search Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Rider City Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rider City"
                value={searchFilters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Rider ID Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rider ID"
                value={searchFilters.id}
                onChange={(e) => handleFilterChange('id', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Rider Name Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rider Name"
                value={searchFilters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Date From Filter */}
            <div className="relative">
              <input
                type="date"
                value={searchFilters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Date To Filter */}
            <div className="relative">
              <input
                type="date"
                value={searchFilters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 border-b-2 border-gray-300">
            <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1.5fr 1fr 1.2fr 1.5fr' }}>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rider Info</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rider Type</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Experience</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
            </div>
          </div>

          {/* Rider Rows */}
          {sampleRiders.map((rider, index) => (
            <div key={rider.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1.5fr 1fr 1.2fr 1.5fr' }}>
                {/* Rider Info Column */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm border border-gray-300">
                      {rider.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{rider.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{rider.city}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">ID:</span>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {rider.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{rider.createdTime}</p>
                  </div>
                </div>

                {/* Email Column */}
                <div className="text-sm text-gray-700 truncate text-center" title={rider.email}>
                  {rider.email}
                </div>

                {/* Gender Column */}
                <div className="text-sm text-gray-700 text-center">
                  {rider.gender}
                </div>

                {/* Rider Type Column */}
                <div className="text-sm text-gray-700 truncate text-center" title={rider.riderType}>
                  {rider.riderType}
                </div>

                {/* Experience Column */}
                <div className="text-sm text-gray-700 text-center">
                  {rider.workExperience}
                </div>

                {/* Status Column */}
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(rider.status)}`}>
                    {rider.status}
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
  )
}
