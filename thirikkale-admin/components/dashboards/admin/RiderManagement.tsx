import React, { useState, useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'
import { getAllRiders, mapRiderToFrontend } from '@/lib/api/adminService'

interface Rider {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  gender: string
  rating: number
  totalRides: number
  womenOnlyAccess: boolean
  genderVerified: boolean
  preferredPaymentMethod: string
  isActive: boolean
  createdTime: string
  avatar: string
}

export default function RiderManagement() {
  const { setPageHeader } = usePageHeader()
  const [activeTab, setActiveTab] = useState('All')
  const [searchFilters, setSearchFilters] = useState({
    gender: '',
    id: '',
    name: '',
    dateFrom: '',
    dateTo: ''
  })

  // State for fetched riders
  const [riders, setRiders] = useState<Rider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    setPageHeader({
      title: "Rider Management",
      subtitle: "Manage rider accounts, subscription tiers, and customer support"
    })
  }, [setPageHeader])

  // Fetch riders from database
  useEffect(() => {
    fetchRiders()
  }, [])

  const fetchRiders = async () => {
    setIsLoading(true)
    setFetchError(null)

    try {
      const response = await getAllRiders()

      if (response.error) {
        setFetchError(response.error)
        console.error('Error fetching riders:', response.error)
      } else if (response.data) {
        const mappedRiders = response.data.map(mapRiderToFrontend)
        setRiders(mappedRiders)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch riders'
      setFetchError(errorMessage)
      console.error('Error fetching riders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate tab counts based on fetched data
  const getTabCounts = () => {
    const allCount = riders.length
    const activeCount = riders.filter(r => r.isActive).length
    const inactiveCount = riders.filter(r => !r.isActive).length

    return {
      all: allCount,
      pending: 0, // Backend doesn't have pending status
      activated: activeCount,
      deactivated: inactiveCount,
      online: 0, // Would need real-time status
      offline: activeCount
    }
  }

  const tabCounts = getTabCounts()

  const tabs = [
    { name: 'All', count: tabCounts.all },
    { name: 'Pending Requests', count: tabCounts.pending },
    { name: 'Activated Accounts', count: tabCounts.activated },
    { name: 'Deactivated Accounts', count: tabCounts.deactivated },
    { name: 'Online Accounts', count: tabCounts.online },
    { name: 'Offline Accounts', count: tabCounts.offline },
  ]

  // Filter riders based on active tab
  const getFilteredRiders = () => {
    let filtered = riders

    switch (activeTab) {
      case 'Pending Requests':
        filtered = [] // No pending status in backend
        break
      case 'Activated Accounts':
        filtered = riders.filter(r => r.isActive)
        break
      case 'Deactivated Accounts':
        filtered = riders.filter(r => !r.isActive)
        break
      case 'Online Accounts':
        filtered = [] // Would need real-time status
        break
      case 'Offline Accounts':
        filtered = riders.filter(r => r.isActive)
        break
    }

    // Apply search filters
    if (searchFilters.gender) {
      filtered = filtered.filter(r => r.gender.toLowerCase().includes(searchFilters.gender.toLowerCase()))
    }
    if (searchFilters.id) {
      filtered = filtered.filter(r => r.id.toLowerCase().includes(searchFilters.id.toLowerCase()))
    }
    if (searchFilters.name) {
      filtered = filtered.filter(r => r.name.toLowerCase().includes(searchFilters.name.toLowerCase()))
    }
    if (searchFilters.dateFrom) {
      filtered = filtered.filter(r => new Date(r.createdTime) >= new Date(searchFilters.dateFrom))
    }
    if (searchFilters.dateTo) {
      filtered = filtered.filter(r => new Date(r.createdTime) <= new Date(searchFilters.dateTo))
    }

    return filtered
  }

  const filteredRiders = getFilteredRiders()

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800 border border-green-200'
      : 'bg-gray-100 text-gray-800 border border-gray-200'
  }

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Content */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading riders...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && fetchError && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{fetchError}</span>
              </div>
              <button
                onClick={fetchRiders}
                className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Data Loaded */}
        {!isLoading && !fetchError && (
          <>
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
                {/* Gender Filter */}
                <div className="relative">
                  <select
                    value={searchFilters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Genders</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
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
                <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2.5fr 2.5fr 1fr 1fr 1.5fr 1fr 1.5fr' }}>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rider Info</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Info</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rating</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Total Rides</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                </div>
              </div>

              {/* Rider Rows */}
              {filteredRiders.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-4 text-gray-600">No riders found matching your filters</p>
                </div>
              ) : (
                filteredRiders.map((rider) => (
                  <div key={rider.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                    <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2.5fr 2.5fr 1fr 1fr 1.5fr 1fr 1.5fr' }}>
                      {/* Rider Info Column */}
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-lg border border-blue-300">
                            {rider.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">{rider.name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">ID:</span>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {rider.id}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Joined: {new Date(rider.createdTime).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Contact Info Column (Email + Phone) */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-700 truncate" title={rider.email}>
                            {rider.email}
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-sm text-gray-700">
                            {rider.phoneNumber}
                          </span>
                        </div>
                      </div>

                      {/* Gender Column */}
                      <div className="text-center">
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                          {rider.gender}
                        </span>
                      </div>

                      {/* Rating Column */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-semibold text-gray-700">{rider.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Total Rides Column */}
                      <div className="text-center">
                        <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200">
                          {rider.totalRides} rides
                        </span>
                      </div>

                      {/* Status Column */}
                      <div className="text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(rider.isActive)}`}>
                          {rider.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      {/* Actions Column */}
                      <div className="flex flex-col space-y-1 items-center">
                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-16">
                          View
                        </button>
                        <button className="text-orange-600 hover:text-orange-800 text-xs font-medium px-3 py-1 rounded-md border border-orange-300 hover:bg-orange-50 transition-colors w-16">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
