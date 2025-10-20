"use client"

import React, { useState, useEffect } from 'react'
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
    Calendar,
    RefreshCw,
    Banknote,
    RefreshCw as RefreshIcon
} from "lucide-react"
import {
    getAllPayments,
    getAllDrivers,
    calculateDriverPayouts,
    type DriverPayoutSummary
} from "@/lib/api/adminService"
import { Loader } from "@/components/ui/loader"

const DriverToCompanyPayouts = () => {
    const [payouts, setPayouts] = useState<DriverPayoutSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState('all')
    const [search, setSearch] = useState('')

    // Fetch data on component mount
    useEffect(() => {
        fetchPayoutData()
    }, [])

    const fetchPayoutData = async () => {
        setLoading(true)
        setError(null)

        try {
            // Fetch payments and drivers in parallel
            const [paymentsResponse, driversResponse] = await Promise.all([
                getAllPayments(),
                getAllDrivers()
            ])

            if (paymentsResponse.error || driversResponse.error) {
                setError(paymentsResponse.error || driversResponse.error || 'Failed to fetch data')
                return
            }

            if (paymentsResponse.data && driversResponse.data) {
                // Calculate driver payout summaries
                const payoutSummaries = calculateDriverPayouts(
                    paymentsResponse.data,
                    driversResponse.data
                )
                setPayouts(payoutSummaries)
            }
        } catch (err) {
            console.error('Error fetching payout data:', err)
            setError('Failed to fetch payout data')
        } finally {
            setLoading(false)
        }
    }

    // Status helpers
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-800 border border-green-200'
            case 'PENDING': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            case 'PROCESSING': return 'bg-blue-100 text-blue-800 border border-blue-200'
            case 'DISPUTED': return 'bg-red-100 text-red-800 border border-red-200'
            default: return 'bg-gray-100 text-gray-800 border border-gray-200'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle className="h-3 w-3" />
            case 'PENDING': return <Clock className="h-3 w-3" />
            case 'PROCESSING': return <RefreshCw className="h-3 w-3" />
            case 'DISPUTED': return <AlertCircle className="h-3 w-3" />
            default: return <CheckCircle className="h-3 w-3" />
        }
    }

    // Filter payouts based on tab and search
    const tabs = [
        { name: 'all', label: 'All Payouts', count: payouts.length },
        { name: 'COMPLETED', label: 'Completed', count: payouts.filter(p => p.payoutStatus === 'COMPLETED').length },
        { name: 'PENDING', label: 'Pending', count: payouts.filter(p => p.payoutStatus === 'PENDING').length },
        { name: 'PROCESSING', label: 'Processing', count: payouts.filter(p => p.payoutStatus === 'PROCESSING').length },
        { name: 'DISPUTED', label: 'Disputed', count: payouts.filter(p => p.payoutStatus === 'DISPUTED').length }
    ]

    const filteredPayouts = payouts.filter(payout => {
        const matchesFilter = activeTab === 'all' || payout.payoutStatus === activeTab
        const matchesSearch = (payout.payoutId?.toLowerCase() || '').includes(search.toLowerCase()) ||
            payout.driverName.toLowerCase().includes(search.toLowerCase()) ||
            payout.driverReadableId.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    // Calculate metrics
    const totalOwed = payouts.reduce((sum, p) => sum + p.amountOwedToCompany, 0)
    const totalCommission = payouts.reduce((sum, p) => sum + p.totalCommission, 0)
    const totalCash = payouts.reduce((sum, p) => sum + p.totalCashCollected, 0)

    const metrics = {
        totalOwed: {
            value: `LKR ${totalOwed.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+9.1%',
            trend: 'up',
            period: 'this week'
        },
        commission: {
            value: `LKR ${totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+7.8%',
            trend: 'up',
            period: `${payouts.length > 0 ? (totalCommission / (totalCash + payouts.reduce((s, p) => s + p.totalCardPayments, 0)) * 100).toFixed(1) : 15}% avg rate`
        },
        cash: {
            value: `LKR ${totalCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+5.4%',
            trend: 'up',
            period: 'cash collected'
        },
        payouts: {
            value: payouts.length.toString(),
            change: '+8.3%',
            trend: 'up',
            period: 'total payouts'
        }
    }

    return (
        <div className="space-y-6">
            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader size="lg" text="Loading payout data..." />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-md">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                    <button
                        onClick={fetchPayoutData}
                        className="mt-2 text-sm text-red-600 underline hover:text-red-800"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Main Content */}
            {!loading && !error && (
                <>
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" size="sm" onClick={fetchPayoutData}>
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
                        {/* Total Owed to Company */}
                        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                            <CardHeader className="flex justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TOTAL OWED TO COMPANY</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{metrics.totalOwed.value}</div>
                                        <div className="flex gap-1 items-center mt-1">
                                            <TrendingUp className="h-3 w-3 text-green-500" />
                                            <span className="text-xs text-green-500 font-medium">{metrics.totalOwed.change}</span>
                                            <span className="text-xs text-gray-500">{metrics.totalOwed.period}</span>
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
                                <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">COMMISSION (15%)</CardTitle>
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

                        {/* Cash Collected */}
                        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                            <CardHeader className="flex justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">CASH COLLECTED</CardTitle>
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

                        {/* Total Payouts */}
                        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                            <CardHeader className="flex justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">TOTAL PAYOUTS</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{metrics.payouts.value}</div>
                                        <div className="flex gap-1 items-center mt-1">
                                            <TrendingUp className="h-3 w-3 text-green-500" />
                                            <span className="text-xs text-green-500 font-medium">{metrics.payouts.change}</span>
                                            <span className="text-xs text-gray-500">{metrics.payouts.period}</span>
                                        </div>
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
                                <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '1fr 1.5fr 1.2fr 0.4fr 1fr 1fr 1fr 0.9fr 0.9fr' }}>
                                    <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payout ID</div>
                                    <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Driver</div>
                                    <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Period</div>
                                    <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Trips</div>
                                    <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Cash</div>
                                    <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Commission</div>
                                    <div className="text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Owed to Company</div>
                                    <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                                    <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            {filteredPayouts.map((payout) => (
                                <div key={payout.driverId} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '1fr 1.5fr 1.2fr 0.4fr 1fr 1fr 1fr 0.9fr 0.9fr' }}>
                                        {/* Payout ID */}
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-blue-700">{payout.payoutId || payout.driverReadableId}</p>
                                            <p className="text-xs text-gray-500">{payout.lastPaymentDate ? new Date(payout.lastPaymentDate).toLocaleDateString() : 'N/A'}</p>
                                        </div>
                                        {/* Driver */}
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                                    {payout.driverName.split(' ').map((n: string) => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{payout.driverName}</div>
                                                <div className="text-xs text-blue-600">{payout.driverReadableId}</div>
                                            </div>
                                        </div>
                                        {/* Period */}
                                        <div className="text-xs text-gray-700">{payout.periodDescription}</div>
                                        {/* Trips */}
                                        <div className="text-center text-xs">{payout.completedTrips}</div>
                                        {/* Cash */}
                                        <div className="text-right text-xs text-green-700">LKR {payout.totalCashCollected.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                        {/* Commission */}
                                        <div className="text-right text-xs text-orange-700">LKR {payout.totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                        {/* Owed to Company */}
                                        <div className="text-right text-xs font-bold text-blue-900">LKR {payout.amountOwedToCompany.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                        {/* Status */}
                                        <div className="flex justify-center">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(payout.payoutStatus)}`}>
                                                {getStatusIcon(payout.payoutStatus)}
                                                {payout.payoutStatus.charAt(0).toUpperCase() + payout.payoutStatus.slice(1).toLowerCase()}
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
                </>
            )}
        </div>
    )
}

export default DriverToCompanyPayouts
