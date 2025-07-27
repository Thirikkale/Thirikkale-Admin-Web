"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Car,
    Search,
    Filter,
    Download,
    MapPin,
    Clock,
    DollarSign,
    CreditCard,
    Banknote,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    TrendingUp,
    User,
    // Calendar
} from "lucide-react"
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

const TripsPayments = () => {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setPageHeader({
            title: "Trips & Payments",
            subtitle: "Comprehensive view of completed trips with payment details"
        })
    }, [setPageHeader])

    const trips = [
        {
            id: "TRP-001",
            tripDate: "2025-01-27 14:30",
            riderId: "RDR789",
            riderName: "Sarah Johnson",
            riderAvatar: "SJ",
            driverId: "DRV456",
            driverName: "John Silva",
            driverAvatar: "JS",
            pickup: "Colombo Fort",
            dropoff: "Bandaranaike Airport",
            distance: "32.4 km",
            duration: "45 min",
            fare: 2550.00, // LKR
            commission: 383.00, // 15%
            driverEarning: 2167.00,
            paymentMethod: "Card",
            cardType: "Visa",
            cardLast4: "1234",
            status: "completed",
            paymentStatus: "paid"
        },
        {
            id: "TRP-002",
            tripDate: "2025-01-27 13:45",
            riderId: "RDR101",
            riderName: "Michael Brown",
            riderAvatar: "MB",
            driverId: "DRV789",
            driverName: "Amal Perera",
            driverAvatar: "AP",
            pickup: "Galle Face Green",
            dropoff: "University of Colombo",
            distance: "8.5 km",
            duration: "18 min",
            fare: 1875.00,
            commission: 281.00,
            driverEarning: 1594.00,
            paymentMethod: "Cash",
            cardType: null,
            cardLast4: null,
            status: "completed",
            paymentStatus: "paid"
        },
        {
            id: "TRP-003",
            tripDate: "2025-01-27 12:20",
            riderId: "RDR234",
            riderName: "Emma Wilson",
            riderAvatar: "EW",
            driverId: "DRV123",
            driverName: "Nimal Fernando",
            driverAvatar: "NF",
            pickup: "Mount Lavinia Hotel",
            dropoff: "Colombo Railway Station",
            distance: "12.8 km",
            duration: "22 min",
            fare: 3280.00,
            commission: 492.00,
            driverEarning: 2788.00,
            paymentMethod: "Card",
            cardType: "Mastercard",
            cardLast4: "5678",
            status: "completed",
            paymentStatus: "pending"
        },
        {
            id: "TRP-004",
            tripDate: "2025-01-27 11:15",
            riderId: "RDR567",
            riderName: "David Smith",
            riderAvatar: "DS",
            driverId: "DRV456",
            driverName: "John Silva",
            driverAvatar: "JS",
            pickup: "Nugegoda Junction",
            dropoff: "World Trade Center",
            distance: "15.3 km",
            duration: "25 min",
            fare: 1525.00,
            commission: 229.00,
            driverEarning: 1296.00,
            paymentMethod: "Cash",
            cardType: null,
            cardLast4: null,
            status: "completed",
            paymentStatus: "paid"
        },
        {
            id: "TRP-005",
            tripDate: "2025-01-27 10:30",
            riderId: "RDR890",
            riderName: "Lisa Wong",
            riderAvatar: "LW",
            driverId: "DRV200",
            driverName: "Kamal Rajapakse",
            driverAvatar: "KR",
            pickup: "Dehiwala Zoo",
            dropoff: "Independence Square",
            distance: "18.7 km",
            duration: "35 min",
            fare: 2840.00,
            commission: 426.00,
            driverEarning: 2414.00,
            paymentMethod: "Card",
            cardType: "American Express",
            cardLast4: "9012",
            status: "completed",
            paymentStatus: "paid"
        }
    ]

    const getPaymentIcon = (method: string) => {
        return method === "Card" ? <CreditCard className="h-4 w-4" /> : <Banknote className="h-4 w-4" />
    }

    const getPaymentStatusIcon = (status: string) => {
        return status === "paid" ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-yellow-600" />
    }

    const getPaymentStatusColor = (status: string) => {
        return status === "paid" ? "bg-green-100 text-green-800 border border-green-200" : "bg-yellow-100 text-yellow-800 border border-yellow-200"
    }

    const tabs = [
        { name: 'all', label: 'All Trips', count: trips.length },
        { name: 'card', label: 'Card Payments', count: trips.filter(t => t.paymentMethod === 'Card').length },
        { name: 'cash', label: 'Cash Payments', count: trips.filter(t => t.paymentMethod === 'Cash').length },
        { name: 'paid', label: 'Paid', count: trips.filter(t => t.paymentStatus === 'paid').length },
        { name: 'pending', label: 'Pending', count: trips.filter(t => t.paymentStatus === 'pending').length }
    ]

    // Calculate metrics
    const totalTrips = trips.length
    const totalRevenue = trips.reduce((sum, trip) => sum + trip.fare, 0)
    const totalCommission = trips.reduce((sum, trip) => sum + trip.commission, 0)
    const totalDriverEarnings = trips.reduce((sum, trip) => sum + trip.driverEarning, 0)
    // const cashTrips = trips.filter(trip => trip.paymentMethod === "Cash").length
    // const cardTrips = trips.filter(trip => trip.paymentMethod === "Card").length

    const metrics = {
        totalTrips: {
            value: totalTrips.toString(),
            change: '+12.5%',
            period: 'today'
        },
        totalRevenue: {
            value: `LKR ${totalRevenue.toLocaleString()}`,
            change: '+15.2%',
            period: 'gross earnings'
        },
        commission: {
            value: `LKR ${totalCommission.toLocaleString()}`,
            change: '+8.3%',
            period: 'platform fee'
        },
        driverEarnings: {
            value: `LKR ${totalDriverEarnings.toLocaleString()}`,
            change: '+18.7%',
            period: 'driver payments'
        }
    }

    const filteredTrips = trips.filter(trip => {
        const matchesFilter = activeTab === 'all' ||
            (activeTab === 'card' && trip.paymentMethod === 'Card') ||
            (activeTab === 'cash' && trip.paymentMethod === 'Cash') ||
            (activeTab === 'paid' && trip.paymentStatus === 'paid') ||
            (activeTab === 'pending' && trip.paymentStatus === 'pending')

        const matchesSearch = trip.id.toLowerCase().includes(search.toLowerCase()) ||
            trip.riderName.toLowerCase().includes(search.toLowerCase()) ||
            trip.driverName.toLowerCase().includes(search.toLowerCase()) ||
            trip.pickup.toLowerCase().includes(search.toLowerCase()) ||
            trip.dropoff.toLowerCase().includes(search.toLowerCase())

        return matchesFilter && matchesSearch
    })

    return (
        <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
                <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Trips */}
                <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group rounded-lg">
                    <div className="flex justify-between pb-2 p-6">
                        <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TOTAL TRIPS</h3>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalTrips.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.totalTrips.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalTrips.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <Car className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group rounded-lg">
                    <div className="flex justify-between pb-2 p-6">
                        <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TOTAL REVENUE</h3>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalRevenue.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.totalRevenue.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalRevenue.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Commission */}
                <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group rounded-lg">
                    <div className="flex justify-between pb-2 p-6">
                        <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-800">COMMISSION</h3>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.commission.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.commission.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.commission.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Driver Earnings */}
                <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group rounded-lg">
                    <div className="flex justify-between pb-2 p-6">
                        <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-800">DRIVER EARNINGS</h3>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.driverEarnings.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.driverEarnings.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.driverEarnings.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                <User className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trips Table with Tabs */}
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

                {/* Search and Filter */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by trip ID, rider, driver, pickup, or dropoff..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Trips Grid */}
                <div className="w-full">
                    <div className="bg-gray-100 border-b-2 border-gray-300">
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '0.8fr 1.2fr 1.2fr 2.5fr 1fr 0.8fr' }}>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trip ID</div>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rider</div>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Driver</div>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trip Details</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Payment</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {filteredTrips.map((trip) => (
                        <div key={trip.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                            <div className="grid gap-4 px-6 py-4 items-start" style={{ gridTemplateColumns: '0.8fr 1.2fr 1.2fr 2.5fr 1fr 0.8fr' }}>
                                {/* Trip ID Column */}
                                <div className="space-y-1">
                                    <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded font-medium">
                                        {trip.id}
                                    </span>
                                </div>

                                {/* Rider Column */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium border border-green-300">
                                            {trip.riderAvatar}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{trip.riderName}</p>
                                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                                            {trip.riderId}
                                        </span>
                                    </div>
                                </div>

                                {/* Driver Column */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border border-blue-300">
                                            {trip.driverAvatar}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{trip.driverName}</p>
                                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                            {trip.driverId}
                                        </span>
                                    </div>
                                </div>

                                {/* Trip Details Column */}
                                <div className="space-y-3">
                                    {/* Route Display */}
                                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <span className="text-xs font-semibold text-gray-800">{trip.pickup}</span>
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
                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <span className="text-xs font-semibold text-gray-800">{trip.dropoff}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Metrics */}
                                    <div className="grid grid-cols-3 gap-2">
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
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <DollarSign className="h-3 w-3 text-green-600" />
                                            </div>
                                            <div className="text-xs font-bold text-green-700">LKR {trip.fare.toLocaleString()}</div>
                                            <div className="text-xs text-green-600">Total Fare</div>
                                        </div>
                                    </div>

                                    {/* Financial Breakdown */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-600">Commission (15%):</span>
                                                <span className="font-medium text-orange-600">LKR {trip.commission.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-600">Driver Earning:</span>
                                                <span className="font-medium text-blue-600">LKR {trip.driverEarning.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Column */}
                                <div className="space-y-3">
                                    {/* Payment Method */}
                                    <div className="flex items-center justify-center">
                                        <div className="bg-purple-50 border border-purple-200 rounded-md px-3 py-2 flex items-center gap-2">
                                            {getPaymentIcon(trip.paymentMethod)}
                                            <div className="flex flex-col items-center">
                                                <span className="text-xs font-medium text-purple-700">{trip.paymentMethod}</span>
                                                {trip.cardLast4 && (
                                                    <span className="text-xs text-gray-500">****{trip.cardLast4}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Status */}
                                    <div className="flex justify-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getPaymentStatusColor(trip.paymentStatus)}`}>
                                            {getPaymentStatusIcon(trip.paymentStatus)}
                                            {trip.paymentStatus.charAt(0).toUpperCase() + trip.paymentStatus.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions Column */}
                                <div className="flex flex-col space-y-1 items-center">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-full">
                                        View
                                    </button>
                                    <button className="text-green-600 hover:text-green-800 text-xs font-medium px-3 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors w-full">
                                        Receipt
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredTrips.length === 0 && (
                        <div className="text-center py-12">
                            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No trips found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TripsPayments
