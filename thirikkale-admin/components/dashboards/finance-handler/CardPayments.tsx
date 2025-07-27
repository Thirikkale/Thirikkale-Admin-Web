"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    CreditCard,
    Search,
    Filter,
    Download,
    TrendingUp,
    Calendar,
    RefreshCw,
    CheckCircle,
    Clock,
    AlertCircle,
    User
} from "lucide-react"
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

const CardTransactions = () => {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setPageHeader({
            title: "Card Payments",
            subtitle: "Monitor and manage card payment transactions"
        })
    }, [setPageHeader])

    const transactions = [
        {
            id: "CARD001",
            tripId: "TRP-001",
            riderId: "RDR789",
            riderName: "Sarah Johnson",
            driverId: "DRV456",
            driverName: "John Silva",
            amount: 2550.00,
            commission: 383.00,
            driverEarning: 2167.00,
            timestamp: "2025-01-27 14:30",
            status: "completed",
            location: "Downtown to Airport",
            cardType: "Visa",
            cardLast4: "1234",
            paymentStatus: "processed",
            transactionId: "TXN_CARD_001"
        },
        {
            id: "CARD002",
            tripId: "TRP-002",
            riderId: "RDR101",
            riderName: "Michael Brown",
            driverId: "DRV789",
            driverName: "Amal Perera",
            amount: 1875.00,
            commission: 281.00,
            driverEarning: 1594.00,
            timestamp: "2025-01-27 13:45",
            status: "completed",
            location: "Mall to University",
            cardType: "Mastercard",
            cardLast4: "5678",
            paymentStatus: "processed",
            transactionId: "TXN_CARD_002"
        },
        {
            id: "CARD003",
            tripId: "TRP-003",
            riderId: "RDR234",
            riderName: "Emma Wilson",
            driverId: "DRV123",
            driverName: "Nimal Fernando",
            amount: 3280.00,
            commission: 492.00,
            driverEarning: 2788.00,
            timestamp: "2025-01-27 12:20",
            status: "pending",
            location: "Hotel to Station",
            cardType: "Visa",
            cardLast4: "9012",
            paymentStatus: "pending",
            transactionId: "TXN_CARD_003"
        },
        {
            id: "CARD004",
            tripId: "TRP-004",
            riderId: "RDR567",
            riderName: "David Smith",
            driverId: "DRV456",
            driverName: "John Silva",
            amount: 1525.00,
            commission: 229.00,
            driverEarning: 1296.00,
            timestamp: "2025-01-27 11:15",
            status: "disputed",
            location: "Home to Office",
            cardType: "American Express",
            cardLast4: "3456",
            paymentStatus: "disputed",
            transactionId: "TXN_CARD_004"
        },
        {
            id: "CARD005",
            tripId: "TRP-005",
            riderId: "RDR890",
            riderName: "Lisa Wong",
            driverId: "DRV200",
            driverName: "Kamal Rajapakse",
            amount: 2840.00,
            commission: 426.00,
            driverEarning: 2414.00,
            timestamp: "2025-01-27 10:30",
            status: "processing",
            location: "Airport to Hotel",
            cardType: "Visa",
            cardLast4: "7890",
            paymentStatus: "processing",
            transactionId: "TXN_CARD_005"
        }
    ]

    const tabs = [
        { name: 'all', label: 'All Payments', count: transactions.length },
        { name: 'completed', label: 'Completed', count: transactions.filter(t => t.status === 'completed').length },
        { name: 'pending', label: 'Pending', count: transactions.filter(t => t.status === 'pending').length },
        { name: 'processing', label: 'Processing', count: transactions.filter(t => t.status === 'processing').length },
        { name: 'disputed', label: 'Disputed', count: transactions.filter(t => t.status === 'disputed').length }
    ]

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

    const filteredTransactions = transactions.filter(transaction => {
        const matchesFilter = activeTab === 'all' || transaction.status === activeTab
        const matchesSearch = transaction.id.toLowerCase().includes(search.toLowerCase()) ||
            transaction.tripId.toLowerCase().includes(search.toLowerCase()) ||
            transaction.riderName.toLowerCase().includes(search.toLowerCase()) ||
            transaction.driverName.toLowerCase().includes(search.toLowerCase()) ||
            transaction.location.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const totalCardToday = transactions.reduce((sum, t) => sum + t.amount, 0)
    const totalCommission = transactions.reduce((sum, t) => sum + t.commission, 0)
    const totalDriverEarnings = transactions.reduce((sum, t) => sum + t.driverEarning, 0)

    const metrics = {
        totalCard: {
            value: `LKR ${totalCardToday.toLocaleString()}`,
            change: '+12.5%',
            trend: 'up',
            period: 'from yesterday'
        },
        commission: {
            value: `LKR ${totalCommission.toLocaleString()}`,
            change: '+8.2%',
            trend: 'up',
            period: '15% avg rate'
        },
        driverEarnings: {
            value: `LKR ${totalDriverEarnings.toLocaleString()}`,
            change: '+10.1%',
            trend: 'up',
            period: '85% of total'
        },
        transactions: {
            value: transactions.length.toString(),
            change: '+15.3%',
            trend: 'up',
            period: 'today'
        }
    }

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
                {/* Total Card */}
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TOTAL CARD TODAY</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalCard.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.totalCard.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalCard.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                <CreditCard className="h-6 w-6 text-white" />
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

                {/* Driver Earnings */}
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">DRIVER EARNINGS</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                </Card>

                {/* Transactions Count */}
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TRANSACTIONS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.transactions.value}</div>
                                <div className="flex gap-1 items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{metrics.transactions.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.transactions.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table with Tabs */}
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
                                placeholder="Search by transaction ID, trip ID, rider, driver, or location..."
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

                {/* Transactions Grid */}
                <div className="w-full">
                    {/* Table Header */}
                    <div className="bg-gray-100 border-b-2 border-gray-300">
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '1fr 0.7fr 0.9fr 1.1fr 1.1fr 1.1fr 0.8fr 0.8fr' }}>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction ID</div>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trip ID</div>
                            <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Card Details</div>
                            <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Trip Amount</div>
                            <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Commission (15%)</div>
                            <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Payable to Driver</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    {filteredTransactions.map((transaction) => (
                        <div key={transaction.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                            <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '1fr 0.7fr 0.9fr 1.1fr 1.1fr 1.1fr 0.8fr 0.8fr' }}>
                                {/* Transaction ID Column */}
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-gray-900">{transaction.id}</p>
                                    <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                                </div>

                                {/* Trip ID Column */}
                                <div className="space-y-2">
                                    <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded font-medium">
                                        {transaction.tripId}
                                    </span>
                                </div>

                                {/* Card Details Column */}
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-700">{transaction.cardType}</span>
                                        <span className="text-xs text-gray-500">****{transaction.cardLast4}</span>
                                    </div>
                                </div>

                                {/* Trip Amount Column */}
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-900">LKR {transaction.amount.toLocaleString()}</div>
                                </div>

                                {/* Commission Column */}
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-green-700">LKR {transaction.commission.toLocaleString()}</div>
                                </div>

                                {/* Payable to Driver Column */}
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-blue-700">LKR {transaction.driverEarning.toLocaleString()}</div>
                                </div>

                                {/* Status Column */}
                                <div className="flex justify-center">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(transaction.status)}`}>
                                        {getStatusIcon(transaction.status)}
                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                    </span>
                                </div>

                                {/* Actions Column */}
                                <div className="flex flex-col space-y-1 items-center">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-full">
                                        View
                                    </button>
                                    {transaction.status === 'disputed' && (
                                        <button className="text-red-600 hover:text-red-800 text-xs font-medium px-3 py-1 rounded-md border border-red-300 hover:bg-red-50 transition-colors w-full">
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-12">
                            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No transactions found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardTransactions
