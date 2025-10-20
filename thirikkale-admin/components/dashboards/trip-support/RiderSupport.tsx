"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    MessageSquare,
    Clock,
    CheckCircle,
    AlertTriangle,
    Phone,
    Mail,
    Star,
    MapPin,
    RefreshCw
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function RiderSupport() {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setPageHeader({
            title: "Rider Support",
            subtitle: "Technical assistance and system-related issue resolution for riders"
        })
    }, [setPageHeader])

    const tabs = [
        { name: 'all', label: 'All Issues', count: 5 },
        { name: 'critical', label: 'Critical', count: 2 },
        { name: 'open', label: 'Open', count: 2 },
        { name: 'resolved', label: 'Resolved', count: 1 }
    ]

    const tickets = [
        {
            id: 'RST-001',
            rider: 'Sarah Johnson',
            riderId: 'R001',
            phone: '+94 77 234 5678',
            email: 'sarah.johnson@email.com',
            rating: 4.9,
            issue: 'Payment processing failure',
            category: 'Payment System',
            priority: 'critical',
            status: 'critical',
            created: '2024-01-15 16:45',
            lastUpdate: '2024-01-15 17:30',
            location: 'Colombo City Center',
            description: 'Credit card payment keeps getting declined despite sufficient funds. Unable to book rides.',
            systemError: 'Error Code: PAY_PROCESS_FAIL',
            deviceInfo: 'iOS 16.3, App v2.1.3',
            deviceBrand: 'iPhone 13 Pro Max',
            deviceModel: 'A2484'
        },
        {
            id: 'RST-002',
            rider: 'Michael Chen',
            riderId: 'R002',
            phone: '+94 76 345 6789',
            email: 'michael.chen@email.com',
            rating: 4.5,
            issue: 'App freezes during ride booking',
            category: 'App Bug',
            priority: 'critical',
            status: 'open',
            created: '2024-01-15 15:20',
            lastUpdate: '2024-01-15 16:10',
            location: 'Kandy Road, Malabe',
            description: 'App becomes unresponsive when trying to select pickup location. Force close required.',
            systemError: 'Error Code: UI_FREEZE_BOOKING',
            deviceInfo: 'Android 13, App v2.1.3',
            deviceBrand: 'Samsung Galaxy S23',
            deviceModel: 'SM-S911B'
        },
        {
            id: 'RST-003',
            rider: 'Priya Patel',
            riderId: 'R003',
            phone: '+94 71 456 7890',
            email: 'priya.patel@email.com',
            rating: 4.7,
            issue: 'Location tracking not accurate',
            category: 'GPS System',
            priority: 'high',
            status: 'open',
            created: '2024-01-15 14:15',
            lastUpdate: '2024-01-15 15:45',
            location: 'Nugegoda Junction',
            description: 'App shows wrong current location, causing drivers to go to incorrect pickup points.',
            systemError: 'Error Code: GPS_LOCATION_DRIFT',
            deviceInfo: 'Android 12, App v2.1.2',
            deviceBrand: 'OnePlus 10 Pro',
            deviceModel: 'NE2213'
        },
        {
            id: 'RST-004',
            rider: 'David Williams',
            riderId: 'R004',
            phone: '+94 75 567 8901',
            email: 'david.williams@email.com',
            rating: 4.3,
            issue: 'Push notifications not working',
            category: 'Notification System',
            priority: 'medium',
            status: 'open',
            created: '2024-01-15 13:30',
            lastUpdate: '2024-01-15 14:20',
            location: 'Mount Lavinia Beach',
            description: 'Not receiving notifications about driver arrival or trip updates.',
            systemError: 'Error Code: NOTIF_SERVICE_DOWN',
            deviceInfo: 'iOS 15.7, App v2.1.1',
            deviceBrand: 'iPhone 12',
            deviceModel: 'A2172'
        },
        {
            id: 'RST-005',
            rider: 'Aisha Rahman',
            riderId: 'R005',
            phone: '+94 78 678 9012',
            email: 'aisha.rahman@email.com',
            rating: 4.8,
            issue: 'Ride history sync resolved',
            category: 'Data Sync',
            priority: 'low',
            status: 'resolved',
            created: '2024-01-15 11:00',
            lastUpdate: '2024-01-15 12:15',
            location: 'Galle Face Green',
            description: 'Previous rides not showing in history. Fixed after account re-sync.',
            systemError: 'Error Code: HISTORY_SYNC_FAIL',
            deviceInfo: 'Android 11, App v2.1.3',
            deviceBrand: 'Google Pixel 6',
            deviceModel: 'GB7N6'
        }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-800 border border-red-200'
            case 'high': return 'bg-orange-100 text-orange-800 border border-orange-200'
            case 'medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            case 'low': return 'bg-green-100 text-green-800 border border-green-200'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical': return 'bg-red-100 text-red-800'
            case 'open': return 'bg-blue-100 text-blue-800'
            case 'resolved': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'critical': return <AlertTriangle className="h-4 w-4" />
            case 'open': return <Clock className="h-4 w-4" />
            case 'resolved': return <CheckCircle className="h-4 w-4" />
            default: return <MessageSquare className="h-4 w-4" />
        }
    }

    const filteredTickets = tickets.filter(ticket => {
        const matchesFilter = activeTab === 'all' || ticket.status === activeTab
        const matchesSearch = ticket.id.toLowerCase().includes(search.toLowerCase()) ||
            ticket.rider.toLowerCase().includes(search.toLowerCase()) ||
            ticket.issue.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="space-y-6">
            {/* Export and Quick Stats */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Data
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                        Export System Issues
                    </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                        <span className="font-medium text-blue-800">Total Issues: {tickets.length}</span>
                    </div>
                    <div className="bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                        <span className="font-medium text-red-800">Critical: {tickets.filter(ticket => ticket.priority === 'critical').length}</span>
                    </div>
                    <div className="bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                        <span className="font-medium text-green-800">Resolved: {tickets.filter(ticket => ticket.status === 'resolved').length}</span>
                    </div>
                </div>
            </div>

            {/* Support Issues Table */}
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
                                {tab.label}
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
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search by issue ID, rider, or system error"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="w-full">
                    <div className="w-full">
                        <div className="bg-gray-100 border-b-2 border-gray-300">
                            <div className="grid gap-6 px-6 py-4" style={{ gridTemplateColumns: '0.6fr 1.6fr 2fr 1.3fr 1fr 0.9fr' }}>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Issue ID</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rider</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">System Issue & Details</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Device & Contact</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Priority & Status</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                            </div>
                        </div>
                        {filteredTickets.map((ticket) => (
                            <div key={ticket.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                <div className="grid gap-6 px-6 py-4 items-start" style={{ gridTemplateColumns: '0.6fr 1.6fr 2fr 1.3fr 1fr 0.9fr' }}>
                                    {/* Issue ID Column */}
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold text-gray-900">{ticket.id}</p>
                                        <p className="text-xs text-gray-500">{ticket.created.split(' ')[0]}</p>
                                        <p className="text-xs text-gray-500">{ticket.created.split(' ')[1]}</p>
                                    </div>

                                    {/* Rider Column */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium border border-purple-300">
                                                {ticket.rider.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{ticket.rider}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs text-gray-400">ID:</span>
                                                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                                                    {ticket.riderId}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1 mt-1">
                                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                                <span className="text-xs text-gray-600">{ticket.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Combined System Issue & Error Details Column */}
                                    <div className="space-y-2">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="text-sm font-semibold text-gray-900 mb-1">{ticket.issue}</p>
                                            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                                                {ticket.category}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                                            {ticket.description}
                                        </div>
                                        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                                            <p className="text-xs font-medium text-yellow-800">{ticket.systemError}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs text-gray-600">{ticket.location}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Updated: {ticket.lastUpdate}
                                        </div>
                                    </div>

                                    {/* Device & Contact Column */}
                                    <div className="space-y-2">
                                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                                            <p className="text-xs font-medium text-blue-800">{ticket.deviceInfo}</p>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded p-2">
                                            <p className="text-xs font-medium text-gray-800">{ticket.deviceBrand}</p>
                                            <p className="text-xs text-gray-600">{ticket.deviceModel}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs text-gray-600">{ticket.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs text-gray-600 truncate">{ticket.email}</span>
                                        </div>
                                    </div>

                                    {/* Priority & Status Column */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                        </span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                            {getStatusIcon(ticket.status)}
                                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ')}
                                        </span>
                                    </div>

                                    {/* Actions Column */}
                                    <div className="flex flex-col space-y-1">
                                        <button className="text-red-600 hover:text-red-800 text-xs font-medium px-3 py-1 rounded-md border border-red-300 hover:bg-red-50 transition-colors w-full">
                                            <AlertTriangle className="h-3 w-3 mr-1 inline" />
                                            Debug
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-full">
                                            <Phone className="h-3 w-3 mr-1 inline" />
                                            Call
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 text-xs font-medium px-3 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors w-full">
                                            <CheckCircle className="h-3 w-3 mr-1 inline" />
                                            Resolve
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
