"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    RefreshCw
} from "lucide-react"

const TripsPayments = () => {
    const [dateRange, setDateRange] = useState("today")
    const [paymentFilter, setPaymentFilter] = useState("all")

    const trips = [
        {
            id: "TRP123456",
            tripDate: "2025-01-27 14:30",
            riderId: "RDR789",
            riderName: "Alice Johnson",
            driverId: "DRV456",
            driverName: "John Smith",
            pickup: "Downtown Mall",
            dropoff: "International Airport",
            distance: "15.2 km",
            duration: "25 min",
            fare: 28.75,
            commission: 4.31,
            driverEarning: 24.44,
            paymentMethod: "Card",
            cardLast4: "4532",
            status: "completed",
            paymentStatus: "paid"
        },
        {
            id: "TRP123457",
            tripDate: "2025-01-27 13:45",
            riderId: "RDR101",
            riderName: "Bob Wilson",
            driverId: "DRV789",
            driverName: "Sarah Davis",
            pickup: "City Mall",
            dropoff: "University Campus",
            distance: "8.5 km",
            duration: "18 min",
            fare: 18.75,
            commission: 2.81,
            driverEarning: 15.94,
            paymentMethod: "Cash",
            cardLast4: null,
            status: "completed",
            paymentStatus: "paid"
        },
        {
            id: "TRP123458",
            tripDate: "2025-01-27 12:20",
            riderId: "RDR234",
            riderName: "Carol Brown",
            driverId: "DRV123",
            driverName: "Mike Johnson",
            pickup: "Grand Hotel",
            dropoff: "Railway Station",
            distance: "12.8 km",
            duration: "22 min",
            fare: 32.80,
            commission: 4.92,
            driverEarning: 27.88,
            paymentMethod: "Card",
            cardLast4: "2345",
            status: "completed",
            paymentStatus: "pending"
        },
        {
            id: "TRP123459",
            tripDate: "2025-01-27 11:15",
            riderId: "RDR567",
            riderName: "David Lee",
            driverId: "DRV456",
            driverName: "John Smith",
            pickup: "Residential Area",
            dropoff: "Business District",
            distance: "6.3 km",
            duration: "15 min",
            fare: 15.25,
            commission: 2.29,
            driverEarning: 12.96,
            paymentMethod: "Cash",
            cardLast4: null,
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
        return status === "paid" ? "text-green-600 bg-green-100" : "text-yellow-600 bg-yellow-100"
    }

    const totalTrips = trips.length
    const totalRevenue = trips.reduce((sum, trip) => sum + trip.fare, 0)
    const totalCommission = trips.reduce((sum, trip) => sum + trip.commission, 0)
    const cashTrips = trips.filter(trip => trip.paymentMethod === "Cash").length
    const cardTrips = trips.filter(trip => trip.paymentMethod === "Card").length

    const filteredTrips = trips.filter(trip => {
        if (paymentFilter === "cash") return trip.paymentMethod === "Cash"
        if (paymentFilter === "card") return trip.paymentMethod === "Card"
        return true
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Trips & Payments</h1>
                    <p className="text-gray-600">Comprehensive view of trips with payment details</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTrips}</div>
                        <p className="text-xs text-muted-foreground">Today</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Gross earnings</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Commission</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalCommission.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Platform fee</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cash Trips</CardTitle>
                        <Banknote className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cashTrips}</div>
                        <p className="text-xs text-muted-foreground">{Math.round((cashTrips / totalTrips) * 100)}% of total</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Card Trips</CardTitle>
                        <CreditCard className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cardTrips}</div>
                        <p className="text-xs text-muted-foreground">{Math.round((cardTrips / totalTrips) * 100)}% of total</p>
                    </CardContent>
                </Card>
            </div>

            {/* Trips Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Trip Payment Details</CardTitle>
                    <CardDescription>Detailed view of trips with payment information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by trip ID, rider, or driver..."
                                className="pl-10"
                            />
                        </div>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-3 py-2 border rounded-md text-sm"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md text-sm"
                        >
                            <option value="all">All Payments</option>
                            <option value="cash">Cash Only</option>
                            <option value="card">Card Only</option>
                        </select>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {filteredTrips.map((trip) => (
                            <div key={trip.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    {/* Trip Info */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                {trip.id}
                                            </span>
                                            <span className="text-xs text-gray-500">{trip.tripDate}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <div>
                                                <p className="font-medium">{trip.pickup}</p>
                                                <p className="text-gray-600">to {trip.dropoff}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                                            <span>{trip.distance}</span>
                                            <span className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {trip.duration}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Participants */}
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                                                    {trip.riderName.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{trip.riderName}</p>
                                                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">
                                                    {trip.riderId}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                                    {trip.driverName.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{trip.driverName}</p>
                                                <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                                                    {trip.driverId}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            {getPaymentIcon(trip.paymentMethod)}
                                            <div>
                                                <p className="text-sm font-medium">{trip.paymentMethod}</p>
                                                {trip.cardLast4 && (
                                                    <p className="text-xs text-gray-600">****{trip.cardLast4}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {getPaymentStatusIcon(trip.paymentStatus)}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(trip.paymentStatus)}`}>
                                                {trip.paymentStatus.charAt(0).toUpperCase() + trip.paymentStatus.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Financial Breakdown */}
                                    <div className="space-y-1 text-right">
                                        <div>
                                            <p className="text-xs text-gray-600">Total Fare</p>
                                            <p className="font-bold text-lg">${trip.fare.toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600">Commission:</span>
                                            <span className="text-green-600">${trip.commission.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600">Driver Earning:</span>
                                            <span className="text-blue-600">${trip.driverEarning.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TripsPayments
