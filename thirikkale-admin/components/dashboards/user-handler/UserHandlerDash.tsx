import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Car, CarFront, TrendingUp, BarChart3, PieChart, UserCheck, AlertCircle, AlertTriangle, FileWarning, FileBarChart2, RefreshCw } from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'
import { getAllDrivers, getAllRiders, getAllVehicles, type Driver, type Rider, type Vehicle } from '@/lib/api/adminService'

interface DashboardMetrics {
    pendingVerifications: number;
    totalDrivers: number;
    activeDrivers: number;
    totalRiders: number;
    activeRiders: number;
    totalVehicles: number;
    approvedVehicles: number;
    riderReports: number;
    driverReports: number;
}

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

    const [metrics, setMetrics] = useState<DashboardMetrics>({
        pendingVerifications: 0,
        totalDrivers: 0,
        activeDrivers: 0,
        totalRiders: 0,
        activeRiders: 0,
        totalVehicles: 0,
        approvedVehicles: 0,
        riderReports: 0,
        driverReports: 0,
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    // Fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Fetch all data in parallel
            const [driversResponse, ridersResponse, vehiclesResponse] = await Promise.all([
                getAllDrivers(),
                getAllRiders(),
                getAllVehicles(),
            ])

            // Process drivers data
            const drivers = driversResponse.data || []
            const verifiedDrivers = drivers.filter(d => d.isVerified)
            const activeDrivers = drivers.filter(d => d.isAvailable && d.isVerified)
            const pendingDrivers = drivers.filter(d => !d.isVerified)

            // Process riders data
            const riders = ridersResponse.data || []
            const activeRiders = riders.filter(r => r.isActive && r.isPhoneVerified)

            // Process vehicles data
            const vehicles = vehiclesResponse.data || []
            const approvedVehicles = vehicles.filter(v => v.verificationStatus === 'APPROVED')
            const pendingVehicles = vehicles.filter(v => v.verificationStatus === 'PENDING')

            // Calculate total pending verifications
            const totalPendingVerifications = pendingDrivers.length + pendingVehicles.length

            setMetrics({
                pendingVerifications: totalPendingVerifications,
                totalDrivers: drivers.length,
                activeDrivers: activeDrivers.length,
                totalRiders: riders.length,
                activeRiders: activeRiders.length,
                totalVehicles: vehicles.length,
                approvedVehicles: approvedVehicles.length,
                riderReports: 0, // TODO: Implement when reports API is available
                driverReports: 0, // TODO: Implement when reports API is available
            })

            setLastUpdated(new Date())
        } catch (err) {
            console.error('Error fetching dashboard data:', err)
            setError('Failed to fetch dashboard data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()

        // Auto-refresh every 5 minutes
        const interval = setInterval(fetchDashboardData, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    // Sample recent activity (this would come from an activity log API)
    const recentActivity = [
        { type: 'Verification', user: 'Kasun Rajapaksa', action: 'Verified new driver', time: '2 hours ago' },
        { type: 'Report', user: 'Sanduni Wickramasinghe', action: 'Reported for fraudulent activity', time: '5 hours ago' },
        { type: 'Vehicle', user: 'Roshan Jayawardena', action: 'Added new vehicle', time: '1 day ago' },
        { type: 'Rider', user: 'Nimal Perera', action: 'Completed registration', time: '2 days ago' },
    ]

    if (loading && !lastUpdated) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header with time period selector and refresh button */}
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
                <div className="flex items-center gap-4">
                    {lastUpdated && (
                        <span className="text-xs text-gray-500">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchDashboardData}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-red-800">{error}</p>
                        <p className="text-xs text-red-600 mt-1">Please try refreshing the page</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchDashboardData}>
                        Retry
                    </Button>
                </div>
            )}

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
                                <div className="text-2xl font-bold text-gray-900">{metrics.pendingVerifications}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs text-gray-500">Drivers & Vehicles</span>
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
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalRiders}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs text-green-600 font-medium">{metrics.activeRiders} active</span>
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
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalDrivers}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs text-green-600 font-medium">{metrics.activeDrivers} active</span>
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
                                <div className="text-2xl font-bold text-gray-900">{metrics.totalVehicles}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs text-green-600 font-medium">{metrics.approvedVehicles} approved</span>
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
                                <div className="text-2xl font-bold text-gray-900">{metrics.riderReports}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs text-gray-500">Pending review</span>
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
                                <div className="text-2xl font-bold text-gray-900">{metrics.driverReports}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs text-gray-500">Pending review</span>
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
