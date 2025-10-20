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
import { getActiveRides, Ride } from '@/lib/api/adminService'

export default function LiveTrips() {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')
    const [rides, setRides] = useState<Ride[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setPageHeader({
            title: "Live Trips",
            subtitle: "Monitor ongoing trips and real-time trip data"
        })
    }, [setPageHeader])

    // Fetch rides from API
    useEffect(() => {
        fetchRides()
    }, [])

    const fetchRides = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getActiveRides()
            if (response.error) {
                setError(response.error)
            } else if (response.data) {
                setRides(response.data)
            }
        } catch (err) {
            setError('Failed to fetch rides')
            console.error('Error fetching rides:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = () => {
        fetchRides()
    }

    // Helper functions to map API data
    const mapRideStatus = (status: string): string => {
        // Map backend status to frontend status
        const statusMap: { [key: string]: string } = {
            'IN_PROGRESS': 'active',
            'DRIVER_ARRIVED': 'active',
            'ACCEPTED': 'waiting',
            'PENDING': 'waiting',
            'CANCELLED_BY_RIDER': 'cancelled',
            'CANCELLED_BY_DRIVER': 'cancelled',
        }
        return statusMap[status] || status.toLowerCase()
    }

    const getAvatarInitials = (name?: string): string => {
        if (!name) return '??'
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    const calculateDuration = (startedAt?: string | null): string => {
        if (!startedAt) return 'N/A'
        try {
            const start = new Date(startedAt)
            const now = new Date()
            const diffMs = now.getTime() - start.getTime()
            const diffMins = Math.floor(diffMs / 60000)
            if (diffMins < 1) return 'Just now'
            if (diffMins < 60) return `${diffMins} min`
            const hours = Math.floor(diffMins / 60)
            const mins = diffMins % 60
            return `${hours}h ${mins}m`
        } catch {
            return 'N/A'
        }
    }

    const calculateETA = (startedAt?: string | null, estimatedDurationMinutes?: number | null): string => {
        if (!startedAt || !estimatedDurationMinutes) return 'N/A'
        try {
            const start = new Date(startedAt)
            const eta = new Date(start.getTime() + estimatedDurationMinutes * 60000)
            return eta.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        } catch {
            return 'N/A'
        }
    }

    const mapVehicleType = (rideType?: string | null): string => {
        if (!rideType) return 'Regular'
        const typeMap: { [key: string]: string } = {
            'REGULAR': 'Car',
            'SHARED': 'Shared Ride',
            'SCHEDULED': 'Scheduled',
            'PREMIUM': 'Premium Car'
        }
        return typeMap[rideType] || rideType
    }

    const formatPaymentMethod = (status?: string | null): string => {
        if (!status) return 'Cash'
        const statusMap: { [key: string]: string } = {
            'PENDING': 'Cash',
            'COMPLETED': 'Paid',
            'FAILED': 'Failed',
            'REFUNDED': 'Refunded',
            'CASH': 'Cash',
            'CARD': 'Card',
            'WALLET': 'Wallet'
        }
        return statusMap[status] || status
    }

    // Map API rides to frontend format - with null safety checks
    const mappedTrips = rides
        .filter(ride => ride && ride.driverId) // Filter rides that have at least a driver
        .map((ride, index) => ({
            id: ride.readableId || (ride.rideId ? ride.rideId.substring(0, 8) : `TRP-${index}`), // T00001
            fullId: ride.rideId || '',
            driver: {
                name: ride.driverName || 'Unknown Driver',
                id: ride.driverReadableId || (ride.driverId?.substring(0, 8)) || 'N/A', // D00001
                fullId: ride.driverId || '',
                avatar: getAvatarInitials(ride.driverName || undefined),
                location: ride.pickupAddress?.split(',')[0] || 'Unknown'
            },
            riders: [{
                name: ride.riderName || 'Rider',
                id: ride.riderReadableId || (ride.riderId?.substring(0, 8)) || 'N/A', // R00001
                fullId: ride.riderId || '',
                avatar: getAvatarInitials(ride.riderName || undefined),
                pickup: ride.pickupAddress || 'Unknown',
                destination: ride.destinationAddress || 'Unknown',
                status: mapRideStatus(ride.status)
            }],
            mainRoute: {
                start: ride.pickupAddress || 'Unknown Pickup',
                end: ride.destinationAddress || 'Unknown Destination'
            },
            status: mapRideStatus(ride.status),
            duration: calculateDuration(ride.startedAt),
            distance: ride.estimatedDistanceKm ? `${ride.estimatedDistanceKm.toFixed(1)} km` : 'N/A',
            estimatedArrival: calculateETA(ride.startedAt, ride.estimatedDurationMinutes),
            vehicle: {
                type: mapVehicleType(ride.rideType),
                model: ride.vehicleModel || 'Vehicle Details N/A',
                plateNumber: ride.vehicleRegistration || 'N/A'
            },
            totalRiders: ride.maxPassengers || 1,
            baseFare: ride.estimatedFare || 0,
            rating: ride.driverRating,
            paymentMethod: formatPaymentMethod(ride.paymentStatus),
            startTime: ride.requestedAt ? new Date(ride.requestedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'N/A'
        }))

    // Function to calculate dynamic fare based on rider count
    const calculateFare = (baseFare: number, riderCount: number) => {
        return baseFare * riderCount
    }

    const tabs = [
        { name: 'all', label: 'All Trips', count: mappedTrips.length },
        { name: 'active', label: 'Active', count: mappedTrips.filter(t => t.status === 'active').length },
        { name: 'waiting', label: 'Waiting', count: mappedTrips.filter(t => t.status === 'waiting').length },
        { name: 'emergency', label: 'Emergency', count: mappedTrips.filter(t => t.status === 'emergency').length },
        { name: 'delayed', label: 'Delayed', count: mappedTrips.filter(t => t.status === 'delayed').length }
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

    const filteredTrips = mappedTrips.filter(trip => {
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
                            placeholder="Search by trip ID (T00001), driver ID (D00001), rider ID (R00001), route, or start time"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Trip Grid */}
                <div className="w-full">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-12">
                            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                            <span className="ml-3 text-gray-600">Loading live trips...</span>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex justify-center items-center py-12">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                            <span className="ml-3 text-red-600">{error}</span>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && filteredTrips.length === 0 && (
                        <div className="flex flex-col justify-center items-center py-12">
                            <Car className="h-16 w-16 text-gray-400 mb-3" />
                            <span className="text-gray-600 text-lg font-medium">No live trips found</span>
                            <span className="text-gray-500 text-sm mt-1">All rides are either completed or cancelled</span>
                        </div>
                    )}

                    {/* Data Grid */}
                    {!loading && !error && filteredTrips.length > 0 && (
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
                                            <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded font-semibold inline-block">
                                                {trip.id}
                                            </span>
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
                                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
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
                                                            <span className="text-xs text-gray-400">ID:</span>
                                                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
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
                    )}
                </div>
            </div>
        </div>
    )
}
