import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, TrendingUp, TrendingDown, DollarSign, Users, FileText, Car, CreditCard, Banknote } from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function FinanceHandlerDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Finance Overview Dashboard",
            subtitle: "Comprehensive financial insights and platform performance"
        })
    }, [setPageHeader])

    const [selectedPeriod, setSelectedPeriod] = useState('7 Days')
    const periods = ['7 Days', '30 Days', '90 Days']

    // Sample data - replace with real data from your API
    const metrics = {
        totalRevenue: {
            value: 'LKR 2,456,789',
            change: '+12.5%',
            trend: 'up',
            period: 'this month'
        },
        transactions: {
            value: '8,420',
            change: '+8.3%',
            trend: 'up',
            period: 'this month'
        },
        platformCommission: {
            value: 'LKR 368,518',
            change: '+15.2%',
            trend: 'up',
            period: 'this month'
        },
        activeDrivers: {
            value: '1,847',
            change: '+5.7%',
            trend: 'up',
            period: 'this month'
        },
        avgTransactionValue: {
            value: 'LKR 292',
            change: '-2.1%',
            trend: 'down',
            period: 'this month'
        },
        driverPayouts: {
            value: 'LKR 2,088,271',
            change: '+11.8%',
            trend: 'up',
            period: 'this month'
        }
    }

    // Chart data
    const weeklyRevenueData = [
        { day: 'Mon', revenue: 340000, commission: 51000 },
        { day: 'Tue', revenue: 380000, commission: 57000 },
        { day: 'Wed', revenue: 420000, commission: 63000 },
        { day: 'Thu', revenue: 390000, commission: 58500 },
        { day: 'Fri', revenue: 450000, commission: 67500 },
        { day: 'Sat', revenue: 520000, commission: 78000 },
        { day: 'Sun', revenue: 480000, commission: 72000 }
    ]

    const paymentMethodData = [
        { method: 'Card Payments', percentage: 68, amount: 1673577, color: 'bg-blue-500' },
        { method: 'Cash Payments', percentage: 32, amount: 783212, color: 'bg-green-500' }
    ]

    return (
        <div className="space-y-6">
            {/* Header with time period selector */}
            <div className="flex justify-end">
                <div className="flex gap-2">
                    {periods.map((period) => (
                        <Button
                            key={period}
                            variant={selectedPeriod === period ? "default" : "outline"}
                            className={`px-4 py-2 text-sm ${selectedPeriod === period ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setSelectedPeriod(period)}
                        >
                            {period}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Primary Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TOTAL REVENUE</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalRevenue.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.totalRevenue.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalRevenue.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Platform Commission */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">PLATFORM COMMISSION</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.platformCommission.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.platformCommission.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.platformCommission.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Driver Payouts */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">DRIVER PAYOUTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.driverPayouts.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.driverPayouts.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.driverPayouts.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                <Car className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Transactions */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TOTAL TRANSACTIONS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.transactions.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.transactions.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.transactions.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Secondary Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Drivers */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">ACTIVE DRIVERS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.activeDrivers.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.activeDrivers.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.activeDrivers.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Average Transaction Value */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">AVG TRANSACTION</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.avgTransactionValue.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingDown className="h-3 w-3 text-red-500" />
                                    <span className="text-xs text-red-500">{metrics.avgTransactionValue.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.avgTransactionValue.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Revenue Trend */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Weekly Revenue Trend</CardTitle>
                        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                    <span>Revenue</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span>Commission</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {weeklyRevenueData.map((data) => (
                                    <div key={data.day} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{data.day}</span>
                                            <div className="flex space-x-6">
                                                <span className="text-blue-600">LKR {data.revenue.toLocaleString()}</span>
                                                <span className="text-green-600">LKR {data.commission.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full bg-blue-500"
                                                    style={{ width: `${(data.revenue / 520000) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1">
                                                <div
                                                    className="h-1 rounded-full bg-green-500"
                                                    style={{ width: `${(data.commission / 78000) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Methods Distribution */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Payment Methods</CardTitle>
                        <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <PieChart className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center justify-center">
                                <div className="relative w-40 h-40">
                                    {/* Pie Chart Representation */}
                                    <div className="w-40 h-40 rounded-full border-8 border-gray-200 relative overflow-hidden">
                                        <div
                                            className="absolute inset-0 rounded-full border-8 border-blue-500"
                                            style={{
                                                background: `conic-gradient(#3b82f6 0deg ${68 * 3.6}deg, transparent ${68 * 3.6}deg 360deg)`
                                            }}
                                        ></div>
                                        <div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: `conic-gradient(transparent 0deg ${68 * 3.6}deg, #10b981 ${68 * 3.6}deg 360deg)`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-gray-900">Total</div>
                                                <div className="text-xs text-gray-600">LKR 2.46M</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {paymentMethodData.map((method) => (
                                    <div key={method.method} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
                                                <span className="font-medium">{method.method}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">LKR {method.amount.toLocaleString()}</p>
                                                <p className="text-xs text-gray-600">{method.percentage}%</p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${method.color}`}
                                                style={{ width: `${method.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Financial Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Financial Ratios</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">Commission Rate</span>
                            <span className="text-lg font-bold text-green-600">15.0%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">Driver Retention</span>
                            <span className="text-lg font-bold text-blue-600">85.0%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">Growth Rate</span>
                            <span className="text-lg font-bold text-purple-600">12.5%</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Performers */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Top Performing Routes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { route: 'Airport - City Center', revenue: 125000, trips: 420 },
                            { route: 'Mall - University', revenue: 98000, trips: 380 },
                            { route: 'Station - Business District', revenue: 87000, trips: 290 }
                        ].map((route, index) => (
                            <div key={route.route} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{route.route}</p>
                                        <p className="text-xs text-gray-600">{route.trips} trips</p>
                                    </div>
                                </div>
                                <span className="font-bold text-green-600">LKR {route.revenue.toLocaleString()}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Monthly Growth */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Monthly Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { month: 'January', growth: 12.5, revenue: 2456789 },
                            { month: 'December', growth: 8.3, revenue: 2180000 },
                            { month: 'November', growth: 15.2, revenue: 2010000 }
                        ].map((month) => (
                            <div key={month.month} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm">{month.month}</span>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                        <span className="text-green-600 text-xs font-medium">+{month.growth}%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                                        style={{ width: `${(month.revenue / 2500000) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-600">LKR {month.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
