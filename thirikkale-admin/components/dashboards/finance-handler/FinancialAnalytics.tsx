"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Car,
    Clock,
    MapPin,
    DollarSign,
    Calendar,
    Download,
    Filter,
    PieChart,
    LineChart,
    Activity,
    Target
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function FinanceAnalytics() {
    const { setPageHeader } = usePageHeader()
    const [selectedPeriod, setSelectedPeriod] = useState('week')

    useEffect(() => {
        setPageHeader({
            title: "Financial Analytics",
            subtitle: "Comprehensive analytics and insights for financial performance"
        })
    }, [setPageHeader])

    // Sample analytics data
    const analytics = {
        overview: {
            totalTrips: 1247,
            totalDistance: '15,432 km',
            totalRevenue: 'Rs. 2,45,600',
            avgTripDuration: '28 min',
            completionRate: '94.2%',
            cancelationRate: '5.8%'
        },
        trends: {
            tripsChange: '+12.5%',
            revenueChange: '+8.3%',
            durationChange: '-2.1%',
            ratingChange: '+0.3%'
        },
        topRoutes: [
            { route: 'Colombo → Kandy', trips: 186, revenue: 'Rs. 28,400', avgDuration: '2h 15m' },
            { route: 'Negombo → Colombo', trips: 142, revenue: 'Rs. 18,200', avgDuration: '45m' },
            { route: 'Mount Lavinia → Dehiwala', trips: 98, revenue: 'Rs. 12,600', avgDuration: '25m' },
            { route: 'Nugegoda → Maharagama', trips: 76, revenue: 'Rs. 9,800', avgDuration: '20m' },
            { route: 'Pettah → Wellawatte', trips: 54, revenue: 'Rs. 7,200', avgDuration: '18m' }
        ],
        vehicleTypes: [
            { type: 'Car', trips: 687, percentage: 55.1, revenue: 'Rs. 1,35,400' },
            { type: 'Three Wheeler', trips: 312, percentage: 25.0, revenue: 'Rs. 62,800' },
            { type: 'Van', trips: 186, percentage: 14.9, revenue: 'Rs. 37,200' },
            { type: 'Bike', trips: 62, percentage: 5.0, revenue: 'Rs. 10,200' }
        ],
        hourlyData: [
            { hour: '6AM', trips: 45, revenue: 'Rs. 5,400' },
            { hour: '8AM', trips: 123, revenue: 'Rs. 14,800' },
            { hour: '10AM', trips: 87, revenue: 'Rs. 10,400' },
            { hour: '12PM', trips: 156, revenue: 'Rs. 18,700' },
            { hour: '2PM', trips: 134, revenue: 'Rs. 16,100' },
            { hour: '4PM', trips: 178, revenue: 'Rs. 21,400' },
            { hour: '6PM', trips: 198, revenue: 'Rs. 23,800' },
            { hour: '8PM', trips: 145, revenue: 'Rs. 17,400' },
            { hour: '10PM', trips: 89, revenue: 'Rs. 10,700' }
        ],
        weeklyTrends: [
            { day: 'Mon', trips: 142, revenue: 17800, completionRate: 92.5 },
            { day: 'Tue', trips: 156, revenue: 19200, completionRate: 94.2 },
            { day: 'Wed', trips: 178, revenue: 22400, completionRate: 96.1 },
            { day: 'Thu', trips: 165, revenue: 20100, completionRate: 93.8 },
            { day: 'Fri', trips: 198, revenue: 24600, completionRate: 95.7 },
            { day: 'Sat', trips: 223, revenue: 28900, completionRate: 91.3 },
            { day: 'Sun', trips: 185, revenue: 23200, completionRate: 88.9 }
        ],
        tripStatus: [
            { status: 'Completed', count: 1175, percentage: 94.2, color: 'bg-green-500' },
            { status: 'Cancelled', count: 52, percentage: 4.2, color: 'bg-red-500' },
            { status: 'Emergency', count: 15, percentage: 1.2, color: 'bg-orange-500' },
            { status: 'Disputed', count: 5, percentage: 0.4, color: 'bg-yellow-500' }
        ],
        driverPerformance: [
            { metric: 'Average Rating', value: 4.7, target: 4.5, status: 'above' },
            { metric: 'On-Time Arrival', value: 92.3, target: 90.0, status: 'above' },
            { metric: 'Trip Completion', value: 96.8, target: 95.0, status: 'above' },
            { metric: 'Customer Satisfaction', value: 88.4, target: 85.0, status: 'above' }
        ],
        monthlyRevenue: [
            { month: 'Jan', revenue: 185000, trips: 890 },
            { month: 'Feb', revenue: 198000, trips: 945 },
            { month: 'Mar', revenue: 210000, trips: 1020 },
            { month: 'Apr', revenue: 225000, trips: 1080 },
            { month: 'May', revenue: 240000, trips: 1150 },
            { month: 'Jun', revenue: 245600, trips: 1247 }
        ]
    }

    const periods = [
        { value: 'day', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ]

    const getTrendIcon = (change: string) => {
        return change.startsWith('+') ?
            <TrendingUp className="h-4 w-4 text-green-500" /> :
            <TrendingDown className="h-4 w-4 text-red-500" />
    }

    const getTrendColor = (change: string) => {
        return change.startsWith('+') ? 'text-green-600' : 'text-red-600'
    }

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Controls */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {periods.map(period => (
                                    <option key={period.value} value={period.value}>{period.label}</option>
                                ))}
                            </select>
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Trips</p>
                            <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalTrips}</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        {getTrendIcon(analytics.trends.tripsChange)}
                        <span className={`text-sm font-medium ml-2 ${getTrendColor(analytics.trends.tripsChange)}`}>
                            {analytics.trends.tripsChange}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalRevenue}</p>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        {getTrendIcon(analytics.trends.revenueChange)}
                        <span className={`text-sm font-medium ml-2 ${getTrendColor(analytics.trends.revenueChange)}`}>
                            {analytics.trends.revenueChange}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Trip Duration</p>
                            <p className="text-2xl font-bold text-gray-900">{analytics.overview.avgTripDuration}</p>
                        </div>
                        <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        {getTrendIcon(analytics.trends.durationChange)}
                        <span className={`text-sm font-medium ml-2 ${getTrendColor(analytics.trends.durationChange)}`}>
                            {analytics.trends.durationChange}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Distance</p>
                            <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalDistance}</p>
                        </div>
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium ml-2 text-green-600">+5.2%</span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">{analytics.overview.completionRate}</p>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium ml-2 text-green-600">+1.8%</span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Cancellation Rate</p>
                            <p className="text-2xl font-bold text-gray-900">{analytics.overview.cancelationRate}</p>
                        </div>
                        <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <TrendingDown className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium ml-2 text-green-600">-0.5%</span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>
            </div>

            {/* Charts and Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Routes */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Routes</h3>
                    <div className="space-y-4">
                        {analytics.topRoutes.map((route, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{route.route}</p>
                                    <p className="text-xs text-gray-500">Avg Duration: {route.avgDuration}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{route.trips} trips</p>
                                    <p className="text-xs text-green-600">{route.revenue}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vehicle Type Distribution */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Type Distribution</h3>
                    <div className="space-y-4">
                        {analytics.vehicleTypes.map((vehicle, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Car className="h-4 w-4 text-gray-600" />
                                        <span className="text-sm font-medium text-gray-900">{vehicle.type}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-semibold text-gray-900">{vehicle.trips} trips</span>
                                        <span className="text-xs text-gray-500 ml-2">({vehicle.percentage}%)</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${vehicle.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-green-600 text-right">{vehicle.revenue}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hourly Analysis */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Trip Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {analytics.hourlyData.map((hour, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">{hour.hour}</p>
                            <p className="text-lg font-bold text-gray-900">{hour.trips}</p>
                            <p className="text-xs text-green-600">{hour.revenue}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Weekly Trends Chart */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Weekly Performance Trends</h3>
                    <LineChart className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-4">
                    {analytics.weeklyTrends.map((day, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-gray-900">{day.day}</div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-gray-900">{day.trips}</p>
                                <p className="text-xs text-gray-500">trips</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-green-600">Rs. {(day.revenue / 1000).toFixed(1)}k</p>
                                <p className="text-xs text-gray-500">revenue</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center">
                                    <div className="w-12 h-2 bg-gray-200 rounded-full mr-2">
                                        <div
                                            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                                            style={{ width: `${day.completionRate}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-900">{day.completionRate}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trip Status Distribution & Driver Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trip Status Pie Chart */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Trip Status Distribution</h3>
                        <PieChart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="space-y-4">
                        {analytics.tripStatus.map((status, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full ${status.color}`}></div>
                                    <span className="text-sm font-medium text-gray-900">{status.status}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{status.count}</p>
                                    <p className="text-xs text-gray-500">{status.percentage}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 relative h-40 flex items-center justify-center">
                        <div className="relative w-32 h-32">
                            {analytics.tripStatus.map((status, index) => {
                                const strokeDasharray = `${status.percentage * 2.51} 251.2`
                                const strokeDashoffset = index === 0 ? 0 : analytics.tripStatus.slice(0, index).reduce((acc, s) => acc + (s.percentage * 2.51), 0)
                                return (
                                    <svg key={index} className="absolute inset-0 w-32 h-32 transform -rotate-90" viewBox="0 0 84 84">
                                        <circle
                                            cx="42"
                                            cy="42"
                                            r="40"
                                            stroke={status.color.replace('bg-', '')}
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={strokeDasharray}
                                            strokeDashoffset={-strokeDashoffset}
                                            className="transition-all duration-300"
                                        />
                                    </svg>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Driver Performance Metrics */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Driver Performance</h3>
                        <Target className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="space-y-4">
                        {analytics.driverPerformance.map((metric, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-900">{metric.metric}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {typeof metric.value === 'number' && metric.value < 10 ? metric.value.toFixed(1) : metric.value}
                                            {metric.metric === 'Average Rating' ? '/5' : '%'}
                                        </span>
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${metric.metric === 'Average Rating' ? (metric.value / 5) * 100 : metric.value}%`
                                            }}
                                        ></div>
                                    </div>
                                    <div
                                        className="absolute top-0 w-1 h-2 bg-orange-400 rounded-full"
                                        style={{
                                            left: `${metric.metric === 'Average Rating' ? (metric.target / 5) * 100 : metric.target}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Target: {metric.target}{metric.metric === 'Average Rating' ? '/5' : '%'}</span>
                                    <span className="text-green-600">Above Target</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Monthly Revenue & Trip Trends Chart */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue & Trip Trends</h3>
                    <Activity className="h-5 w-5 text-green-600" />
                </div>

                {/* Chart Legend */}
                <div className="flex items-center gap-8 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-gray-700">Revenue (Rs.)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-gray-700">Trips Count</span>
                    </div>
                </div>

                {/* Enhanced Line Chart */}
                <div className="relative h-[500px] bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-inner">
                    <div className="absolute inset-0 p-8">
                        {/* Main Chart SVG */}
                        <svg className="w-full h-full" viewBox="0 0 900 450">
                            <defs>
                                {/* Enhanced Gradients */}
                                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
                                </linearGradient>
                                <linearGradient id="tripsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                                </linearGradient>
                                {/* Enhanced Drop shadow filter */}
                                <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
                                </filter>
                                {/* Glow effect for data points */}
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Grid Lines */}
                            <g className="opacity-30">
                                {/* Horizontal Grid Lines */}
                                {[0, 20, 40, 60, 80, 100].map((percent) => (
                                    <line
                                        key={percent}
                                        x1="100"
                                        y1={400 - (percent * 3.2)}
                                        x2="750"
                                        y2={400 - (percent * 3.2)}
                                        stroke="#CBD5E1"
                                        strokeWidth="1"
                                        strokeDasharray="2,4"
                                    />
                                ))}
                                {/* Vertical Grid Lines */}
                                {analytics.monthlyRevenue.map((_, index) => (
                                    <line
                                        key={index}
                                        x1={100 + (index * 108.33)}
                                        y1="80"
                                        x2={100 + (index * 108.33)}
                                        y2="400"
                                        stroke="#CBD5E1"
                                        strokeWidth="1"
                                        strokeDasharray="2,4"
                                    />
                                ))}
                            </g>

                            {/* Chart Area */}
                            <g>
                                {/* Revenue Line with Area */}
                                <g>
                                    {/* Area fill */}
                                    <path
                                        d={`M 100 ${400 - ((analytics.monthlyRevenue[0].revenue / 250000) * 320)} 
                                           ${analytics.monthlyRevenue.map((month, index) =>
                                            `L ${100 + (index * 108.33)} ${400 - ((month.revenue / 250000) * 320)}`
                                        ).join(' ')}
                                           L ${100 + ((analytics.monthlyRevenue.length - 1) * 108.33)} 400
                                           L 100 400 Z`}
                                        fill="url(#revenueGradient)"
                                    />

                                    {/* Revenue line */}
                                    <path
                                        d={`M 100 ${400 - ((analytics.monthlyRevenue[0].revenue / 250000) * 320)} 
                                           ${analytics.monthlyRevenue.map((month, index) =>
                                            `L ${100 + (index * 108.33)} ${400 - ((month.revenue / 250000) * 320)}`
                                        ).join(' ')}`}
                                        stroke="#3B82F6"
                                        strokeWidth="5"
                                        fill="none"
                                        filter="url(#dropshadow)"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Revenue data points */}
                                    {analytics.monthlyRevenue.map((month, index) => (
                                        <g key={`revenue-${index}`}>
                                            {/* Outer glow circle */}
                                            <circle
                                                cx={100 + (index * 108.33)}
                                                cy={400 - ((month.revenue / 250000) * 320)}
                                                r="12"
                                                fill="#3B82F6"
                                                className="opacity-20"
                                                filter="url(#glow)"
                                            />
                                            {/* Main data point */}
                                            <circle
                                                cx={100 + (index * 108.33)}
                                                cy={400 - ((month.revenue / 250000) * 320)}
                                                r="8"
                                                fill="#3B82F6"
                                                stroke="white"
                                                strokeWidth="4"
                                                className="cursor-pointer hover:r-10 transition-all duration-300 drop-shadow-lg"
                                                filter="url(#dropshadow)"
                                            />
                                            {/* Hover area */}
                                            <circle
                                                cx={100 + (index * 108.33)}
                                                cy={400 - ((month.revenue / 250000) * 320)}
                                                r="20"
                                                fill="transparent"
                                                className="cursor-pointer"
                                            >
                                                <title>{month.month}: Rs. {(month.revenue / 1000).toFixed(0)}k</title>
                                            </circle>
                                        </g>
                                    ))}
                                </g>

                                {/* Trips Line with Area */}
                                <g>
                                    {/* Area fill */}
                                    <path
                                        d={`M 100 ${400 - ((analytics.monthlyRevenue[0].trips / 1300) * 320)} 
                                           ${analytics.monthlyRevenue.map((month, index) =>
                                            `L ${100 + (index * 108.33)} ${400 - ((month.trips / 1300) * 320)}`
                                        ).join(' ')}
                                           L ${100 + ((analytics.monthlyRevenue.length - 1) * 108.33)} 400
                                           L 100 400 Z`}
                                        fill="url(#tripsGradient)"
                                    />

                                    {/* Trips line */}
                                    <path
                                        d={`M 100 ${400 - ((analytics.monthlyRevenue[0].trips / 1300) * 320)} 
                                           ${analytics.monthlyRevenue.map((month, index) =>
                                            `L ${100 + (index * 108.33)} ${400 - ((month.trips / 1300) * 320)}`
                                        ).join(' ')}`}
                                        stroke="#10B981"
                                        strokeWidth="5"
                                        fill="none"
                                        strokeDasharray="10,6"
                                        filter="url(#dropshadow)"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Trips data points */}
                                    {analytics.monthlyRevenue.map((month, index) => (
                                        <g key={`trips-${index}`}>
                                            {/* Outer glow circle */}
                                            <circle
                                                cx={100 + (index * 108.33)}
                                                cy={400 - ((month.trips / 1300) * 320)}
                                                r="12"
                                                fill="#10B981"
                                                className="opacity-20"
                                                filter="url(#glow)"
                                            />
                                            {/* Main data point */}
                                            <circle
                                                cx={100 + (index * 108.33)}
                                                cy={400 - ((month.trips / 1300) * 320)}
                                                r="8"
                                                fill="#10B981"
                                                stroke="white"
                                                strokeWidth="4"
                                                className="cursor-pointer hover:r-10 transition-all duration-300 drop-shadow-lg"
                                                filter="url(#dropshadow)"
                                            />
                                            {/* Hover area */}
                                            <circle
                                                cx={100 + (index * 108.33)}
                                                cy={400 - ((month.trips / 1300) * 320)}
                                                r="20"
                                                fill="transparent"
                                                className="cursor-pointer"
                                            >
                                                <title>{month.month}: {month.trips} trips</title>
                                            </circle>
                                        </g>
                                    ))}
                                </g>

                                {/* Month labels */}
                                {analytics.monthlyRevenue.map((month, index) => (
                                    <text
                                        key={`label-${index}`}
                                        x={100 + (index * 108.33)}
                                        y={425}
                                        textAnchor="middle"
                                        className="text-sm fill-gray-600 font-semibold"
                                    >
                                        {month.month}
                                    </text>
                                ))}

                                {/* Chart Axes */}
                                <line x1="100" y1="400" x2="750" y2="400" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
                                <line x1="100" y1="80" x2="100" y2="400" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
                            </g>

                            {/* Y-axis labels for Revenue (Left) */}
                            <g className="text-sm font-semibold fill-blue-600">
                                <text x="85" y="85" textAnchor="end">250k</text>
                                <text x="85" y="149" textAnchor="end">200k</text>
                                <text x="85" y="213" textAnchor="end">150k</text>
                                <text x="85" y="277" textAnchor="end">100k</text>
                                <text x="85" y="341" textAnchor="end">50k</text>
                                <text x="85" y="405" textAnchor="end">0</text>
                            </g>

                            {/* Y-axis labels for Trips (Right) */}
                            <g className="text-sm font-semibold fill-green-600">
                                <text x="765" y="85" textAnchor="start">1300</text>
                                <text x="765" y="149" textAnchor="start">1040</text>
                                <text x="765" y="213" textAnchor="start">780</text>
                                <text x="765" y="277" textAnchor="start">520</text>
                                <text x="765" y="341" textAnchor="start">260</text>
                                <text x="765" y="405" textAnchor="start">0</text>
                            </g>

                            {/* Axis Labels */}
                            <text x="425" y="450" textAnchor="middle" className="text-base font-bold fill-gray-700">Months</text>
                            <text x="30" y="240" textAnchor="middle" className="text-base font-bold fill-blue-600" transform="rotate(-90, 30, 240)">Revenue (Rs.)</text>
                            <text x="870" y="240" textAnchor="middle" className="text-base font-bold fill-green-600" transform="rotate(90, 870, 240)">Number of Trips</text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Data Table & Summary Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Data Table */}
                <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Data Table</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Month</th>
                                    <th className="text-right py-3 px-4 text-gray-700 font-semibold">Revenue</th>
                                    <th className="text-right py-3 px-4 text-gray-700 font-semibold">Trips</th>
                                    <th className="text-right py-3 px-4 text-gray-700 font-semibold">Avg/Trip</th>
                                    <th className="text-right py-3 px-4 text-gray-700 font-semibold">Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.monthlyRevenue.map((month, index) => {
                                    const prevMonth = analytics.monthlyRevenue[index - 1]
                                    const growth = prevMonth
                                        ? ((month.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1)
                                        : '0.0'
                                    const isPositive = parseFloat(growth) >= 0

                                    return (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-4 font-semibold text-gray-900">{month.month}</td>
                                            <td className="py-4 px-4 text-right font-bold text-blue-600">
                                                Rs. {(month.revenue / 1000).toFixed(0)}k
                                            </td>
                                            <td className="py-4 px-4 text-right font-semibold text-green-600">{month.trips}</td>
                                            <td className="py-4 px-4 text-right text-gray-700 font-medium">
                                                Rs. {Math.round(month.revenue / month.trips)}
                                            </td>
                                            <td className={`py-4 px-4 text-right font-bold ${isPositive ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {isPositive ? '+' : ''}{growth}%
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                            <p className="text-xl font-bold text-green-700">+18.2%</p>
                            <p className="text-sm font-medium text-green-600">Revenue Growth</p>
                            <p className="text-xs text-green-500">vs Previous Period</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                            <p className="text-xl font-bold text-blue-700">+40.1%</p>
                            <p className="text-sm font-medium text-blue-600">Trip Growth</p>
                            <p className="text-xs text-blue-500">6-Month Trend</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                            <p className="text-xl font-bold text-purple-700">Rs. 197</p>
                            <p className="text-sm font-medium text-purple-600">Avg Trip Value</p>
                            <p className="text-xs text-purple-500">Current Month</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                            <p className="text-xl font-bold text-orange-700">Rs. 41k</p>
                            <p className="text-sm font-medium text-orange-600">Monthly Growth</p>
                            <p className="text-xs text-orange-500">Average Increase</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
