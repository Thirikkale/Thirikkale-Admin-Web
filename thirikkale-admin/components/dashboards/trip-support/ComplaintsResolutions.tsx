"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    CheckCircle2,
    Clock,
    AlertTriangle,
    DollarSign,
    MessageSquare,
    User,
    MapPin,
    RefreshCw,
    Phone,
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function ComplaintsResolutions() {
    const { setPageHeader } = usePageHeader()
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setPageHeader({
            title: "Complaints & Resolution",
            subtitle: "Manage and resolve customer complaints and service issues"
        })
    }, [setPageHeader])

    const filters = [
        { id: 'all', label: 'All Complaints', count: 107 },
        { id: 'pending', label: 'Pending', count: 28 },
        { id: 'investigating', label: 'Investigating', count: 22 },
        { id: 'resolved', label: 'Resolved', count: 57 }
    ]

    const disputes = [
        {
            id: 'CMP-001',
            tripId: 'TRP-001',
            type: 'Fare Complaint',
            status: 'pending',
            priority: 'high',
            complainant: 'Sarah Johnson',
            complainantId: 'R100',
            complainantType: 'rider',
            complainedAgainst: 'John Silva',
            complainedAgainstId: 'D100',
            complainedAgainstType: 'driver',
            driver: 'John Silva',
            riders: ['Sarah Johnson'],
            disputedAmount: 'LKR 450',
            originalFare: 'LKR 850',
            route: 'Colombo Fort → Kandy',
            createdAt: '2024-01-15 16:30',
            description: 'Rider complained about driver taking longer route and charging extra fare. GPS data shows deviation from optimal route.',
            evidence: ['GPS tracking data', 'Trip screenshots', 'Message history'],
            assignedTo: 'Agent Smith'
        },
        {
            id: 'CMP-002',
            tripId: 'TRP-002',
            type: 'Behavioral Issue',
            status: 'investigating',
            priority: 'high',
            complainant: 'Amal Perera',
            complainantId: 'D101',
            complainantType: 'driver',
            complainedAgainst: 'Michael Brown',
            complainedAgainstId: 'R101',
            complainedAgainstType: 'rider',
            driver: 'Amal Perera',
            riders: ['Michael Brown'],
            disputedAmount: null,
            originalFare: 'LKR 650',
            route: 'Galle Face → Negombo',
            createdAt: '2024-01-15 14:45',
            description: 'Driver complaint about rider being intoxicated, verbally abusive, and refusing to wear seatbelt during trip.',
            evidence: ['Driver statement', 'Vehicle camera footage', 'Audio recording'],
            assignedTo: 'Agent Johnson'
        },
        {
            id: 'CMP-003',
            tripId: 'TRP-003',
            type: 'Payment Issue',
            status: 'resolved',
            priority: 'medium',
            complainant: 'Emma Wilson',
            complainantId: 'R102',
            complainantType: 'rider',
            complainedAgainst: 'System',
            complainedAgainstId: 'SYS-001',
            complainedAgainstType: 'system',
            driver: 'Nimal Fernando',
            riders: ['Emma Wilson'],
            disputedAmount: 'LKR 450',
            originalFare: 'LKR 450',
            route: 'Mount Lavinia → Dehiwala',
            createdAt: '2024-01-14 12:30',
            resolvedAt: '2024-01-15 10:15',
            resolution: 'Payment processed successfully after technical issue was resolved. Customer refunded and satisfied.',
            description: 'Payment failed due to technical error but customer was charged. Refund requested for duplicate charge.',
            evidence: ['Payment logs', 'Bank statements', 'System error logs'],
            assignedTo: 'Agent Williams'
        },
        {
            id: 'CMP-004',
            tripId: 'TRP-004',
            type: 'Service Quality',
            status: 'pending',
            priority: 'medium',
            complainant: 'David Smith',
            complainantId: 'R103',
            complainantType: 'rider',
            complainedAgainst: 'Kamal Rajapakse',
            complainedAgainstId: 'D102',
            complainedAgainstType: 'driver',
            driver: 'Kamal Rajapakse',
            riders: ['David Smith'],
            disputedAmount: 'LKR 200',
            originalFare: 'LKR 380',
            route: 'Nugegoda → Maharagama',
            createdAt: '2024-01-15 11:20',
            description: 'Rider complained about cancellation fee charged when driver was late and trip was cancelled by driver.',
            evidence: ['Cancellation logs', 'GPS location data', 'Communication records'],
            assignedTo: 'Agent Davis'
        },
        {
            id: 'CMP-005',
            tripId: 'TRP-005',
            type: 'Rider Conflict',
            status: 'investigating',
            priority: 'high',
            complainant: 'Lisa Anderson',
            complainantId: 'R104',
            complainantType: 'rider',
            complainedAgainst: 'Mark Johnson',
            complainedAgainstId: 'R105',
            complainedAgainstType: 'rider',
            driver: 'Sunil Wickramasinghe',
            riders: ['Lisa Anderson', 'Mark Johnson', 'Tom Wilson'],
            disputedAmount: null,
            originalFare: 'LKR 520',
            route: 'Kandy → Peradeniya',
            createdAt: '2024-01-15 09:15',
            description: 'Rider complained about another rider smoking in vehicle and using inappropriate language during shared ride.',
            evidence: ['Rider statements', 'Driver witness account', 'Vehicle camera footage'],
            assignedTo: 'Agent Brown'
        },
        {
            id: 'CMP-006',
            tripId: 'TRP-006',
            type: 'No-Show Fee',
            status: 'resolved',
            priority: 'low',
            complainant: 'Priya Mendis',
            complainantId: 'D103',
            complainantType: 'driver',
            complainedAgainst: 'Rachel Green',
            complainedAgainstId: 'R106',
            complainedAgainstType: 'rider',
            driver: 'Priya Mendis',
            riders: ['Rachel Green'],
            disputedAmount: 'LKR 150',
            originalFare: 'LKR 0',
            route: 'Colombo 07 → Colombo 03',
            createdAt: '2024-01-14 18:45',
            resolvedAt: '2024-01-15 12:30',
            resolution: 'No-show fee waived due to rider providing valid emergency excuse with medical documentation.',
            description: 'Driver complaint about rider not showing up for scheduled pickup and disputing no-show fee.',
            evidence: ['GPS location logs', 'Wait time records', 'Medical certificate'],
            assignedTo: 'Agent Taylor'
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'investigating': return 'bg-blue-100 text-blue-800'
            case 'resolved': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800'
            case 'medium': return 'bg-yellow-100 text-yellow-800'
            case 'low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="h-4 w-4" />
            case 'investigating': return <AlertTriangle className="h-4 w-4" />
            case 'resolved': return <CheckCircle2 className="h-4 w-4" />
            default: return <MessageSquare className="h-4 w-4" />
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Fare Complaint': return <DollarSign className="h-4 w-4 text-green-500" />
            case 'Service Quality': return <User className="h-4 w-4 text-blue-500" />
            case 'Payment Issue': return <DollarSign className="h-4 w-4 text-red-500" />
            case 'Behavioral Issue': return <AlertTriangle className="h-4 w-4 text-red-500" />
            case 'Rider Conflict': return <User className="h-4 w-4 text-orange-500" />
            case 'No-Show Fee': return <Clock className="h-4 w-4 text-yellow-500" />
            default: return <MessageSquare className="h-4 w-4 text-gray-500" />
        }
    }

    const getPartyTypeColor = (type: string) => {
        switch (type) {
            case 'driver': return 'bg-blue-500'
            case 'rider': return 'bg-green-500'
            case 'system': return 'bg-gray-500'
            default: return 'bg-gray-400'
        }
    }

    const getPartyTypeLabel = (type: string) => {
        switch (type) {
            case 'driver': return 'Driver'
            case 'rider': return 'Rider'
            case 'system': return 'System'
            default: return 'Unknown'
        }
    }

    const filteredDisputes = disputes.filter(dispute => {
        const matchesFilter = selectedFilter === 'all' || dispute.status === selectedFilter
        const matchesSearch = dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dispute.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dispute.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dispute.complainedAgainst.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dispute.riders.some(rider => rider.toLowerCase().includes(searchTerm.toLowerCase())) ||
            dispute.type.toLowerCase().includes(searchTerm.toLowerCase())
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
                        Export Complaints
                    </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                        <span className="font-medium text-blue-800">Total Complaints: {disputes.length}</span>
                    </div>
                    <div className="bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-200">
                        <span className="font-medium text-yellow-800">Pending: {disputes.filter(dispute => dispute.status === 'pending').length}</span>
                    </div>
                    <div className="bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                        <span className="font-medium text-green-800">Resolved: {disputes.filter(dispute => dispute.status === 'resolved').length}</span>
                    </div>
                </div>
            </div>

            {/* Complaints Table */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                {/* Status Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex overflow-hidden flex-wrap">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedFilter(filter.id)}
                                className={`flex-shrink-0 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${selectedFilter === filter.id
                                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {filter.label}
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${selectedFilter === filter.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {filter.count}
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
                            placeholder="Search by complaint ID, complainant, complained against, driver, rider, or type"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="w-full">
                    <div className="w-full">
                        <div className="bg-gray-100 border-b-2 border-gray-300">
                            <div className="grid gap-6 px-6 py-4" style={{ gridTemplateColumns: '0.8fr 1.2fr 1.2fr 1.3fr 1.6fr 1.0fr 1.0fr' }}>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Complaint ID</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Complainant</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Complained Against</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trip Details</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Complaint Details</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                            </div>
                        </div>
                        {filteredDisputes.map((dispute) => (
                            <div key={dispute.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                <div className="grid gap-6 px-6 py-4 items-start" style={{ gridTemplateColumns: '0.8fr 1.2fr 1.2fr 1.3fr 1.6fr 1.0fr 1.0fr' }}>
                                    {/* Complaint ID Column */}
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold text-gray-900">{dispute.id}</p>
                                        <p className="text-xs text-gray-500">{dispute.createdAt.split(' ')[0]}</p>
                                        <p className="text-xs text-gray-500">{dispute.createdAt.split(' ')[1]}</p>
                                    </div>

                                    {/* Complainant Column */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className={`h-7 w-7 rounded-full ${getPartyTypeColor(dispute.complainantType)} flex items-center justify-center text-white text-xs font-medium`}>
                                                {dispute.complainant.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{dispute.complainant}</p>
                                                <p className="text-xs text-gray-500">{getPartyTypeLabel(dispute.complainantType)}</p>
                                                <span className={`inline-block text-xs font-medium mt-1 px-1.5 py-0.5 rounded ${dispute.complainantType === 'rider' ? 'text-green-600 bg-green-100' : dispute.complainantType === 'driver' ? 'text-blue-600 bg-blue-100' : 'bg-gray-100 text-gray-800'}`}>{dispute.complainantId}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Complained Against Column */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className={`h-7 w-7 rounded-full ${getPartyTypeColor(dispute.complainedAgainstType)} flex items-center justify-center text-white text-xs font-medium`}>
                                                {dispute.complainedAgainst === 'System' ? 'SYS' : dispute.complainedAgainst.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{dispute.complainedAgainst}</p>
                                                <p className="text-xs text-gray-500">{getPartyTypeLabel(dispute.complainedAgainstType)}</p>
                                                <span className={`inline-block text-xs font-medium mt-1 px-1.5 py-0.5 rounded ${dispute.complainedAgainstType === 'rider' ? 'text-green-600 bg-green-100' : dispute.complainedAgainstType === 'driver' ? 'text-blue-600 bg-blue-100' : 'bg-gray-100 text-gray-800'}`}>{dispute.complainedAgainstId}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Details Column */}
                                    <div className="space-y-2">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded font-medium">{dispute.tripId}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <MapPin className="h-3 w-3 text-blue-600" />
                                                <span className="text-xs font-medium text-blue-800">Route:</span>
                                            </div>
                                            <span className="text-xs text-gray-700">{dispute.route}</span>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded p-2">
                                            <p className="text-xs font-medium text-gray-700">Driver: {dispute.driver}</p>
                                        </div>
                                        {dispute.riders.length > 1 && (
                                            <div className="bg-blue-50 border border-blue-200 rounded p-1">
                                                <p className="text-xs text-blue-800">Shared ride ({dispute.riders.length} riders)</p>
                                            </div>
                                        )}
                                        <div className="bg-green-50 border border-green-200 rounded p-2">
                                            <p className="text-xs font-medium text-green-800">Fare: {dispute.originalFare}</p>
                                            {dispute.disputedAmount && (
                                                <p className="text-xs font-medium text-red-600">Disputed: {dispute.disputedAmount}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Complaint Details Column */}
                                    <div className="space-y-2">
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                {getTypeIcon(dispute.type)}
                                                <p className="text-sm font-semibold text-gray-900">{dispute.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                                            {dispute.description}
                                        </div>
                                        {dispute.resolution && (
                                            <div className="bg-green-50 border border-green-200 rounded p-2">
                                                <p className="text-xs font-medium text-green-800">Resolution: {dispute.resolution}</p>
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-500">
                                            Assigned: {dispute.assignedTo}
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-700">Evidence:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {dispute.evidence.slice(0, 2).map((item, index) => (
                                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                        {item}
                                                    </span>
                                                ))}
                                                {dispute.evidence.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                        +{dispute.evidence.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {dispute.resolvedAt && (
                                            <div className="text-xs text-green-600">
                                                Resolved: {dispute.resolvedAt}
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Column */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(dispute.priority)}`}>
                                            {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)} Priority
                                        </span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                                            {getStatusIcon(dispute.status)}
                                            {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Actions Column */}
                                    <div className="flex flex-col space-y-1">
                                        {dispute.status !== 'resolved' && (
                                            <>
                                                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-full">
                                                    <MessageSquare className="h-3 w-3 mr-1 inline" />
                                                    Review
                                                </button>
                                                <button className="text-purple-600 hover:text-purple-800 text-xs font-medium px-3 py-1 rounded-md border border-purple-300 hover:bg-purple-50 transition-colors w-full">
                                                    <Phone className="h-3 w-3 mr-1 inline" />
                                                    Contact
                                                </button>
                                            </>
                                        )}
                                        {dispute.status === 'investigating' && (
                                            <button className="text-green-600 hover:text-green-800 text-xs font-medium px-3 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors w-full">
                                                <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                                                Resolve
                                            </button>
                                        )}
                                        {dispute.status === 'resolved' && (
                                            <button className="text-gray-600 text-xs font-medium px-3 py-1 rounded-md border border-gray-300 w-full cursor-not-allowed">
                                                Resolved
                                            </button>
                                        )}
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

