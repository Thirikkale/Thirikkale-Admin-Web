"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DollarSign,
    Search,
    Filter,
    Download,
    Clock,
    CheckCircle,
    AlertCircle,
    Car
} from "lucide-react"

const DriverPayouts = () => {
    const payouts = [
        {
            id: "PAY001",
            driverId: "DRV123",
            driverName: "John Smith",
            driverAvatar: "/avatars/driver1.jpg",
            amount: 2450.75,
            period: "Week 1, Jan 2025",
            status: "completed",
            paymentDate: "2025-01-07",
            trips: 45,
            commission: 367.61
        },
        {
            id: "PAY002",
            driverId: "DRV456",
            driverName: "Sarah Johnson",
            driverAvatar: "/avatars/driver2.jpg",
            amount: 1890.50,
            period: "Week 1, Jan 2025",
            status: "pending",
            paymentDate: "2025-01-08",
            trips: 32,
            commission: 283.58
        },
        {
            id: "PAY003",
            driverId: "DRV789",
            driverName: "Mike Davis",
            driverAvatar: "/avatars/driver3.jpg",
            amount: 3200.25,
            period: "Week 1, Jan 2025",
            status: "processing",
            paymentDate: "2025-01-08",
            trips: 58,
            commission: 480.04
        },
        {
            id: "PAY004",
            driverId: "DRV101",
            driverName: "Emma Wilson",
            driverAvatar: "/avatars/driver4.jpg",
            amount: 1654.80,
            period: "Week 1, Jan 2025",
            status: "completed",
            paymentDate: "2025-01-06",
            trips: 28,
            commission: 248.22
        }
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-600" />
            case 'processing':
                return <AlertCircle className="h-4 w-4 text-blue-600" />
            default:
                return <Clock className="h-4 w-4 text-gray-600" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-100'
            case 'pending':
                return 'text-yellow-600 bg-yellow-100'
            case 'processing':
                return 'text-blue-600 bg-blue-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    const totalPayouts = payouts.reduce((sum, payout) => sum + payout.amount, 0)
    const completedPayouts = payouts.filter(p => p.status === 'completed').length
    const pendingPayouts = payouts.filter(p => p.status === 'pending').length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Driver Payouts</h1>
                    <p className="text-gray-600">Manage and track driver payment distributions</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button size="sm">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Process Payments
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalPayouts.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">This week</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedPayouts}</div>
                        <p className="text-xs text-muted-foreground">Payments processed</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingPayouts}</div>
                        <p className="text-xs text-muted-foreground">Awaiting payment</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{payouts.length}</div>
                        <p className="text-xs text-muted-foreground">This period</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardHeader>
                    <CardTitle>Driver Payouts</CardTitle>
                    <CardDescription>View and manage weekly driver payment distributions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by driver name or ID..."
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>

                    {/* Payouts Table */}
                    <div className="space-y-4">
                        {payouts.map((payout) => (
                            <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={payout.driverAvatar} />
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            {payout.driverName.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h4 className="font-medium text-gray-900">{payout.driverName}</h4>
                                            <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                                                {payout.driverId}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{payout.period}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Trips</p>
                                        <p className="font-medium">{payout.trips}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Commission</p>
                                        <p className="font-medium">${payout.commission}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Payout Amount</p>
                                        <p className="font-bold text-lg">${payout.amount}</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(payout.status)}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Payment Date</p>
                                        <p className="font-medium">{payout.paymentDate}</p>
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

export default DriverPayouts
