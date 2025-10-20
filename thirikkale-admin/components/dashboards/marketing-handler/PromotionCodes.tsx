"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Percent,
    Gift,
    Users,
    TrendingUp,
    Plus,
    Edit,
    Trash2,
    Filter,
    Download,
    Copy,
    Calendar
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function PromotionCodes() {
    const { setPageHeader } = usePageHeader()
    const [selectedFilter, setSelectedFilter] = useState('all')

    useEffect(() => {
        setPageHeader({
            title: "Promotion Codes",
            subtitle: "Manage discount codes and promotional campaigns"
        })
    }, [setPageHeader])

    // Sample promotion codes data
    const promotionCodes = [
        {
            id: 1,
            code: "SUMMER2024",
            type: "Percentage",
            discount: "20%",
            usageLimit: 1000,
            usageCount: 687,
            validFrom: "2024-06-01",
            validUntil: "2024-08-31",
            status: "Active"
        },
        {
            id: 2,
            code: "NEWUSER50",
            type: "Fixed Amount",
            discount: "Rs. 50",
            usageLimit: 500,
            usageCount: 234,
            validFrom: "2024-01-01",
            validUntil: "2024-12-31",
            status: "Active"
        },
        {
            id: 3,
            code: "WEEKEND15",
            type: "Percentage",
            discount: "15%",
            usageLimit: 200,
            usageCount: 156,
            validFrom: "2024-07-01",
            validUntil: "2024-07-31",
            status: "Expired"
        },
        {
            id: 4,
            code: "LOYALTY25",
            type: "Percentage",
            discount: "25%",
            usageLimit: 100,
            usageCount: 43,
            validFrom: "2024-08-01",
            validUntil: "2024-08-15",
            status: "Active"
        }
    ]

    const stats = [
        {
            title: "Active Codes",
            value: "3",
            change: "+1",
            icon: Gift,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Total Redemptions",
            value: "1,120",
            change: "+12.5%",
            icon: Users,
            color: "bg-green-100 text-green-600"
        },
        {
            title: "Discount Given",
            value: "Rs. 28,450",
            change: "+8.3%",
            icon: Percent,
            color: "bg-purple-100 text-purple-600"
        },
        {
            title: "Conversion Rate",
            value: "67%",
            change: "+3.2%",
            icon: TrendingUp,
            color: "bg-orange-100 text-orange-600"
        }
    ]

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code)
        // You could add a toast notification here
    }

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Controls */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Codes</option>
                            <option value="active">Active Codes</option>
                            <option value="expired">Expired Codes</option>
                            <option value="upcoming">Upcoming Codes</option>
                        </select>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Code
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`h-12 w-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium ml-2 text-green-600">{stat.change}</span>
                            <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Promotion Codes Table */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Promotion Codes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-6 text-gray-700 font-semibold">Code</th>
                                <th className="text-left py-3 px-6 text-gray-700 font-semibold">Type</th>
                                <th className="text-center py-3 px-6 text-gray-700 font-semibold">Discount</th>
                                <th className="text-center py-3 px-6 text-gray-700 font-semibold">Usage</th>
                                <th className="text-center py-3 px-6 text-gray-700 font-semibold">Valid Period</th>
                                <th className="text-center py-3 px-6 text-gray-700 font-semibold">Status</th>
                                <th className="text-center py-3 px-6 text-gray-700 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {promotionCodes.map((code) => (
                                <tr key={code.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                                {code.code}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(code.code)}
                                                className="h-6 w-6 p-0"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                            {code.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center font-semibold text-green-600">
                                        {code.discount}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="text-sm">
                                            <span className="font-semibold text-gray-900">{code.usageCount}</span>
                                            <span className="text-gray-500"> / {code.usageLimit}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${(code.usageCount / code.usageLimit) * 100}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="text-xs text-gray-600">
                                            <div className="flex items-center justify-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{code.validFrom}</span>
                                            </div>
                                            <div className="text-gray-400">to</div>
                                            <div className="flex items-center justify-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{code.validUntil}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${code.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {code.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
