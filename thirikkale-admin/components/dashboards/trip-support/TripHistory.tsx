"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    History,
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
    Calendar,
    DollarSign,
    Star,
    CreditCard
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'
import { getCompletedRides, getCancelledRides, getAllRides, Ride } from '@/lib/api/adminService'

export default function TripHistory() {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')
    const [rides, setRides] = useState<Ride[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setPageHeader({
            title: "Trip History",
            subtitle: "View and analyze completed trip records"
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
            // Fetch all historical rides (completed, cancelled, etc.)
            const response = await getAllRides()
            if (response.error) {
                setError(response.error)
            } else if (response.data) {
                // Filter out active/pending rides, keep only historical ones
                const historicalRides = response.data.filter(ride =>
                    ride.status === 'COMPLETED' ||
                    ride.status === 'CANCELLED_BY_RIDER' ||
                    ride.status === 'CANCELLED_BY_DRIVER' ||
                    ride.status === 'DISPUTED' ||
                    ride.status === 'REFUNDED'
                )
                setRides(historicalRides)
            }
        } catch (err) {
            setError('Failed to fetch trip history')
            console.error('Error fetching trip history:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = () => {
        fetchRides()
    }

    // Helper functions to map API data
    const mapRideStatus = (status: string): string => {
        const statusMap: { [key: string]: string } = {
            'COMPLETED': 'completed',
            'CANCELLED_BY_RIDER': 'cancelled',
            'CANCELLED_BY_DRIVER': 'cancelled',
            'DISPUTED': 'disputed',
            'REFUNDED': 'refunded',
        }
        return statusMap[status] || status.toLowerCase()
    }

    const getAvatarInitials = (name?: string | null): string => {
        if (!name) return '??'
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    const calculateDuration = (startedAt?: string | null, completedAt?: string | null): string => {
        if (!startedAt || !completedAt) return 'N/A'
        try {
            const start = new Date(startedAt)
            const end = new Date(completedAt)
            const diffMs = end.getTime() - start.getTime()
            const diffMins = Math.floor(diffMs / 60000)
            if (diffMins < 1) return 'Less than 1m'
            if (diffMins < 60) return `${diffMins}m`
            const hours = Math.floor(diffMins / 60)
            const mins = diffMins % 60
            return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
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
            'CARD': 'Credit Card',
            'WALLET': 'Digital Wallet'
        }
        return statusMap[status] || status
    }

    const calculateProcessingDelay = (completedAt?: string | null, createdAt?: string | null): string => {
        if (!completedAt || !createdAt) return 'N/A'
        try {
            const end = new Date(completedAt)
            const created = new Date(createdAt)
            const diffMs = created.getTime() - end.getTime()
            const diffMins = Math.floor(diffMs / 60000)
            if (diffMins < 1) return 'Instant'
            if (diffMins < 60) return `${diffMins}m`
            const hours = Math.floor(diffMins / 60)
            const mins = diffMins % 60
            return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
        } catch {
            return 'N/A'
        }
    }

    // Map API rides to frontend format
    const mappedTrips = rides
        .filter(ride => ride && ride.driverId) // Filter rides that have at least a driver
        .map((ride, index) => ({
            id: ride.readableId || (ride.rideId ? ride.rideId.substring(0, 8) : `TRP-${index}`),
            fullId: ride.rideId || '',
            driver: {
                name: ride.driverName || 'Unknown Driver',
                id: ride.driverReadableId || (ride.driverId?.substring(0, 8)) || 'N/A',
                fullId: ride.driverId || '',
                avatar: getAvatarInitials(ride.driverName),
            },
            riders: [{
                name: ride.riderName || 'Rider',
                id: ride.riderReadableId || (ride.riderId?.substring(0, 8)) || 'N/A',
                fullId: ride.riderId || '',
                avatar: getAvatarInitials(ride.riderName),
            }],
            mainRoute: {
                start: ride.pickupAddress || 'Unknown Pickup',
                end: ride.destinationAddress || 'Unknown Destination'
            },
            status: mapRideStatus(ride.status),
            duration: calculateDuration(ride.startedAt, ride.completedAt),
            distance: ride.estimatedDistanceKm ? `${ride.estimatedDistanceKm.toFixed(1)} km` : 'N/A',
            baseFare: ride.finalFare || ride.estimatedFare || 0,
            vehicle: {
                type: mapVehicleType(ride.rideType),
                model: ride.vehicleModel || 'Vehicle Details N/A',
                plateNumber: ride.vehicleRegistration || 'N/A'
            },
            totalRiders: ride.maxPassengers || 1,
            startTime: ride.startedAt ? new Date(ride.startedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'N/A',
            endTime: ride.completedAt ? new Date(ride.completedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'N/A',
            recordCreatedAt: ride.createdAt ? new Date(ride.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'N/A',
            rating: ride.driverRating ? ride.driverRating / 1.0 : null,
            paymentMethod: formatPaymentMethod(ride.paymentStatus),
            cancellationReason: ride.cancellationReason,
            disputeReason: null // Add this field to backend if needed
        }))

    const trips = mappedTrips

    // Function to calculate dynamic fare based on rider count
    const calculateFare = (baseFare: number, riderCount: number) => {
        return baseFare * riderCount
    }

    // Calculate quick stats from real data
    const calculateQuickStats = () => {
        if (trips.length === 0) {
            return {
                totalRevenue: 0,
                avgTripDistance: 0,
                completionRate: 0,
                avgTripDuration: 0
            }
        }

        const completedTrips = trips.filter(t => t.status === 'completed')

        // Total Revenue: Sum of all trip fares (baseFare * totalRiders)
        const totalRevenue = trips.reduce((total, trip) =>
            total + calculateFare(trip.baseFare, trip.totalRiders), 0
        )

        // Average Trip Distance: Average of completed trips with distance data
        const tripsWithDistance = completedTrips.filter(t => {
            const distValue = parseFloat(t.distance)
            return !isNaN(distValue)
        })
        const avgTripDistance = tripsWithDistance.length > 0
            ? tripsWithDistance.reduce((sum, trip) => {
                const distValue = parseFloat(trip.distance)
                return sum + distValue
            }, 0) / tripsWithDistance.length
            : 0

        // Completion Rate: (completed / total) * 100
        const completionRate = trips.length > 0
            ? (completedTrips.length / trips.length) * 100
            : 0

        // Average Trip Duration: Average of completed trips
        const tripsWithDuration = completedTrips.filter(t => t.duration && t.duration !== 'N/A')
        const avgTripDuration = tripsWithDuration.length > 0
            ? tripsWithDuration.reduce((sum, trip) => {
                // Parse duration string (e.g., "2h 15m", "45m", "1h")
                const duration = trip.duration
                let totalMinutes = 0

                const hourMatch = duration.match(/(\d+)h/)
                const minMatch = duration.match(/(\d+)m/)

                if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60
                if (minMatch) totalMinutes += parseInt(minMatch[1])

                return sum + totalMinutes
            }, 0) / tripsWithDuration.length
            : 0

        return {
            totalRevenue: Math.round(totalRevenue),
            avgTripDistance: parseFloat(avgTripDistance.toFixed(1)),
            completionRate: parseFloat(completionRate.toFixed(1)),
            avgTripDuration: Math.round(avgTripDuration)
        }
    }

    const quickStats = calculateQuickStats()

    const tabs = [
        { name: 'all', label: 'All Trips', count: trips.length },
        { name: 'completed', label: 'Completed', count: trips.filter(t => t.status === 'completed').length },
        { name: 'cancelled', label: 'Cancelled', count: trips.filter(t => t.status === 'cancelled').length },
        { name: 'disputed', label: 'Disputed', count: trips.filter(t => t.status === 'disputed').length },
        { name: 'refunded', label: 'Refunded', count: trips.filter(t => t.status === 'refunded').length }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            case 'disputed': return 'bg-yellow-100 text-yellow-800'
            case 'refunded': return 'bg-blue-100 text-blue-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="h-3 w-3" />
            case 'cancelled': return <XCircle className="h-3 w-3" />
            case 'disputed': return <AlertCircle className="h-3 w-3" />
            case 'refunded': return <CheckCircle className="h-3 w-3" />
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
            trip.recordCreatedAt.includes(search)
        return matchesFilter && matchesSearch
    })

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading trip history...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                        <div>
                            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                        <Button
                            onClick={handleRefresh}
                            className="ml-auto bg-red-600 hover:bg-red-700 text-white"
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && trips.length === 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                    <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-gray-800 font-semibold text-lg mb-2">No Trip History</h3>
                    <p className="text-gray-600">There are no historical trips to display.</p>
                </div>
            )}

            {/* Main Content - Only show if data loaded successfully */}
            {!loading && !error && trips.length > 0 && (
                <>
                    {/* Export Data and Quick Stats - Prominent Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Export Data - Enhanced */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-blue-800">Export Data</h3>
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <p className="text-blue-700 text-sm mb-4">Download comprehensive trip history reports and analytics</p>
                            <div className="space-y-3">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                                    <Calendar className="h-5 w-5 mr-3" />
                                    Export to CSV
                                </Button>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
                                    <History className="h-5 w-5 mr-3" />
                                    Generate Report
                                </Button>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                                    <DollarSign className="h-5 w-5 mr-3" />
                                    Revenue Report
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats - Enhanced */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 shadow-lg rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-green-800">Quick Stats</h3>
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                    <span className="text-gray-700 font-medium">Total Revenue:</span>
                                    <span className="font-bold text-xl text-green-600">
                                        LKR {quickStats.totalRevenue.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                    <span className="text-gray-700 font-medium">Avg Trip Distance:</span>
                                    <span className="font-bold text-lg text-blue-600">
                                        {quickStats.avgTripDistance} km
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                    <span className="text-gray-700 font-medium">Completion Rate:</span>
                                    <span className="font-bold text-lg text-green-600">
                                        {quickStats.completionRate}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                    <span className="text-gray-700 font-medium">Avg Trip Duration:</span>
                                    <span className="font-bold text-lg text-purple-600">
                                        {quickStats.avgTripDuration < 60
                                            ? `${quickStats.avgTripDuration} min`
                                            : `${Math.floor(quickStats.avgTripDuration / 60)}h ${quickStats.avgTripDuration % 60}m`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    placeholder="Search by trip ID (T00001), driver ID (D00001), rider ID (R00001), route, or record date"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Button variant="outline" size="sm" onClick={handleRefresh}>
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
                                                <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded font-semibold inline-block">
                                                    {trip.id}
                                                </span>
                                                <p className="text-xs text-gray-500">{trip.recordCreatedAt}</p>
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

                                            {/* Trip Details Column - Card-based Layout */}
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

                                                {/* Key Metrics - Horizontal Cards */}
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                                                        <div className="flex items-center justify-center gap-1 mb-1">
                                                            <DollarSign className="h-3 w-3 text-green-600" />
                                                        </div>
                                                        <div className="text-xs font-bold text-green-700">LKR {calculateFare(trip.baseFare, trip.totalRiders).toLocaleString()}</div>
                                                        <div className="text-xs text-green-600">Total Fare</div>
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

                                                {/* Trip Timeline - Compact with Processing Delay */}
                                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                                                    <div className="flex items-center justify-between text-xs mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <span className="font-medium text-gray-700">{trip.startTime.split(' ')[1]}</span>
                                                        </div>
                                                        <div className="flex-1 mx-2">
                                                            <div className="border-t border-gray-300"></div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-gray-700">{trip.endTime.split(' ')[1]}</span>
                                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    {/* Processing Delay Indicator */}
                                                    <div className="border-t border-gray-300 pt-2">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-gray-500">Processing Delay:</span>
                                                            <span className={`font-semibold px-2 py-1 rounded ${calculateProcessingDelay(trip.endTime, trip.recordCreatedAt) === 'Instant'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-orange-100 text-orange-700'
                                                                }`}>
                                                                {calculateProcessingDelay(trip.endTime, trip.recordCreatedAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment & Rating - Inline */}
                                                <div className="flex items-center justify-between">
                                                    <div className="bg-purple-50 border border-purple-200 rounded-md px-2 py-1 flex items-center gap-1">
                                                        <CreditCard className="h-3 w-3 text-purple-600" />
                                                        <span className="text-xs font-medium text-purple-700">{trip.paymentMethod}</span>
                                                    </div>
                                                    {trip.rating && (
                                                        <div className="bg-yellow-50 border border-yellow-200 rounded-md px-2 py-1 flex items-center gap-1">
                                                            <Star className="h-3 w-3 text-yellow-600 fill-current" />
                                                            <span className="text-xs font-bold text-yellow-700">{trip.rating}/5</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Status Issues - Compact Alert */}
                                                {(trip.cancellationReason || trip.disputeReason) && (
                                                    <div className="bg-orange-50 border-l-4 border-orange-400 rounded-r-md p-2">
                                                        <div className="flex items-center gap-2">
                                                            <AlertCircle className="h-3 w-3 text-orange-600" />
                                                            <div className="text-xs text-orange-700">
                                                                {trip.cancellationReason && (
                                                                    <span><strong>Cancelled:</strong> {trip.cancellationReason}</span>
                                                                )}
                                                                {trip.disputeReason && (
                                                                    <span><strong>Dispute:</strong> {trip.disputeReason}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
