import React, { useEffect, useState } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

type CampaignType = 'All' | 'Email' | 'SMS' | 'Push Notification'
type CampaignStatus = 'Active' | 'Scheduled' | 'Expired'

interface Campaign {
    id: string
    name: string
    type: CampaignType
    targetGroup: string
    status: CampaignStatus
    startDate: string
    endDate: string
    avatar: string
}

// Mock data
const mockCampaigns: Campaign[] = [
    {
        id: 'C001',
        name: 'Summer Promotion 2024',
        type: 'Email',
        targetGroup: 'Premium Users',
        status: 'Active',
        startDate: '2024-07-01',
        endDate: '2024-08-31',
        avatar: '📧'
    },
    {
        id: 'C002',
        name: 'New User Welcome',
        type: 'SMS',
        targetGroup: 'New Signups',
        status: 'Active',
        startDate: '2024-06-15',
        endDate: '2024-12-31',
        avatar: '💬'
    },
    {
        id: 'C003',
        name: 'App Update Notification',
        type: 'Push Notification',
        targetGroup: 'All Users',
        status: 'Scheduled',
        startDate: '2024-09-01',
        endDate: '2024-09-07',
        avatar: '🔔'
    },
    {
        id: 'C004',
        name: 'Black Friday Sale',
        type: 'Email',
        targetGroup: 'Active Users',
        status: 'Expired',
        startDate: '2023-11-24',
        endDate: '2023-11-26',
        avatar: '📧'
    },
    {
        id: 'C005',
        name: 'Holiday Greetings',
        type: 'SMS',
        targetGroup: 'All Users',
        status: 'Scheduled',
        startDate: '2024-12-20',
        endDate: '2024-12-25',
        avatar: '💬'
    },
    {
        id: 'C006',
        name: 'Weekly Newsletter',
        type: 'Email',
        targetGroup: 'Subscribers',
        status: 'Active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        avatar: '📧'
    }
]

export default function Campaigns() {
    const { setPageHeader } = usePageHeader()
    const [campaigns] = useState<Campaign[]>(mockCampaigns)
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>(mockCampaigns)
    const [activeTab, setActiveTab] = useState('All')

    // Filter states
    const [searchFilters, setSearchFilters] = useState({
        campaignType: '',
        campaignId: '',
        campaignName: '',
        targetGroup: '',
        status: '',
        dateFrom: '',
        dateTo: ''
    })

    useEffect(() => {
        setPageHeader({
            title: "Campaigns",
            subtitle: "Manage and monitor your marketing campaigns across all channels"
        })
    }, [setPageHeader])

    const tabs = [
        { name: 'All', count: 24 },
        { name: 'Active', count: 8, type: 'status' },
        { name: 'Scheduled', count: 6, type: 'status' },
        { name: 'Expired', count: 10, type: 'status' },
        { name: 'Email', count: 12, type: 'campaignType' },
        { name: 'SMS', count: 7, type: 'campaignType' },
        { name: 'Push', count: 5, type: 'campaignType' },
    ]

    // Filter campaigns based on selected filters and active tab
    useEffect(() => {
        let filtered = campaigns

        // Filter by active tab
        if (activeTab !== 'All') {
            if (activeTab === 'Active') {
                filtered = filtered.filter(campaign => campaign.status === 'Active')
            } else if (activeTab === 'Scheduled') {
                filtered = filtered.filter(campaign => campaign.status === 'Scheduled')
            } else if (activeTab === 'Expired') {
                filtered = filtered.filter(campaign => campaign.status === 'Expired')
            } else if (activeTab === 'Email') {
                filtered = filtered.filter(campaign => campaign.type === 'Email')
            } else if (activeTab === 'SMS') {
                filtered = filtered.filter(campaign => campaign.type === 'SMS')
            } else if (activeTab === 'Push') {
                filtered = filtered.filter(campaign => campaign.type === 'Push Notification')
            }
        }

        // Filter by campaign type (dropdown filter)
        if (searchFilters.campaignType) {
            filtered = filtered.filter(campaign => campaign.type === searchFilters.campaignType)
        }

        // Filter by status (dropdown filter)
        if (searchFilters.status) {
            filtered = filtered.filter(campaign => campaign.status === searchFilters.status)
        }

        // Filter by campaign ID
        if (searchFilters.campaignId) {
            filtered = filtered.filter(campaign =>
                campaign.id.toLowerCase().includes(searchFilters.campaignId.toLowerCase())
            )
        }

        // Filter by campaign name
        if (searchFilters.campaignName) {
            filtered = filtered.filter(campaign =>
                campaign.name.toLowerCase().includes(searchFilters.campaignName.toLowerCase())
            )
        }

        // Filter by target group
        if (searchFilters.targetGroup) {
            filtered = filtered.filter(campaign =>
                campaign.targetGroup.toLowerCase().includes(searchFilters.targetGroup.toLowerCase())
            )
        }

        // Filter by date range
        if (searchFilters.dateFrom) {
            filtered = filtered.filter(campaign => campaign.startDate >= searchFilters.dateFrom)
        }
        if (searchFilters.dateTo) {
            filtered = filtered.filter(campaign => campaign.endDate <= searchFilters.dateTo)
        }

        setFilteredCampaigns(filtered)
    }, [campaigns, activeTab, searchFilters])

    const getStatusColor = (status: CampaignStatus) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 border border-green-200'
            case 'Scheduled':
                return 'bg-blue-100 text-blue-800 border border-blue-200'
            case 'Expired':
                return 'bg-gray-100 text-gray-800 border border-gray-200'
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200'
        }
    }

    const getTypeColor = (type: CampaignType) => {
        switch (type) {
            case 'Email':
                return 'bg-purple-100 text-purple-800 border border-purple-200'
            case 'SMS':
                return 'bg-orange-100 text-orange-800 border border-orange-200'
            case 'Push Notification':
                return 'bg-cyan-100 text-cyan-800 border border-cyan-200'
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
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
                        {/* Campaign Type Filter */}
                        <div className="relative">
                            <select
                                value={searchFilters.campaignType}
                                onChange={(e) => handleFilterChange('campaignType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="">All Types</option>
                                <option value="Email">Email</option>
                                <option value="SMS">SMS</option>
                                <option value="Push Notification">Push Notification</option>
                            </select>
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={searchFilters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Expired">Expired</option>
                            </select>
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Campaign ID Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Campaign ID"
                                value={searchFilters.campaignId}
                                onChange={(e) => handleFilterChange('campaignId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Campaign Name Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Campaign Name"
                                value={searchFilters.campaignName}
                                onChange={(e) => handleFilterChange('campaignName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Target Group Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Target Group"
                                value={searchFilters.targetGroup}
                                onChange={(e) => handleFilterChange('targetGroup', e.target.value)}
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
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 1fr 1.5fr' }}>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Campaign Info</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Type</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Target Group</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Start Date</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">End Date</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* Campaign Rows */}
                    {filteredCampaigns.map((campaign) => (
                        <div key={campaign.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                            <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 1fr 1.5fr' }}>
                                {/* Campaign Info Column */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm border border-gray-300">
                                            {campaign.avatar}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-1">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{campaign.name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs text-gray-400">ID:</span>
                                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                {campaign.id}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Type Column */}
                                <div className="text-center">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getTypeColor(campaign.type)}`}>
                                        {campaign.type}
                                    </span>
                                </div>

                                {/* Target Group Column */}
                                <div className="text-sm text-gray-700 truncate text-center" title={campaign.targetGroup}>
                                    {campaign.targetGroup}
                                </div>

                                {/* Status Column */}
                                <div className="text-center">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(campaign.status)}`}>
                                        {campaign.status}
                                    </span>
                                </div>

                                {/* Start Date Column */}
                                <div className="text-sm text-gray-700 text-center">
                                    {campaign.startDate}
                                </div>

                                {/* End Date Column */}
                                <div className="text-sm text-gray-700 text-center">
                                    {campaign.endDate}
                                </div>

                                {/* Actions Column */}
                                <div className="flex flex-col space-y-1 items-center">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors">
                                        View
                                    </button>
                                    <button className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {filteredCampaigns.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">
                                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">📊</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                                <p className="text-gray-500">Try adjusting your filters or create a new campaign.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            {filteredCampaigns.length > 0 && (
                <div className="text-sm text-gray-500">
                    Showing {filteredCampaigns.length} of {campaigns.length} campaigns
                </div>
            )}
        </div>
    )
}
