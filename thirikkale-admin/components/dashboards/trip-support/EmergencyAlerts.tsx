"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    BellRing,
    AlertTriangle,
    Clock,
    CheckCircle,
    MapPin,
    Phone,
    Car,
    RefreshCw,
    Shield,
    ShieldAlert,
    Siren,
    UserX,
    Activity
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function EmergencyAlerts() {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setPageHeader({
            title: "Emergency SOS Alerts",
            subtitle: "Emergency response system for critical security situations and urgent assistance"
        })
    }, [setPageHeader])

    const tabs = [
        { name: 'all', label: 'All SOS Alerts', count: 5 },
        { name: 'active', label: 'Active', count: 5 },
        { name: 'resolved', label: 'Resolved', count: 0 }
    ]

    const emergencies = [
        {
            id: 'SOS-001',
            type: 'Security Threat',
            priority: 'critical',
            status: 'active',
            reporter: 'John Silva',
            reporterId: 'D001',
            reporterType: 'Driver',
            reporterStatus: 'Unsafe - Threatened',
            reportedPersons: [
                { name: 'Sarah Johnson', id: 'R100', type: 'Rider', status: 'Aggressive - Threatening Driver' }
            ],
            phone: '+94 77 123 4567',
            location: 'Colombo-Kandy Highway, 45km mark',
            coordinates: '6.9271, 79.8612',
            description: 'Driver reported aggressive behavior from passenger. Potential threat to safety.',
            reportedAt: '2024-01-15 16:45',
            estimatedResponse: '5 minutes',
            nearbyServices: ['Police Dispatched', 'Security Team'],
            tripId: 'TRP-001',
            sosType: 'Security Threat',
            alertLevel: 'HIGH'
        },
        {
            id: 'SOS-002',
            type: 'Medical Emergency',
            priority: 'critical',
            status: 'active',
            reporter: 'Amal Perera',
            reporterId: 'D002',
            reporterType: 'Driver',
            reporterStatus: 'Safe - Providing Assistance',
            reportedPersons: [
                { name: 'Michael Brown', id: 'R101', type: 'Rider', status: 'Injured - Chest Pain' }
            ],
            phone: '+94 76 987 6543',
            location: 'Galle Road, near Bambalapitiya',
            coordinates: '6.8847, 79.8574',
            description: 'Driver reporting passenger medical emergency - chest pain requiring immediate assistance.',
            reportedAt: '2024-01-15 17:10',
            estimatedResponse: '3 minutes',
            nearbyServices: ['Ambulance Dispatched', 'Medical Team'],
            tripId: 'TRP-002',
            sosType: 'Medical Emergency',
            alertLevel: 'CRITICAL'
        },
        {
            id: 'SOS-003',
            type: 'Personal Safety',
            priority: 'high',
            status: 'active',
            reporter: 'Emma Wilson',
            reporterId: 'R102',
            reporterType: 'Rider',
            reporterStatus: 'Unsafe - Harassed',
            reportedPersons: [
                { name: 'Nimal Fernando', id: 'D003', type: 'Driver', status: 'Inappropriate - Harassing Rider' }
            ],
            phone: '+94 71 555 7890',
            location: 'Maharagama Junction',
            coordinates: '6.8481, 79.9267',
            description: 'Rider reporting inappropriate behavior from driver. Safety concern raised.',
            reportedAt: '2024-01-15 17:25',
            estimatedResponse: '8 minutes',
            nearbyServices: ['Security Team', 'Police Notified'],
            tripId: 'TRP-003',
            sosType: 'Personal Safety',
            alertLevel: 'HIGH'
        },
        {
            id: 'SOS-004',
            type: 'Panic Button',
            priority: 'critical',
            status: 'active',
            reporter: 'Lisa Martinez',
            reporterId: 'R103',
            reporterType: 'Rider',
            reporterStatus: 'Panic - Emergency SOS',
            reportedPersons: [
                { name: 'Kumara Jayasekara', id: 'D004', type: 'Driver', status: 'Unknown - No Response' }
            ],
            phone: '+94 75 444 3333',
            location: 'Negombo Road, near Airport',
            coordinates: '7.1644, 79.9137',
            description: 'Panic button activated by rider. No response from driver. Immediate intervention required.',
            reportedAt: '2024-01-15 17:30',
            estimatedResponse: '4 minutes',
            nearbyServices: ['Emergency Response', 'Police Dispatched'],
            tripId: 'TRP-004',
            sosType: 'Panic Button',
            alertLevel: 'CRITICAL'
        },
        {
            id: 'SOS-005',
            type: 'Route Deviation',
            priority: 'high',
            status: 'active',
            reporter: 'David Chen',
            reporterId: 'R104',
            reporterType: 'Rider',
            reporterStatus: 'Concerned - Route Change',
            reportedPersons: [
                { name: 'Pradeep Silva', id: 'D005', type: 'Driver', status: 'Suspicious - Off Route' }
            ],
            phone: '+94 78 666 7777',
            location: 'Unscheduled Route - Ratnapura Road',
            coordinates: '6.6828, 80.4126',
            description: 'Rider reporting unauthorized route deviation. Driver took unscheduled route without consent.',
            reportedAt: '2024-01-15 17:35',
            estimatedResponse: '10 minutes',
            nearbyServices: ['GPS Tracking', 'Security Alert'],
            tripId: 'TRP-005',
            sosType: 'Route Deviation',
            alertLevel: 'MEDIUM'
        }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-500 text-white'
            case 'high': return 'bg-orange-500 text-white'
            case 'medium': return 'bg-yellow-500 text-white'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Security Threat': return <ShieldAlert className="h-5 w-5" />
            case 'Medical Emergency': return <Activity className="h-5 w-5" />
            case 'Personal Safety': return <Shield className="h-5 w-5" />
            case 'Panic Button': return <Siren className="h-5 w-5" />
            case 'Route Deviation': return <UserX className="h-5 w-5" />
            case 'Vehicle Breakdown': return <Car className="h-5 w-5" />
            case 'Accident': return <AlertTriangle className="h-5 w-5" />
            default: return <BellRing className="h-5 w-5" />
        }
    }

    const filteredEmergencies = emergencies.filter(emergency => {
        const matchesFilter = activeTab === 'all' || emergency.status === activeTab
        const matchesSearch = emergency.id.toLowerCase().includes(search.toLowerCase()) ||
            emergency.reporter.toLowerCase().includes(search.toLowerCase()) ||
            emergency.reporterId.toLowerCase().includes(search.toLowerCase()) ||
            emergency.reportedPersons.some(person =>
                person.name.toLowerCase().includes(search.toLowerCase()) ||
                person.id.toLowerCase().includes(search.toLowerCase())
            ) ||
            emergency.type.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-red-50 border-red-200 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-700">ACTIVE SOS ALERTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="text-3xl font-bold text-red-600">5</div>
                            <Siren className="h-8 w-8 text-red-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700">AVG RESPONSE TIME</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="text-3xl font-bold text-orange-600">6m</div>
                            <Clock className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-green-700">RESOLVED TODAY</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="text-3xl font-bold text-green-600">12</div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table Layout */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                {/* Status Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex overflow-hidden flex-wrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex-shrink-0 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.name
                                    ? 'border-red-500 text-red-600 bg-red-50'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeTab === tab.name ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
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
                            placeholder="Search by SOS ID, reporter, reported person, emergency type, or security threat"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Emergency Table */}
                <div className="w-full">
                    <div className="w-full">
                        <div className="bg-gray-100 border-b-2 border-gray-300">
                            <div className="grid gap-6 px-6 py-4" style={{ gridTemplateColumns: '0.8fr 1.5fr 1.2fr 1.2fr 2.0fr 1.2fr 1.0fr 1.5fr' }}>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SOS Alert ID</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Security Type & Priority</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Reporter</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Reported Person(s)</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location & Incident</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Response Time</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Alert Level</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Emergency Actions</div>
                            </div>
                        </div>
                        {filteredEmergencies.map((emergency) => (
                            <div key={emergency.id} className="border-b border-gray-200 bg-white hover:bg-red-25 transition-colors">
                                <div className="grid gap-6 px-6 py-4 items-start" style={{ gridTemplateColumns: '0.8fr 1.5fr 1.2fr 1.2fr 2.0fr 1.2fr 1.0fr 1.5fr' }}>
                                    {/* SOS Alert ID Column */}
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold text-red-600">{emergency.id}</p>
                                        <p className="text-xs text-gray-500">{emergency.reportedAt}</p>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${emergency.alertLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                                            emergency.alertLevel === 'HIGH' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {emergency.alertLevel}
                                        </span>
                                    </div>

                                    {/* Security Type & Priority Column */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${getPriorityColor(emergency.priority)}`}>
                                                {getTypeIcon(emergency.type)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{emergency.type}</p>
                                                <p className="text-xs text-gray-600">{emergency.sosType}</p>
                                            </div>
                                        </div>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(emergency.priority)}`}>
                                            {emergency.priority.toUpperCase()}
                                        </span>
                                        <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                                            <p className="font-medium text-gray-900 mb-1">Issue:</p>
                                            <p>{emergency.description}</p>
                                        </div>
                                    </div>

                                    {/* Reporter Column */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-medium ${emergency.reporterType === 'Driver' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                                {emergency.reporter.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{emergency.reporter}</p>
                                                <p className="text-xs text-gray-500">{emergency.reporterType}</p>
                                                <span className={`inline-block text-xs font-medium mt-1 px-1.5 py-0.5 rounded ${emergency.reporterType === 'Driver' ? 'text-blue-600 bg-blue-100' : 'text-green-600 bg-green-100'}`}>
                                                    {emergency.reporterId}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reported Person(s) Column */}
                                    <div className="space-y-2">
                                        {emergency.reportedPersons.map((person, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-medium ${person.type === 'Driver' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                                    {person.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                                    <p className="text-xs text-gray-500">{person.type}</p>
                                                    <span className={`inline-block text-xs font-medium mt-1 px-1.5 py-0.5 rounded ${person.type === 'Driver' ? 'text-blue-600 bg-blue-100' : 'text-green-600 bg-green-100'}`}>
                                                        {person.id}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Location & Incident Column */}
                                    <div className="space-y-3">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{emergency.location}</p>
                                                    <p className="text-xs text-gray-600 mt-1">{emergency.coordinates}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Car className="h-4 w-4 text-blue-500" />
                                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                {emergency.tripId}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Response Time Column */}
                                    <div className="space-y-2">
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Clock className="h-4 w-4 text-orange-600" />
                                            </div>
                                            <div className="text-sm font-bold text-orange-700">{emergency.estimatedResponse}</div>
                                            <div className="text-xs text-orange-600">ETA</div>
                                        </div>
                                        <div className="space-y-1">
                                            {emergency.nearbyServices.map((service, index) => (
                                                <span key={index} className="block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded text-center">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Alert Level Column */}
                                    <div className="flex justify-center">
                                        <span className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-full whitespace-nowrap ${emergency.alertLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                                            emergency.alertLevel === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                                                emergency.alertLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {emergency.alertLevel === 'CRITICAL' ? (
                                                <Siren className="h-3 w-3" />
                                            ) : emergency.alertLevel === 'HIGH' ? (
                                                <ShieldAlert className="h-3 w-3" />
                                            ) : (
                                                <Shield className="h-3 w-3" />
                                            )}
                                            {emergency.alertLevel}
                                        </span>
                                    </div>

                                    {/* Emergency Actions Column */}
                                    <div className="flex flex-col space-y-1">
                                        <button className="text-red-600 hover:text-red-800 text-xs font-medium px-3 py-2 rounded-md border border-red-300 hover:bg-red-50 transition-colors w-full">
                                            <Siren className="h-3 w-3 mr-1 inline" />
                                            SOS Response
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-2 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-full">
                                            <Phone className="h-3 w-3 mr-1 inline" />
                                            Emergency Call
                                        </button>
                                        <button className="text-purple-600 hover:text-purple-800 text-xs font-medium px-3 py-2 rounded-md border border-purple-300 hover:bg-purple-50 transition-colors w-full">
                                            <Shield className="h-3 w-3 mr-1 inline" />
                                            Security Team
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 text-xs font-medium px-3 py-2 rounded-md border border-green-300 hover:bg-green-50 transition-colors w-full">
                                            <CheckCircle className="h-3 w-3 mr-1 inline" />
                                            Mark Safe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {filteredEmergencies.length === 0 && (
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-8 text-center">
                        <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-green-800 mb-2">No Active SOS Alerts</h3>
                        <p className="text-green-600">All emergency security situations have been resolved safely.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
