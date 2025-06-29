import React, { useState, useEffect } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

interface Transaction {
  id: string
  type: 'Payment' | 'Refund' | 'Commission' | 'Withdrawal' | 'Bonus'
  amount: number
  currency: string
  userId: string
  userName: string
  userType: 'Driver' | 'Rider' | 'Admin'
  status: 'Completed' | 'Pending' | 'Failed' | 'Processing'
  description: string
  createdTime: string
  paymentMethod: string
}

const sampleTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'Payment',
    amount: 2500.00,
    currency: 'LKR',
    userId: 'R50',
    userName: 'Saman Perera',
    userType: 'Rider',
    status: 'Completed',
    description: 'Ride payment - Colombo to Airport',
    createdTime: '2025-04-26 10:30:15',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'TXN002',
    type: 'Commission',
    amount: 375.00,
    currency: 'LKR',
    userId: 'D50',
    userName: 'Kasun Rajapaksa',
    userType: 'Driver',
    status: 'Completed',
    description: 'Platform commission (15%)',
    createdTime: '2025-04-26 10:30:20',
    paymentMethod: 'Platform Credit'
  },
  {
    id: 'TXN003',
    type: 'Withdrawal',
    amount: 15000.00,
    currency: 'LKR',
    userId: 'D51',
    userName: 'Thilaka Perera',
    userType: 'Driver',
    status: 'Processing',
    description: 'Weekly earnings withdrawal',
    createdTime: '2025-04-26 09:15:30',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'TXN004',
    type: 'Refund',
    amount: 1200.00,
    currency: 'LKR',
    userId: 'R52',
    userName: 'Kamala Fernando',
    userType: 'Rider',
    status: 'Completed',
    description: 'Cancelled ride refund',
    createdTime: '2025-04-25 16:45:10',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'TXN005',
    type: 'Bonus',
    amount: 500.00,
    currency: 'LKR',
    userId: 'D52',
    userName: 'Mahinda Silva',
    userType: 'Driver',
    status: 'Completed',
    description: 'Performance bonus - 50 rides milestone',
    createdTime: '2025-04-25 14:20:25',
    paymentMethod: 'Platform Credit'
  },
  {
    id: 'TXN006',
    type: 'Payment',
    amount: 3200.00,
    currency: 'LKR',
    userId: 'R54',
    userName: 'Sunitha Rathnayake',
    userType: 'Rider',
    status: 'Failed',
    description: 'Ride payment - Negombo to Colombo',
    createdTime: '2025-04-25 11:10:05',
    paymentMethod: 'Digital Wallet'
  }
]

export default function FinanceManagement() {
  const { setPageHeader } = usePageHeader()
  const [activeTab, setActiveTab] = useState('All')
  const [searchFilters, setSearchFilters] = useState({
    transactionId: '',
    userId: '',
    userName: '',
    dateFrom: '',
    dateTo: ''
  })

  useEffect(() => {
    setPageHeader({
      title: "Finance Management",
      subtitle: "Monitor transactions, payments, withdrawals, and financial analytics"
    })
  }, [setPageHeader])

  const tabs = [
    { name: 'All', count: 1247 },
    { name: 'Payments', count: 890 },
    { name: 'Withdrawals', count: 156 },
    { name: 'Refunds', count: 89 },
    { name: 'Commissions', count: 67 },
    { name: 'Bonuses', count: 45 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border border-green-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border border-blue-200'
      case 'Failed':
        return 'bg-red-100 text-red-800 border border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Payment':
        return 'bg-green-100 text-green-800'
      case 'Refund':
        return 'bg-red-100 text-red-800'
      case 'Commission':
        return 'bg-blue-100 text-blue-800'
      case 'Withdrawal':
        return 'bg-orange-100 text-orange-800'
      case 'Bonus':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">LKR 2,847,450</p>
              <p className="text-sm text-green-600">+12.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Platform Commission</p>
              <p className="text-2xl font-bold text-gray-900">LKR 427,118</p>
              <p className="text-sm text-blue-600">15% of total revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-sm">🏦</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Withdrawals</p>
              <p className="text-2xl font-bold text-gray-900">LKR 156,230</p>
              <p className="text-sm text-orange-600">23 pending requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm">🔄</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Refunds Processed</p>
              <p className="text-2xl font-bold text-gray-900">LKR 45,670</p>
              <p className="text-sm text-red-600">89 refunds this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Management */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        {/* Transaction Tabs */}
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
            {/* Transaction ID Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Transaction ID"
                value={searchFilters.transactionId}
                onChange={(e) => handleFilterChange('transactionId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* User ID Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="User ID"
                value={searchFilters.userId}
                onChange={(e) => handleFilterChange('userId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* User Name Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="User Name"
                value={searchFilters.userName}
                onChange={(e) => handleFilterChange('userName', e.target.value)}
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

        {/* Transaction Table */}
        <div className="overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 border-b-2 border-gray-300">
            <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '1.5fr 1fr 1.2fr 2fr 1.5fr 1fr 1fr 1.5fr' }}>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction ID</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Type</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">User Info</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Description</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Method</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
            </div>
          </div>

          {/* Transaction Rows */}
          {sampleTransactions.map((transaction, index) => (
            <div key={transaction.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '1.5fr 1fr 1.2fr 2fr 1.5fr 1fr 1fr 1.5fr' }}>
                {/* Transaction ID Column */}
                <div className="text-center">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {transaction.id}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{transaction.createdTime}</p>
                </div>

                {/* Type Column */}
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                </div>

                {/* Amount Column */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                </div>

                {/* User Info Column */}
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{transaction.userName}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-400">ID:</span>
                    <span className="text-xs font-medium text-gray-600">{transaction.userId}</span>
                    <span className={`text-xs px-2 py-1 rounded ${transaction.userType === 'Driver' ? 'bg-green-100 text-green-700' :
                      transaction.userType === 'Rider' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {transaction.userType}
                    </span>
                  </div>
                </div>

                {/* Description Column */}
                <div className="text-center">
                  <p className="text-sm text-gray-700 truncate" title={transaction.description}>
                    {transaction.description}
                  </p>
                </div>

                {/* Payment Method Column */}
                <div className="text-center">
                  <p className="text-sm text-gray-700">{transaction.paymentMethod}</p>
                </div>

                {/* Status Column */}
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>

                {/* Actions Column */}
                <div className="flex flex-col space-y-1 items-center">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors">
                    View
                  </button>
                  {transaction.status === 'Pending' && (
                    <button className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors">
                      Process
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
