import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Car, CarFront, TrendingUp, BarChart3, PieChart, UserCheck, AlertTriangle, FileWarning, FileBarChart2 } from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'


export default function UserHandlerDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "User Handler Dashboard",
            subtitle: "Manage user accounts, verification, and support requests"
        })
    }, [setPageHeader])

    const [selectedPeriod, setSelectedPeriod] = useState('7 Days')
    const periods = ['7 Days', '30 Days', '90 Days']

    // Sample data - replace with real data from your API
    const metrics = {
        pendingVerifications: { value: '32', change: '-2', trend: 'down', period: 'this month' },
        totalDrivers: { value: '210', change: '+3.1%', trend: 'up', period: 'this month' },
        totalRiders: { value: '980', change: '+2.5%', trend: 'up', period: 'this month' },
        totalVehicles: { value: '150', change: '+1.2%', trend: 'up', period: 'this month' },
        riderReports: { value: '3', change: '+1', trend: 'up', period: 'this month' },
        driverReports: { value: '4', change: '0', trend: 'flat', period: 'this month' },
    }

    // Sample recent activity
    const recentActivity = [
        { type: 'Verification', user: 'Kasun Rajapaksa', action: 'Verified new driver', time: '2 hours ago' },
        { type: 'Report', user: 'Sanduni Wickramasinghe', action: 'Reported for fraudulent activity', time: '5 hours ago' },
        { type: 'Vehicle', user: 'Roshan Jayawardena', action: 'Added new vehicle', time: '1 day ago' },
        { type: 'Rider', user: 'Nimal Perera', action: 'Completed registration', time: '2 days ago' },
    ]

    return (
        <div className="space-y-8">
            {/* Header with time period selector */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex flex-wrap gap-2">
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
                {/* Pending Verifications */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">PENDING VERIFICATIONS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.pendingVerifications.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-red-500" />
                                    <span className="text-xs text-red-500">{metrics.pendingVerifications.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.pendingVerifications.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Total Riders */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TOTAL RIDERS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalRiders.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.totalRiders.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalRiders.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Total Drivers */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TOTAL DRIVERS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalDrivers.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.totalDrivers.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalDrivers.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <Car className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Total Vehicles */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TOTAL VEHICLES</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalVehicles.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.totalVehicles.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalVehicles.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-gray-500 rounded-lg flex items-center justify-center">
                                <CarFront className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Rider Reports */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">RIDER REPORTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.riderReports.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.riderReports.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.riderReports.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-blue-400 rounded-lg flex items-center justify-center">
                                <FileWarning className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Driver Reports */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">DRIVER REPORTS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.driverReports.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-gray-500" />
                                    <span className="text-xs text-gray-500">{metrics.driverReports.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.driverReports.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-gray-400 rounded-lg flex items-center justify-center">
                                <FileBarChart2 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Activity Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">User Activity</CardTitle>
                        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">User activity analytics</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Verification Breakdown Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Verification Breakdown</CardTitle>
                        <div className="h-8 w-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <PieChart className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">Verification analytics & insights</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white border border-gray-200 shadow rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <ul className="divide-y divide-gray-100">
                    {recentActivity.map((item, idx) => (
                        <li key={idx} className="py-3 flex items-center gap-4">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                                {item.type === 'Verification' && <UserCheck className="h-5 w-5" />}
                                {item.type === 'Report' && <AlertTriangle className="h-5 w-5" />}
                                {item.type === 'Vehicle' && <Car className="h-5 w-5" />}
                                {item.type === 'Rider' && <Users className="h-5 w-5" />}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900">{item.user}</div>
                                <div className="text-xs text-gray-500">{item.action}</div>
                            </div>
                            <div className="text-xs text-gray-400 whitespace-nowrap">{item.time}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
