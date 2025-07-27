"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    BarChart3,
    Download,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar,
    Users,
    Car,
    CreditCard,
    Banknote,
    PieChart
} from "lucide-react"

const ReportsAnalytics = () => {
    const [timeFrame, setTimeFrame] = useState("month")

    const analyticsData = {
        totalRevenue: 245670.50,
        revenueGrowth: 12.5,
        totalTransactions: 8456,
        transactionGrowth: 8.3,
        avgTransactionValue: 29.05,
        avgValueGrowth: -2.1,
        commission: 36850.58,
        commissionGrowth: 15.2
    }

    const paymentMethodData = [
        { method: "Card", amount: 165432.10, percentage: 67.3, transactions: 5689 },
        { method: "Cash", amount: 80238.40, percentage: 32.7, transactions: 2767 }
    ]

    const topPerformers = [
        { driverId: "DRV123", name: "John Smith", earnings: 4250.80, trips: 125 },
        { driverId: "DRV456", name: "Sarah Johnson", earnings: 3890.50, trips: 108 },
        { driverId: "DRV789", name: "Mike Davis", earnings: 3654.20, trips: 98 },
        { driverId: "DRV101", name: "Emma Wilson", earnings: 3420.75, trips: 92 }
    ]

    const monthlyData = [
        { month: "Jan", revenue: 45670, commission: 6850 },
        { month: "Feb", revenue: 52340, commission: 7851 },
        { month: "Mar", revenue: 48920, commission: 7338 },
        { month: "Apr", revenue: 56780, commission: 8517 },
        { month: "May", revenue: 62450, commission: 9368 },
        { month: "Jun", revenue: 58930, commission: 8840 }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-gray-600">Comprehensive financial insights and performance analytics</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                        className="px-3 py-2 border rounded-md text-sm"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3 inline mr-1 text-green-600" />
                            <span className="text-green-600">+{analyticsData.revenueGrowth}%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.totalTransactions.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3 inline mr-1 text-green-600" />
                            <span className="text-green-600">+{analyticsData.transactionGrowth}%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${analyticsData.avgTransactionValue}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingDown className="h-3 w-3 inline mr-1 text-red-600" />
                            <span className="text-red-600">{analyticsData.avgValueGrowth}%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${analyticsData.commission.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3 inline mr-1 text-green-600" />
                            <span className="text-green-600">+{analyticsData.commissionGrowth}%</span> from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Methods Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Revenue distribution by payment method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {paymentMethodData.map((method) => (
                            <div key={method.method} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {method.method === 'Card' ? (
                                            <CreditCard className="h-4 w-4 text-blue-600" />
                                        ) : (
                                            <Banknote className="h-4 w-4 text-green-600" />
                                        )}
                                        <span className="font-medium">{method.method}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">${method.amount.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600">{method.transactions} transactions</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${method.method === 'Card' ? 'bg-blue-600' : 'bg-green-600'}`}
                                        style={{ width: `${method.percentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-600">{method.percentage}% of total revenue</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Top Performing Drivers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Drivers</CardTitle>
                        <CardDescription>Highest earning drivers this month</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topPerformers.map((driver, index) => (
                            <div key={driver.driverId} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium">{driver.name}</p>
                                        <p className="text-xs text-gray-600">{driver.driverId}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">${driver.earnings.toLocaleString()}</p>
                                    <p className="text-xs text-gray-600">{driver.trips} trips</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Trend Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue and commission overview</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                <span>Revenue</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-600 rounded"></div>
                                <span>Commission</span>
                            </div>
                        </div>

                        {/* Simple Bar Chart Representation */}
                        <div className="space-y-3">
                            {monthlyData.map((data) => (
                                <div key={data.month} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{data.month}</span>
                                        <div className="flex space-x-4">
                                            <span className="text-blue-600">${data.revenue.toLocaleString()}</span>
                                            <span className="text-green-600">${data.commission.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full bg-blue-600"
                                                style={{ width: `${(data.revenue / 70000) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1">
                                            <div
                                                className="h-1 rounded-full bg-green-600"
                                                style={{ width: `${(data.commission / 10000) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ReportsAnalytics
