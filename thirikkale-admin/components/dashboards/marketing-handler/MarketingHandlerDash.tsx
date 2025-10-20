import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, TrendingUp, FileText, Users, Star } from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function MarketingHandlerDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Marketing & Report Handler Dashboard",
            subtitle: "Manage marketing campaigns, generate reports, and analyze data"
        })
    }, [setPageHeader])

    const [selectedPeriod, setSelectedPeriod] = useState('7 Days')
    const periods = ['7 Days', '30 Days', '90 Days']

    // Sample data - replace with real data from your API
    const metrics = {
        campaigns: {
            value: '18',
            change: '+3',
            trend: 'up',
            period: 'this month'
        },
        reports: {
            value: '42',
            change: '+5',
            trend: 'up',
            period: 'this month'
        },
        analytics: {
            value: '1,230',
            change: '+12%',
            trend: 'up',
            period: 'this month'
        },
        activeUsers: {
            value: '2,345',
            change: '+4.2%',
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
                {/* Campaigns */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">CAMPAIGNS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.campaigns.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.campaigns.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.campaigns.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">REPORTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.reports.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.reports.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.reports.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Analytics */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">ANALYTICS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.analytics.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.analytics.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.analytics.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                <Star className="h-6 w-6 text-white" />
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
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Campaign Performance Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Campaign Performance</CardTitle>
                        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">Campaign analytics dashboard</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User Engagement Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">User Engagement</CardTitle>
                        <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <PieChart className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">User engagement analytics</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
