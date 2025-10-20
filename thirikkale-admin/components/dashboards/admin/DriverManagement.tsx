import React, { useState, useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'
import { getAllDrivers, getPendingVerificationDrivers, getAvailableDrivers, mapDriverToFrontend, type Driver as BackendDriver } from '@/lib/api/adminService'
import { Loader } from '@/components/ui/loader'
import { AlertCircle } from 'lucide-react'

interface Driver {
  id: string
  readableId?: string // D00001, D00002 - for display
  name: string
  city: string
  email: string
  gender: string
  vehicleType: string
  workExperience: string
  status: string
  createdTime: string
  avatar: string
  rating: number
  totalRides: number
  isVerified: boolean
  isAvailable: boolean
}

export default function DriverManagement() {
  const { setPageHeader } = usePageHeader()
  const [activeTab, setActiveTab] = useState('All')
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    id: '',
    name: '',
    dateFrom: '',
    dateTo: ''
  })

  useEffect(() => {
    setPageHeader({
      title: "Driver Management",
      subtitle: "Manage driver accounts, vehicle verification, and performance monitoring"
    })
  }, [setPageHeader])

  // Fetch drivers based on active tab
  useEffect(() => {
    fetchDrivers()
  }, [activeTab])

  const fetchDrivers = async () => {
    setLoading(true)
    setError(null)

    try {
      let response;

      switch (activeTab) {
        case 'Pending Requests':
          response = await getPendingVerificationDrivers()
          break
        case 'Online Accounts':
          response = await getAvailableDrivers()
          break
        default:
          response = await getAllDrivers()
      }

      if (response.error) {
        setError(response.error)
        setDrivers([])
      } else if (response.data) {
        // Map backend data to frontend format
        const mappedDrivers = response.data.map(mapDriverToFrontend)
        console.log('Mapped drivers:', mappedDrivers.slice(0, 2)) // Log first 2 drivers for debugging
        console.log('Sample driver totalRides:', mappedDrivers[0]?.totalRides)
        setDrivers(mappedDrivers)
      }
    } catch (err) {
      setError('Failed to fetch drivers')
      console.error('Error fetching drivers:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter drivers based on active tab
  const getFilteredDrivers = () => {
    let filtered = drivers

    // Apply tab filters
    switch (activeTab) {
      case 'Pending Requests':
        filtered = drivers.filter(d => d.status === 'Pending' || d.status === 'Pending Documents')
        break
      case 'Activated Accounts':
        filtered = drivers.filter(d => d.isVerified && d.status !== 'Deactivated')
        break
      case 'Deactivated Accounts':
        filtered = drivers.filter(d => d.status === 'Deactivated')
        break
      case 'Online Accounts':
        filtered = drivers.filter(d => d.status === 'Online')
        break
      case 'Offline Accounts':
        filtered = drivers.filter(d => d.status === 'Offline')
        break
    }

    // Apply search filters
    if (searchFilters.city) {
      filtered = filtered.filter(d =>
        d.city.toLowerCase().includes(searchFilters.city.toLowerCase())
      )
    }
    if (searchFilters.id) {
      filtered = filtered.filter(d =>
        d.id.toLowerCase().includes(searchFilters.id.toLowerCase())
      )
    }
    if (searchFilters.name) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchFilters.name.toLowerCase())
      )
    }

    return filtered
  }

  const filteredDrivers = getFilteredDrivers()

  // Calculate tab counts
  const tabCounts = {
    all: drivers.length,
    pending: drivers.filter(d => d.status === 'Pending' || d.status === 'Pending Documents').length,
    activated: drivers.filter(d => d.isVerified && d.status !== 'Deactivated').length,
    deactivated: drivers.filter(d => d.status === 'Deactivated').length,
    online: drivers.filter(d => d.status === 'Online').length,
    offline: drivers.filter(d => d.status === 'Offline').length,
  }

  const tabs = [
    { name: 'All', count: tabCounts.all },
    { name: 'Pending Requests', count: tabCounts.pending },
    { name: 'Activated Accounts', count: tabCounts.activated },
    { name: 'Deactivated Accounts', count: tabCounts.deactivated },
    { name: 'Online Accounts', count: tabCounts.online },
    { name: 'Offline Accounts', count: tabCounts.offline },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hire Overdue':
        return 'bg-red-100 text-red-800 border border-red-200'
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200'
      case 'Pending':
      case 'Pending Documents':
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
            {/* Driver City Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Driver City"
                value={searchFilters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Driver ID Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Driver ID"
                value={searchFilters.id}
                onChange={(e) => handleFilterChange('id', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Driver Name Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Driver Name"
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

        {/* Loading State */}
        {loading && (
          <div className="p-12 flex justify-center items-center">
            <Loader size="lg" text="Loading drivers..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-50 border-l-4 border-red-500">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={fetchDrivers}
              className="mt-2 text-sm text-red-600 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredDrivers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No drivers found</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filteredDrivers.length > 0 && (
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-100 border-b-2 border-gray-300">
              <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1fr 1.2fr 1.5fr' }}>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Driver Info</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rating</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Total Rides</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
              </div>
            </div>

            {/* Driver Rows */}
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1fr 1.2fr 1.5fr' }}>
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
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-400">ID:</span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {driver.id || 'N/A'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{driver.createdTime}</p>
                    </div>
                  </div>

                  {/* Email Column */}
                  <div className="text-sm text-gray-700 truncate text-center" title={driver.email}>
                    {driver.email}
                  </div>

                  {/* Rating Column */}
                  <div className="text-sm text-gray-700 text-center">
                    ⭐ {driver.rating.toFixed(1)}
                  </div>

                  {/* Total Rides Column */}
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200">
                      {driver.totalRides ?? 0} rides
                    </span>
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
                    <button className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors">
                      {driver.isVerified ? 'Verified ✓' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
