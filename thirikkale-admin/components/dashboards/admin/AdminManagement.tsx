import React, { useState, useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'
import { registerAdmin, AdminRegistrationRequest, getAllAdmins, mapAdminToFrontend, type AdminListItem } from '@/lib/api/adminService'

// Using the same type from adminService for consistency
type Admin = AdminListItem

export default function AdminManagement() {
  const { setPageHeader } = usePageHeader()

  useEffect(() => {
    setPageHeader({
      title: "Admin Management",
      subtitle: "Manage administrator accounts and permissions"
    })
  }, [setPageHeader])

  const [activeTab, setActiveTab] = useState('All')
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    id: '',
    name: '',
    dateFrom: '',
    dateTo: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    adminRole: ''
  })

  // State for fetched admins
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Fetch admins from database
  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    setIsLoading(true)
    setFetchError(null)

    try {
      const response = await getAllAdmins()

      if (response.error) {
        setFetchError(response.error)
        console.error('Error fetching admins:', response.error)
      } else if (response.data) {
        const mappedAdmins = response.data.map(mapAdminToFrontend)
        setAdmins(mappedAdmins)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch admins'
      setFetchError(errorMessage)
      console.error('Error fetching admins:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate tab counts based on fetched data
  const getTabCounts = () => {
    const allCount = admins.length
    const pendingCount = admins.filter(a => a.status === 'Pending Approval').length
    const activeCount = admins.filter(a => a.status === 'Active').length
    const inactiveCount = admins.filter(a => a.status === 'Inactive').length
    const suspendedCount = admins.filter(a => a.status === 'Suspended').length

    return {
      all: allCount,
      pending: pendingCount,
      activated: activeCount,
      deactivated: inactiveCount + suspendedCount,
      online: 0, // Would need real-time status from backend
      offline: activeCount // Simplified for now
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

  // Filter admins based on active tab
  const getFilteredAdmins = () => {
    let filtered = admins

    switch (activeTab) {
      case 'Pending Requests':
        filtered = admins.filter(a => a.status === 'Pending Approval')
        break
      case 'Activated Accounts':
        filtered = admins.filter(a => a.status === 'Active')
        break
      case 'Deactivated Accounts':
        filtered = admins.filter(a => a.status === 'Inactive' || a.status === 'Suspended')
        break
      case 'Online Accounts':
        // Would need real-time status from backend
        filtered = []
        break
      case 'Offline Accounts':
        filtered = admins.filter(a => a.status === 'Active')
        break
    }

    // Apply search filters
    if (searchFilters.city) {
      filtered = filtered.filter(a => a.adminRole.toLowerCase().includes(searchFilters.city.toLowerCase()))
    }
    if (searchFilters.id) {
      filtered = filtered.filter(a => a.id.toLowerCase().includes(searchFilters.id.toLowerCase()))
    }
    if (searchFilters.name) {
      filtered = filtered.filter(a => a.name.toLowerCase().includes(searchFilters.name.toLowerCase()))
    }
    if (searchFilters.dateFrom) {
      filtered = filtered.filter(a => a.joinedDate >= searchFilters.dateFrom)
    }
    if (searchFilters.dateTo) {
      filtered = filtered.filter(a => a.joinedDate <= searchFilters.dateTo)
    }

    return filtered
  }

  const filteredAdmins = getFilteredAdmins()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200'
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border border-gray-200'
      case 'Suspended':
        return 'bg-red-100 text-red-800 border border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    setSubmitError(null)
    setSubmitSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setSubmitError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setSubmitError('Password must be at least 8 characters')
      return
    }

    // Map admin role from display name to enum value
    const roleMapping: Record<string, AdminRegistrationRequest['adminRole']> = {
      'Admin': 'ADMIN',
      'User Handler': 'USER_HANDLER',
      'Finance Handler': 'FINANCE_HANDLER',
      'Marketing Handler': 'MARKETING_HANDLER',
      'Trip Support': 'TRIP_SUPPORT'
    }

    setIsSubmitting(true)

    try {
      const requestData: AdminRegistrationRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        adminRole: roleMapping[formData.adminRole]
      }

      const response = await registerAdmin(requestData)

      setSubmitSuccess(`Admin account created successfully! A verification email has been sent to ${formData.email}. Please check the email to activate the account.`)

      // Refresh the admin list
      await fetchAdmins()

      // Reset form after 4 seconds (longer to let user read the message)
      setTimeout(() => {
        setIsModalOpen(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          adminRole: ''
        })
        setSubmitSuccess(null)
      }, 4000)

    } catch (error: any) {
      setSubmitError(error.message || 'Failed to create admin account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Add New Admin Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Admin</span>
        </button>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <div>
                <h2 className="text-2xl font-bold">Add New Administrator</h2>
                <p className="text-blue-100 text-sm mt-1">Create a new admin account with specific roles and permissions</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-blue-800 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              )}

              {/* Success Message */}
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{submitSuccess}</span>
                </div>
              )}

              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleFormChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleFormChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Admin Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.adminRole}
                      onChange={(e) => handleFormChange('adminRole', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a role</option>
                      <option value="Admin">Admin (Manager)</option>
                      <option value="User Handler">User Handler</option>
                      <option value="Finance Handler">Finance Handler</option>
                      <option value="Marketing Handler">Marketing Handler</option>
                      <option value="Trip Support">Trip Support</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="admin@thirikkale.lk"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => handleFormChange('password', e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with uppercase, lowercase, and number</p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleFormChange('confirmPassword', e.target.value)}
                      placeholder="Confirm password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Role Description */}
              {formData.adminRole && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Role Description:</h4>
                  <p className="text-sm text-blue-800">
                    {formData.adminRole === 'Admin' && 'Full system access with ability to manage all users, financial operations, and system settings.'}
                    {formData.adminRole === 'User Handler' && 'Manages rider and driver accounts, verifications, and user activity monitoring.'}
                    {formData.adminRole === 'Finance Handler' && 'Handles payment processing, transactions, revenue analytics, and financial reports.'}
                    {formData.adminRole === 'Marketing Handler' && 'Manages marketing campaigns, promo codes, referral programs, and notifications.'}
                    {formData.adminRole === 'Trip Support' && 'Monitors live trips, handles disputes, emergency response, and customer support.'}
                  </p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setSubmitError(null)
                    setSubmitSuccess(null)
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <p className="text-gray-600">Loading admins...</p>
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
                onClick={fetchAdmins}
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
                {/* Admin Role Filter */}
                <div className="relative">
                  <select
                    value={searchFilters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User Handler">User Handler</option>
                    <option value="Finance Handler">Finance Handler</option>
                    <option value="Marketing Handler">Marketing Handler</option>
                    <option value="Trip Support">Trip Support</option>
                  </select>
                </div>

                {/* Admin ID Filter */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Admin ID"
                    value={searchFilters.id}
                    onChange={(e) => handleFilterChange('id', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Admin Name Filter */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Admin Name"
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
                <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr' }}>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Admin Info</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Info</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Admin Role</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Last Login</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                  <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                </div>
              </div>

              {/* Admin Rows */}
              {filteredAdmins.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-4 text-gray-600">No admins found matching your filters</p>
                </div>
              ) : (
                filteredAdmins.map((admin) => (
                  <div key={admin.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                    <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr' }}>
                      {/* Admin Info Column */}
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-lg border border-blue-300">
                            {admin.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">{admin.name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">ID:</span>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {admin.id}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Joined: {admin.joinedDate}</p>
                        </div>
                      </div>

                      {/* Contact Info Column (Email + Phone) */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-700 truncate" title={admin.email}>
                            {admin.email}
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-sm text-gray-700">
                            {admin.phone}
                          </span>
                        </div>
                      </div>

                      {/* Admin Role Column */}
                      <div className="text-center">
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {admin.adminRole}
                        </span>
                      </div>

                      {/* Last Login Column */}
                      <div className="text-sm text-gray-700 text-center">
                        {admin.lastLogin === 'Never' ? (
                          <span className="text-gray-400 italic">Never</span>
                        ) : (
                          <span className="text-xs">{admin.lastLogin}</span>
                        )}
                      </div>

                      {/* Status Column */}
                      <div className="text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(admin.status)}`}>
                          {admin.status}
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
