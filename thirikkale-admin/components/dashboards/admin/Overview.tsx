"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Car, MapPin, DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react'

export default function Overview({ children }: { children: React.ReactNode }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7 Days')

  const periods = ['7 Days', '30 Days', '90 Days']

  // Sample data - replace with real data from your API
  const metrics = {
    totalRiders: {
      value: '24,567',
      change: '+12.3%',
      trend: 'up',
      period: 'this month'
    },
    totalDrivers: {
      value: '3,421',
      change: '+8.1%',
      trend: 'up',
      period: 'this month'
    },
    totalRides: {
      value: '156,789',
      change: 'Last 30 days',
      trend: 'neutral',
      period: ''
    },
    monthlyRevenue: {
      value: 'LKR 892,456',
      change: '+15.2%',
      trend: 'up',
      period: 'this month'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with time period selector */}
      <div className="flex justify-end -mt-14 ">
        <div className="flex gap-2 z-2">
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

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
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
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
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

        {/* Total Rides */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">TOTAL RIDES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{metrics.totalRides.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-blue-500">{metrics.totalRides.change}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">MONTHLY REVENUE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{metrics.monthlyRevenue.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">{metrics.monthlyRevenue.change}</span>
                  <span className="text-xs text-gray-500">{metrics.monthlyRevenue.period}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
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
            <CardTitle className="text-lg font-semibold text-gray-900">Daily Activity</CardTitle>
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                <p className="text-gray-400 text-xs">Interactive analytics dashboard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown Chart */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Breakdown</CardTitle>
            <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <PieChart className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Chart Coming Soon</p>
                <p className="text-gray-400 text-xs">Revenue analytics & insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}