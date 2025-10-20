"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Banknote,
    Search,
    Filter,
    Download,
    TrendingUp,
    Calendar,
    RefreshCw,
    CheckCircle,
    Clock,
    AlertCircle,
    User,
    Loader2
} from "lucide-react"
import { usePageHeader } from '@/components/providers/PageHeaderProvider'
import { getAllPayments, Payment } from '@/lib/api/adminService'

interface CashTransaction {
    id: string
    readableId?: string // P00001 - for display
    tripId: string
    tripReadableId?: string // T00001 - for display
    riderId: string
    riderReadableId?: string // R00001 - for display
    riderName: string
    driverId: string
    driverReadableId?: string // D00001 - for display
    driverName: string
    amount: number
    commission: number
    driverEarning: number
    timestamp: string
    status: string
    location: string
    paymentStatus: string
    verificationStatus: string
    paymentMethod: string
}

const CashTransactions = () => {
    const { setPageHeader } = usePageHeader()
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')
    const [transactions, setTransactions] = useState<CashTransaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setPageHeader({
            title: "Cash Payments",
            subtitle: "Monitor and manage cash payment transactions"
        })
    }, [setPageHeader])

    // Fetch payments from database
    const fetchCashPayments = async () => {
        try {
            setLoading(true)
            setError(null)

            console.log('Fetching all payments from database...')

            // Get all payments
            const paymentsResponse = await getAllPayments()

            if (paymentsResponse.error || !paymentsResponse.data) {
                throw new Error(paymentsResponse.error || 'Failed to fetch payments')
            }

            const allPayments = paymentsResponse.data
            console.log('Total payments fetched:', allPayments.length)

            // Filter only CASH payments
            const cashPayments = allPayments.filter(payment => payment.paymentMethod === 'CASH')
            console.log('Cash payments found:', cashPayments.length)

            // Map payments to transactions
            const mappedTransactions: CashTransaction[] = cashPayments.map((payment: Payment) => {
                const amount = payment.amount || 0
                const platformFee = payment.platformFee || 0
                const driverEarnings = payment.driverEarnings || 0

                // Map payment status to transaction status
                let transactionStatus = 'pending'
                if (payment.status === 'COMPLETED') transactionStatus = 'completed'
                else if (payment.status === 'PROCESSING') transactionStatus = 'processing'
                else if (payment.status === 'FAILED') transactionStatus = 'disputed'
                else if (payment.status === 'PENDING') transactionStatus = 'pending'

                return {
                    id: payment.paymentId,
                    readableId: payment.readableId, // P00001
                    tripId: payment.rideId,
                    tripReadableId: payment.rideReadableId, // T00001
                    riderId: payment.riderId || 'N/A',
                    riderReadableId: payment.riderReadableId, // R00001
                    riderName: 'Rider', // We'll need to fetch rider details separately if needed
                    driverId: payment.driverId || 'N/A',
                    driverReadableId: payment.driverReadableId, // D00001
                    driverName: 'Driver', // We'll need to fetch driver details separately if needed
                    amount: Number(amount),
                    commission: Number(platformFee),
                    driverEarning: Number(driverEarnings),
                    timestamp: payment.createdAt || new Date().toISOString(),
                    status: transactionStatus,
                    location: 'Trip Location', // This would need to come from ride details
                    paymentStatus: payment.status.toLowerCase(),
                    verificationStatus: payment.status === 'COMPLETED' ? 'verified' : 'pending',
                    paymentMethod: payment.paymentMethod
                }
            })

            console.log('Mapped transactions:', mappedTransactions)
            setTransactions(mappedTransactions)

        } catch (err) {
            console.error('Error fetching cash payments:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch cash payments')
        } finally {
            setLoading(false)
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        fetchCashPayments()
    }, [])

    // Refresh handler
    const handleRefresh = () => {
        fetchCashPayments()
    }

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
        const matchesSearch =
            (transaction.readableId && transaction.readableId.toLowerCase().includes(search.toLowerCase())) ||
            transaction.id.toLowerCase().includes(search.toLowerCase()) ||
            (transaction.tripReadableId && transaction.tripReadableId.toLowerCase().includes(search.toLowerCase())) ||
            transaction.tripId.toLowerCase().includes(search.toLowerCase()) ||
            transaction.riderName.toLowerCase().includes(search.toLowerCase()) ||
            transaction.driverName.toLowerCase().includes(search.toLowerCase()) ||
            transaction.location.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const totalCashToday = transactions.reduce((sum, t) => sum + t.amount, 0)
    const totalCommission = transactions.reduce((sum, t) => sum + t.commission, 0)
    const totalDriverEarnings = transactions.reduce((sum, t) => sum + t.driverEarning, 0)
    const completedCount = transactions.filter(t => t.status === 'completed').length
    const pendingCount = transactions.filter(t => t.status === 'pending' || t.status === 'processing').length

    const metrics = {
        totalCash: {
            value: `LKR ${totalCashToday.toLocaleString()}`,
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
        },
        completed: {
            value: completedCount.toString(),
            change: `${Math.round((completedCount / transactions.length) * 100)}%`,
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
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-3 text-gray-600">Loading cash payments...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <div>
                            <p className="text-sm font-medium text-red-800">Error loading payments</p>
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleRefresh}
                        variant="outline"
                        size="sm"
                        className="mt-3"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            )}

            {/* Main Content */}
            {!loading && !error && (
                <>
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={loading}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>

                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Cash */}
                        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                            <CardHeader className="flex justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TOTAL CASH TODAY</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{metrics.totalCash.value}</div>
                                        <div className="flex gap-1 items-center mt-1">
                                            <TrendingUp className="h-3 w-3 text-green-500" />
                                            <span className="text-xs text-green-500 font-medium">{metrics.totalCash.change}</span>
                                            <span className="text-xs text-gray-500">{metrics.totalCash.period}</span>
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
                                        placeholder="Search by payment ID (P00001), trip ID (T00001), rider, driver, or location..."
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
                                <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 1fr 0.8fr' }}>
                                    <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction ID</div>
                                    <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trip Details</div>
                                    <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Trip Amount</div>
                                    <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Commission (15%)</div>
                                    <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Driver Earning</div>
                                    <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                                    <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            {filteredTransactions.map((transaction) => (
                                <div key={transaction.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 1fr 0.8fr' }}>
                                        {/* Transaction ID Column */}
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-blue-600">{transaction.readableId || transaction.id.slice(0, 8)}</p>
                                            <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                                        </div>

                                        {/* Trip Details Column */}
                                        <div className="space-y-2">
                                            {/* Trip ID */}
                                            <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded font-semibold">
                                                {transaction.tripReadableId || transaction.tripId.slice(0, 8)}
                                            </span>
                                        </div>

                                        {/* Trip Amount Column */}
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-gray-900">LKR {transaction.amount.toLocaleString()}</div>
                                        </div>

                                        {/* Commission Column */}
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-green-700">LKR {transaction.commission.toLocaleString()}</div>
                                        </div>

                                        {/* Driver Earning Column */}
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
                                    <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No transactions found matching your criteria</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CashTransactions
