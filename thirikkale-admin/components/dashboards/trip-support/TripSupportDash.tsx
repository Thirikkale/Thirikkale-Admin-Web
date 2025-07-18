"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    BellRing,
    TrendingUp,
    BarChart3,
    PieChart,
    Navigation,
    Route,
    CheckCircle2,
    UserCog,
    UserCircle2
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

type TripSupportDashProps = {
    tab?: string;
};

export default function TripSupportDash({ tab }: TripSupportDashProps) {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Trip Support Dashboard",
            subtitle: "Monitor trips, support tickets, and emergency alerts"
        })
    }, [setPageHeader])

    const [selectedPeriod, setSelectedPeriod] = useState('7 Days')
    const periods = ['7 Days', '30 Days', '90 Days']

    const metrics = {
        activeTrips: {
            value: '124',
            change: '+5.2%',
            trend: 'up',
            period: 'this hour'
        },
        completedTrips: {
            value: '1,847',
            change: '+18.4%',
            trend: 'up',
            period: 'today'
        },
        driverTickets: {
            value: '32',
            change: '-3.1%',
            trend: 'down',
            period: 'today'
        },
        riderTickets: {
            value: '18',
            change: '+7.2%',
            trend: 'up',
            period: 'today'
        },
        emergencyAlerts: {
            value: '3',
            change: 'Active now',
            trend: 'neutral',
            period: ''
        },
        resolvedDisputes: {
            value: '89',
            change: '+12.4%',
            trend: 'up',
            period: 'this week'
        }
    }

    const metricsByTab = {
        overview: {
            metrics: {
                emergencyAlerts: metrics.emergencyAlerts,
                activeTrips: metrics.activeTrips,
                completedTrips: metrics.completedTrips,
                resolvedDisputes: metrics.resolvedDisputes,
                driverTickets: metrics.driverTickets,
                riderTickets: metrics.riderTickets,
            },
            showCharts: true
        },
        'live-trips': {
            metrics: {
                activeTrips: metrics.activeTrips,
                completedTrips: metrics.completedTrips,
            },
            showCharts: true
        },
        'driver-support': {
            metrics: {
                driverTickets: metrics.driverTickets,
            },
            showCharts: true
        },
        'rider-support': {
            metrics: {
                riderTickets: metrics.riderTickets,
            },
            showCharts: true
        },
        'emergency-alerts': {
            metrics: {
                emergencyAlerts: metrics.emergencyAlerts,
            },
            showCharts: false
        },
        'disputes-resolutions': {
            metrics: {
                resolvedDisputes: metrics.resolvedDisputes,
            },
            showCharts: true
        }
    };

    const activeTab = tab && metricsByTab[tab as keyof typeof metricsByTab]
        ? tab as keyof typeof metricsByTab
        : 'overview';
    const currentTabData = metricsByTab[activeTab];
    const activeMetrics = currentTabData.metrics;
    const showCharts = currentTabData.showCharts;

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <div className="flex gap-2">
                    {periods.map((period) => (
                        <Button
                            key={period}
                            variant={selectedPeriod === period ? "default" : "outline"}
                            className={`px-4 py-2 text-sm ${selectedPeriod === period
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            onClick={() => setSelectedPeriod(period)}
                        >
                            {period}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {'emergencyAlerts' in activeMetrics && (
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <CardHeader className="flex justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">EMERGENCY ALERTS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{activeMetrics.emergencyAlerts.value}</div>
                                    <div className="text-xs text-red-500 mt-1 font-medium">{activeMetrics.emergencyAlerts.change}</div>
                                </div>
                                <div className="h-12 w-12 bg-red-500 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                    <BellRing className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {'activeTrips' in activeMetrics && (
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <CardHeader className="flex justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">ONGOING TRIPS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{activeMetrics.activeTrips.value}</div>
                                    <div className="flex gap-1 items-center mt-1">
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                        <span className="text-xs text-green-500 font-medium">{activeMetrics.activeTrips.change}</span>
                                        <span className="text-xs text-gray-500">{activeMetrics.activeTrips.period}</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <Navigation className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {'completedTrips' in activeMetrics && (
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <CardHeader className="flex justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">COMPLETED TRIPS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{activeMetrics.completedTrips.value}</div>
                                    <div className="flex gap-1 items-center mt-1">
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                        <span className="text-xs text-green-500 font-medium">{activeMetrics.completedTrips.change}</span>
                                        <span className="text-xs text-gray-500">{activeMetrics.completedTrips.period}</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                    <Route className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {'resolvedDisputes' in activeMetrics && (
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <CardHeader className="flex justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">RESOLVED DISPUTES</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{activeMetrics.resolvedDisputes.value}</div>
                                    <div className="flex gap-1 items-center mt-1">
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                        <span className="text-xs text-green-500 font-medium">{activeMetrics.resolvedDisputes.change}</span>
                                        <span className="text-xs text-gray-500">{activeMetrics.resolvedDisputes.period}</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                                    <CheckCircle2 className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {'driverTickets' in activeMetrics && (
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <CardHeader className="flex justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">DRIVER SUPPORT TICKETS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{activeMetrics.driverTickets.value}</div>
                                    <div className="flex gap-1 items-center mt-1">
                                        <TrendingUp className="h-3 w-3 text-red-500" />
                                        <span className="text-xs text-red-500 font-medium">{activeMetrics.driverTickets.change}</span>
                                        <span className="text-xs text-gray-500">{activeMetrics.driverTickets.period}</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                    <UserCog className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {'riderTickets' in activeMetrics && (
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <CardHeader className="flex justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800">RIDER SUPPORT TICKETS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{activeMetrics.riderTickets.value}</div>
                                    <div className="flex gap-1 items-center mt-1">
                                        <TrendingUp className="h-3 w-3 text-red-500" />
                                        <span className="text-xs text-red-500 font-medium">{activeMetrics.riderTickets.change}</span>
                                        <span className="text-xs text-gray-500">{activeMetrics.riderTickets.period}</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 bg-teal-500 rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                                    <UserCircle2 className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {showCharts && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader className="flex justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-900">Trip Activity</CardTitle>
                            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <BarChart3 className="h-4 w-4 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                                <div className="text-center">
                                    <BarChart3 className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
                                    <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                    <p className="text-gray-400 text-xs">Interactive trip analytics</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader className="flex justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                {activeTab === 'driver-support' ? 'Driver Support Analytics' :
                                    activeTab === 'rider-support' ? 'Rider Support Analytics' :
                                        activeTab === 'disputes-resolutions' ? 'Dispute Resolution Analytics' :
                                            'Support Tickets'}
                            </CardTitle>
                            <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <PieChart className="h-4 w-4 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                                <div className="text-center">
                                    <PieChart className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
                                    <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                                    <p className="text-gray-400 text-xs">Support ticket analytics & insights</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
