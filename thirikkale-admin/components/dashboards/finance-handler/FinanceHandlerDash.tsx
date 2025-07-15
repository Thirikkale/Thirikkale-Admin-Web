import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, TrendingUp, DollarSign, Users, FileText } from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function FinanceHandlerDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Finance Handler Dashboard",
            subtitle: "Monitor payments, transactions, and financial reports"
        })
    }, [setPageHeader])

    const [selectedPeriod, setSelectedPeriod] = useState('7 Days')
    const periods = ['7 Days', '30 Days', '90 Days']

    // Sample data - replace with real data from your API
    const metrics = {
        totalPayments: {
            value: 'LKR 1,234,567',
            change: '+6.5%',
            trend: 'up',
            period: 'this month'
        },
        transactions: {
            value: '3,210',
            change: '+2.1%',
            trend: 'up',
            period: 'this month'
        },
        financialReports: {
            value: '12',
            change: '+1',
            trend: 'up',
            period: 'this month'
        },
        activeUsers: {
            value: '1,234',
            change: '+3.2%',
            trend: 'up',
            period: 'this month'
        }
    }

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

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Payments */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TOTAL PAYMENTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalPayments.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.totalPayments.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalPayments.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TRANSACTIONS</CardTitle>
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
                            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Reports */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">FINANCIAL REPORTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.financialReports.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.financialReports.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.financialReports.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Users */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">ACTIVE USERS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.activeUsers.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.activeUsers.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.activeUsers.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Activity Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Payment Activity</CardTitle>
                        <div className="h-8 w-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">Payment analytics dashboard</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Breakdown Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Financial Breakdown</CardTitle>
                        <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <PieChart className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">Financial analytics & insights</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
