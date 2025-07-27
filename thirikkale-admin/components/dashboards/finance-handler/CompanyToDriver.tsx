"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Search,
    Filter,
    Download,
    Clock,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    User,
    Calendar,
    RefreshCw,
    Banknote,
    RefreshCw as RefreshIcon
} from "lucide-react"

const CompanyToDriverPayouts = () => {
    // Mock payouts with cash/card breakdown
    const payouts = [
        {
            id: "PAY001",
            driverId: "DRV123",
            driverName: "John Smith",
            driverAvatar: "/avatars/driver1.jpg",
            period: "Week 1, Jan 2025",
            status: "completed",
            paymentDate: "2025-01-07",
            trips: 45,
            cash: 500.00,
            card: 3000.00,
            commission: 367.61
        },
        {
            id: "PAY002",
            driverId: "DRV456",
            driverName: "Sarah Johnson",
            driverAvatar: "/avatars/driver2.jpg",
            period: "Week 1, Jan 2025",
            status: "pending",
            paymentDate: "2025-01-08",
            trips: 32,
            cash: 300.00,
            card: 2200.00,
            commission: 283.58
        },
        {
            id: "PAY003",
            driverId: "DRV789",
            driverName: "Mike Davis",
            driverAvatar: "/avatars/driver3.jpg",
            period: "Week 1, Jan 2025",
            status: "processing",
            paymentDate: "2025-01-08",
            trips: 58,
            cash: 700.00,
            card: 4000.00,
            commission: 480.04
        },
        {
            id: "PAY004",
            driverId: "DRV101",
            driverName: "Emma Wilson",
            driverAvatar: "/avatars/driver4.jpg",
            period: "Week 1, Jan 2025",
            status: "completed",
            paymentDate: "2025-01-06",
            trips: 28,
            cash: 200.00,
            card: 1800.00,
            commission: 248.22
        }
    ]

    // Status helpers
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 border border-green-200'
            case 'pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            case 'processing': return 'bg-blue-100 text-blue-800 border border-blue-200'
            case 'disputed': return 'bg-red-100 text-red-800 border border-red-200'
            default: return 'bg-gray-100 text-gray-800 border border-gray-200'
        }
    }
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="h-3 w-3" />
            case 'pending': return <Clock className="h-3 w-3" />
            case 'processing': return <RefreshCw className="h-3 w-3" />
            case 'disputed': return <AlertCircle className="h-3 w-3" />
            default: return <CheckCircle className="h-3 w-3" />
        }
    }


    // Calculate Amount to Pay for each payout
    const payoutsWithAmount = payouts.map(p => ({
        ...p,
        amountToPay: p.card - p.commission - p.cash
    }))

    // Tabs
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')
    const tabs = [
        { name: 'all', label: 'All Payouts', count: payoutsWithAmount.length },
        { name: 'completed', label: 'Completed', count: payoutsWithAmount.filter(p => p.status === 'completed').length },
        { name: 'pending', label: 'Pending', count: payoutsWithAmount.filter(p => p.status === 'pending').length },
        { name: 'processing', label: 'Processing', count: payoutsWithAmount.filter(p => p.status === 'processing').length },
        { name: 'disputed', label: 'Disputed', count: payoutsWithAmount.filter(p => p.status === 'disputed').length }
    ]

    const filteredPayouts = payoutsWithAmount.filter(payout => {
        const matchesFilter = activeTab === 'all' || payout.status === activeTab
        const matchesSearch = payout.id.toLowerCase().includes(search.toLowerCase()) ||
            payout.driverName.toLowerCase().includes(search.toLowerCase()) ||
            payout.driverId.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    // Metrics
    const totalAmountToPay = payoutsWithAmount.reduce((sum, p) => sum + p.amountToPay, 0)
    const totalCommission = payoutsWithAmount.reduce((sum, p) => sum + p.commission, 0)
    const totalCard = payoutsWithAmount.reduce((sum, p) => sum + p.card, 0)
    const totalCash = payoutsWithAmount.reduce((sum, p) => sum + p.cash, 0)
    const completedCount = payoutsWithAmount.filter(p => p.status === 'completed').length
    const pendingCount = payoutsWithAmount.filter(p => p.status === 'pending' || p.status === 'processing').length

    const metrics = {
        totalAmountToPay: {
            value: `LKR ${totalAmountToPay.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+10.2%',
            trend: 'up',
            period: 'this week'
        },
        commission: {
            value: `LKR ${totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+7.8%',
            trend: 'up',
            period: '15% avg rate'
        },
        card: {
            value: `LKR ${totalCard.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+12.1%',
            trend: 'up',
            period: 'card payments'
        },
        cash: {
            value: `LKR ${totalCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+5.4%',
            trend: 'up',
            period: 'cash payments'
        },
        payouts: {
            value: payoutsWithAmount.length.toString(),
            change: '+8.3%',
            trend: 'up',
            period: 'this week'
        },
        completed: {
            value: completedCount.toString(),
            change: `${Math.round((completedCount / payoutsWithAmount.length) * 100)}%`,
            trend: 'neutral',
            period: 'success rate'
        },
        pending: {
            value: pendingCount.toString(),
            change: pendingCount > 0 ? 'Needs attention' : 'All clear',
            trend: pendingCount > 0 ? 'down' : 'up',
            period: 'processing'
        }
    }

    return (
        <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" size="sm">
                    <RefreshIcon className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
                <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Amount to Pay */}
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TOTAL AMOUNT TO PAY</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalAmountToPay.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.totalAmountToPay.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalAmountToPay.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                <Banknote className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Commission */}
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">COMMISSION</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.commission.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.commission.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.commission.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card Payments */}
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">CARD PAYMENTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.card.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.card.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.card.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                <User className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cash Payments */}
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">CASH PAYMENTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.cash.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.cash.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.cash.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payouts Table with Tabs */}
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
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by payout ID, driver name, or driver ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Payouts Grid */}
                <div className="w-full">
                    {/* Table Header */}
                    <div className="bg-gray-100 border-b-2 border-gray-300">
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '0.7fr 1.5fr 1fr 0.5fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr' }}>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payout ID</div>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Driver</div>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Period</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Trips</div>
                            <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Cash</div>
                            <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Card</div>
                            <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Commission</div>
                            <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Amount to Pay</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    {filteredPayouts.map((payout) => (
                        <div key={payout.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                            <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '0.7fr 1.5fr 1fr 0.5fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr' }}>
                                {/* Payout ID */}
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-blue-700">{payout.id}</p>
                                    <p className="text-xs text-gray-500">{payout.paymentDate}</p>
                                </div>
                                {/* Driver */}
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={payout.driverAvatar} />
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            {payout.driverName.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{payout.driverName}</div>
                                        <div className="text-xs text-blue-600">{payout.driverId}</div>
                                    </div>
                                </div>
                                {/* Period */}
                                <div className="text-xs text-gray-700">{payout.period}</div>
                                {/* Trips */}
                                <div className="text-center text-xs">{payout.trips}</div>
                                {/* Cash */}
                                <div className="text-right text-xs text-green-700">LKR {payout.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                {/* Card */}
                                <div className="text-right text-xs text-purple-700">LKR {payout.card.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                {/* Commission */}
                                <div className="text-right text-xs text-orange-700">LKR {payout.commission.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                {/* Amount to Pay */}
                                <div className="text-right text-xs font-bold text-blue-900">LKR {payout.amountToPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                {/* Status */}
                                <div className="flex justify-center">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(payout.status)}`}>
                                        {getStatusIcon(payout.status)}
                                        {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                                    </span>
                                </div>
                                {/* Actions */}
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

                    {filteredPayouts.length === 0 && (
                        <div className="text-center py-12">
                            <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No payouts found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompanyToDriverPayouts
