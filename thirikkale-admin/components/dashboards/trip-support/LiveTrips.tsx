"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    MapPin,
    Clock,
    RefreshCw,
    Car,
    Truck,
    Bike,
    Zap,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock3,
    DollarSign,
    CreditCard
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function LiveTrips() {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setPageHeader({
            title: "Live Trips",
            subtitle: "Monitor ongoing trips and real-time trip data"
        })
    }, [setPageHeader])

    const trips = [
        {
            id: 'TRP-001',
            driver: {
                name: 'John Silva',
                id: 'D001',
                avatar: 'JS',
                location: 'Colombo'
            },
            riders: [
                {
                    name: 'Sarah Johnson',
                    id: 'R100',
                    avatar: 'SJ',
                    pickup: 'Colombo Fort',
                    destination: 'Kandy',
                    status: 'active'
                },
                {
                    name: 'Mike Chen',
                    id: 'R105',
                    avatar: 'MC',
                    pickup: 'Maradana',
                    destination: 'Peradeniya',
                    status: 'active'
                }
            ],
            mainRoute: {
                start: 'Colombo Fort',
                end: 'Kandy'
            },
            status: 'active',
            duration: '45 min',
            distance: '12.5 km',
            estimatedArrival: '14:30',
            vehicle: {
                type: 'Car',
                model: 'Toyota Prius',
                plateNumber: 'ABC-1234'
            },
            totalRiders: 2,
            baseFare: 2450, // Base fare per rider in LKR
            rating: null, // Live trips don't have ratings yet
            paymentMethod: 'Credit Card',
            startTime: '2024-01-15 13:45'
        },
        {
            id: 'TRP-002',
            driver: {
                name: 'Amal Perera',
                id: 'D002',
                avatar: 'AP',
                location: 'Colombo'
            },
            riders: [
                {
                    name: 'Michael Brown',
                    id: 'R101',
                    avatar: 'MB',
                    pickup: 'Galle Face',
                    destination: 'Negombo',
                    status: 'waiting'
                }
            ],
            mainRoute: {
                start: 'Galle Face',
                end: 'Negombo'
            },
            status: 'waiting',
            duration: '0 min',
            distance: '8.2 km',
            estimatedArrival: '15:15',
            vehicle: {
                type: 'Car',
                model: 'Honda Vezel',
                plateNumber: 'XYZ-5678'
            },
            totalRiders: 1,
            baseFare: 980,
            rating: null,
            paymentMethod: 'Cash',
            startTime: '2024-01-15 14:30'
        },
        {
            id: 'TRP-003',
            driver: {
                name: 'Nimal Fernando',
                id: 'D003',
                avatar: 'NF',
                location: 'Colombo'
            },
            riders: [
                {
                    name: 'Emma Wilson',
                    id: 'R102',
                    avatar: 'EW',
                    pickup: 'Mount Lavinia',
                    destination: 'Dehiwala',
                    status: 'emergency'
                },
                {
                    name: 'Alex Kumar',
                    id: 'R106',
                    avatar: 'AK',
                    pickup: 'Kalutara',
                    destination: 'Panadura',
                    status: 'emergency'
                },
                {
                    name: 'Lisa Wong',
                    id: 'R107',
                    avatar: 'LW',
                    pickup: 'Moratuwa',
                    destination: 'Dehiwala',
                    status: 'emergency'
                }
            ],
            mainRoute: {
                start: 'Mount Lavinia',
                end: 'Dehiwala'
            },
            status: 'emergency',
            duration: '25 min',
            distance: '6.3 km',
            estimatedArrival: '14:45',
            vehicle: {
                type: 'Three Wheeler',
                model: 'Bajaj RE',
                plateNumber: 'DEF-9012'
            },
            totalRiders: 3,
            baseFare: 450,
            rating: null,
            paymentMethod: 'Digital Wallet',
            startTime: '2024-01-15 14:20'
        },
        {
            id: 'TRP-004',
            driver: {
                name: 'Kamal Rajapakse',
                id: 'D100',
                avatar: 'KR',
                location: 'Colombo'
            },
            riders: [
                {
                    name: 'David Smith',
                    id: 'R103',
                    avatar: 'DS',
                    pickup: 'Nugegoda',
                    destination: 'Maharagama',
                    status: 'delayed'
                }
            ],
            mainRoute: {
                start: 'Nugegoda',
                end: 'Maharagama'
            },
            status: 'delayed',
            duration: '35 min',
            distance: '4.7 km',
            estimatedArrival: '15:00',
            vehicle: {
                type: 'Van',
                model: 'Toyota KDH',
                plateNumber: 'GHI-3456'
            },
            totalRiders: 1,
            baseFare: 650,
            rating: null,
            paymentMethod: 'Credit Card',
            startTime: '2024-01-15 14:25'
        },
        {
            id: 'TRP-005',
            driver: {
                name: 'Ruwan Perera',
                id: 'D005',
                avatar: 'RP',
                location: 'Colombo'
            },
            riders: [
                {
                    name: 'Sam Wilson',
                    id: 'R110',
                    avatar: 'SW',
                    pickup: 'Pettah',
                    destination: 'Wellawatte',
                    status: 'active'
                }
            ],
            mainRoute: {
                start: 'Pettah',
                end: 'Wellawatte'
            },
            status: 'active',
            duration: '20 min',
            distance: '4.2 km',
            estimatedArrival: '16:20',
            vehicle: {
                type: 'Bike',
                model: 'Honda CB150R',
                plateNumber: 'JKL-7890'
            },
            totalRiders: 1,
            baseFare: 1250,
            rating: null,
            paymentMethod: 'Digital Wallet',
            startTime: '2024-01-15 16:00'
        }
    ]

    // Function to calculate dynamic fare based on rider count
    const calculateFare = (baseFare: number, riderCount: number) => {
        return baseFare * riderCount
    }

    const tabs = [
        { name: 'all', label: 'All Trips', count: trips.length },
        { name: 'active', label: 'Active', count: trips.filter(t => t.status === 'active').length },
        { name: 'waiting', label: 'Waiting', count: trips.filter(t => t.status === 'waiting').length },
        { name: 'emergency', label: 'Emergency', count: trips.filter(t => t.status === 'emergency').length },
        { name: 'delayed', label: 'Delayed', count: trips.filter(t => t.status === 'delayed').length }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border border-green-200'
            case 'waiting': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            case 'emergency': return 'bg-red-100 text-red-800 border border-red-200'
            case 'delayed': return 'bg-orange-100 text-orange-800 border border-orange-200'
            default: return 'bg-gray-100 text-gray-800 border border-gray-200'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="h-3 w-3" />
            case 'waiting': return <Clock3 className="h-3 w-3" />
            case 'emergency': return <AlertCircle className="h-3 w-3" />
            case 'delayed': return <XCircle className="h-3 w-3" />
            default: return <CheckCircle className="h-3 w-3" />
        }
    }

    const getVehicleIcon = (vehicleType: string) => {
        const type = vehicleType.toLowerCase()
        if (type.includes('bike') || type.includes('motorcycle')) return <Bike className="h-4 w-4 text-orange-600" />
        if (type.includes('van') || type.includes('truck')) return <Truck className="h-4 w-4 text-purple-600" />
        if (type.includes('three') || type.includes('tuktuk') || type.includes('wheeler')) return <Zap className="h-4 w-4 text-yellow-600" />
        return <Car className="h-4 w-4 text-blue-600" /> // default for cars
    }

    const filteredTrips = trips.filter(trip => {
        const matchesFilter = activeTab === 'all' || trip.status === activeTab
        const matchesSearch = trip.id.toLowerCase().includes(search.toLowerCase()) ||
            trip.driver.name.toLowerCase().includes(search.toLowerCase()) ||
            trip.riders.some(rider => rider.name.toLowerCase().includes(search.toLowerCase())) ||
            trip.mainRoute.start.toLowerCase().includes(search.toLowerCase()) ||
            trip.mainRoute.end.toLowerCase().includes(search.toLowerCase()) ||
            trip.startTime.includes(search)
        return matchesFilter && matchesSearch
    })

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
                            placeholder="Search by trip ID, driver, rider, route, or start time"
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

                {/* Trip Grid */}
                <div className="w-full">
                    <div className="w-full">
                        <div className="bg-gray-100 border-b-2 border-gray-300">
                            <div className="grid gap-6 px-6 py-4" style={{ gridTemplateColumns: '0.7fr 1.3fr 1.3fr 1.1fr 2.2fr 1.0fr 0.7fr' }}>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trip ID</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Driver</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rider</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Vehicle</div>
                                <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trip Details</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                            </div>
                        </div>
                        {filteredTrips.map((trip) => (
                            <div key={trip.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                <div className="grid gap-6 px-6 py-4 items-start" style={{ gridTemplateColumns: '0.7fr 1.3fr 1.3fr 1.1fr 2.2fr 1.0fr 0.7fr' }}>
                                    {/* Trip ID Column */}
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold text-gray-900">{trip.id}</p>
                                        <p className="text-xs text-gray-500">{trip.startTime}</p>
                                    </div>

                                    {/* Driver Column */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border border-blue-300">
                                                {trip.driver.avatar}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{trip.driver.name}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs text-gray-400">ID:</span>
                                                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                    {trip.driver.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rider Column - Multiple Riders */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                {trip.totalRiders} Rider{trip.totalRiders > 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        {/* Show riders vertically for better spacing */}
                                        <div className="space-y-2">
                                            {trip.riders.slice(0, 2).map((rider) => (
                                                <div key={rider.id} className="flex items-center space-x-2">
                                                    <div className="h-7 w-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium border border-green-300 flex-shrink-0">
                                                        {rider.avatar}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-xs font-semibold text-gray-900 truncate">{rider.name}</p>
                                                        <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                                                            {rider.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Show +X more if there are more than 2 riders */}
                                            {trip.totalRiders > 2 && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border border-gray-300 flex-shrink-0">
                                                        +{trip.totalRiders - 2}
                                                    </div>
                                                    <span className="text-xs text-gray-500">more riders</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Vehicle Column - Dedicated Vehicle Info */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            {getVehicleIcon(trip.vehicle.type)}
                                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                {trip.vehicle.type}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-gray-900">{trip.vehicle.model}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium border border-blue-200">
                                                    {trip.vehicle.plateNumber}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Details Column - Modern Live Trip Layout */}
                                    <div className="space-y-3">
                                        {/* Route Display - Visual Journey */}
                                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border border-blue-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <span className="text-xs font-semibold text-gray-800">{trip.mainRoute.start}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 mx-3">
                                                    <div className="border-t-2 border-dashed border-gray-400 relative">
                                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                                →
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                        <span className="text-xs font-semibold text-gray-800">{trip.mainRoute.end}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Key Metrics - Live Trip Focus */}
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <DollarSign className="h-3 w-3 text-green-600" />
                                                </div>
                                                <div className="text-xs font-bold text-green-700">LKR {calculateFare(trip.baseFare, trip.totalRiders).toLocaleString()}</div>
                                                <div className="text-xs text-green-600">Current Fare</div>
                                                <div className="text-xs text-gray-500 mt-1">({trip.totalRiders} rider{trip.totalRiders > 1 ? 's' : ''})</div>
                                            </div>
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <Clock className="h-3 w-3 text-blue-600" />
                                                </div>
                                                <div className="text-xs font-bold text-blue-700">{trip.duration}</div>
                                                <div className="text-xs text-blue-600">Duration</div>
                                            </div>
                                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <MapPin className="h-3 w-3 text-purple-600" />
                                                </div>
                                                <div className="text-xs font-bold text-purple-700">{trip.distance}</div>
                                                <div className="text-xs text-purple-600">Distance</div>
                                            </div>
                                        </div>

                                        {/* Live Trip Timeline - ETA Focus */}
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                                    <span className="font-medium text-gray-700">Live</span>
                                                </div>
                                                <div className="flex-1 mx-2">
                                                    <div className="border-t border-amber-300"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-amber-700">ETA: {trip.estimatedArrival}</span>
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Method - Live Trip Style with Dynamic Fare Indicator */}
                                        <div className="flex items-center justify-center">
                                            <div className="bg-purple-50 border border-purple-200 rounded-md px-3 py-1 flex items-center gap-2">
                                                <CreditCard className="h-3 w-3 text-purple-600" />
                                                <span className="text-xs font-medium text-purple-700">{trip.paymentMethod}</span>
                                                <div className="w-2 h-2 bg-green-500 rounded-full" title="Payment Ready"></div>
                                            </div>
                                        </div>

                                        {/* Dynamic Fare Notice for Live Trips */}
                                        <div className="bg-amber-50 border border-amber-200 rounded-md p-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                                <div className="text-xs text-amber-700">
                                                    <span className="font-medium">Dynamic Fare:</span> Updates as riders join/leave
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Column */}
                                    <div className="flex justify-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(trip.status)}`}>
                                            {getStatusIcon(trip.status)}
                                            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Actions Column */}
                                    <div className="flex flex-col space-y-1 items-center">
                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-full">
                                            View
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 text-xs font-medium px-3 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors w-full">
                                            Track
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
