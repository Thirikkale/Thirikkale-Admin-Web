import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Headset, Car, Users, BarChart3, PieChart, TrendingUp, FileText } from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function TripSupportDash() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Trip & Support Agent Dashboard",
            subtitle: "Monitor trips, resolve driver issues, and manage support tickets"
        })
    }, [setPageHeader])

    const [selectedPeriod, setSelectedPeriod] = useState('7 Days')
    const periods = ['7 Days', '30 Days', '90 Days']

    // Sample data - replace with real data from your API
    const metrics = {
        totalTrips: {
            value: '12,345',
            change: '+5.2%',
            trend: 'up',
            period: 'this month'
        },
        openTickets: {
            value: '87',
            change: '-3.1%',
            trend: 'down',
            period: 'this month'
        },
        resolvedTickets: {
            value: '1,234',
            change: '+8.7%',
            trend: 'up',
            period: 'this month'
        },
        activeDrivers: {
            value: '432',
            change: '+2.4%',
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
                {/* Total Trips */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">TOTAL TRIPS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalTrips.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.totalTrips.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.totalTrips.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Car className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Open Tickets */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">OPEN TICKETS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.openTickets.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-red-500" />
                                    <span className="text-xs text-red-500">{metrics.openTickets.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.openTickets.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <Headset className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Resolved Tickets */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">RESOLVED TICKETS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{metrics.resolvedTickets.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500">{metrics.resolvedTickets.change}</span>
                                    <span className="text-xs text-gray-500">{metrics.resolvedTickets.period}</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

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
                            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Activity Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Trip Activity</CardTitle>
                        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">Interactive trip analytics</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ticket Breakdown Chart */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Ticket Breakdown</CardTitle>
                        <div className="h-8 w-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <PieChart className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                <p className="text-gray-400 text-xs">Ticket analytics & insights</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
