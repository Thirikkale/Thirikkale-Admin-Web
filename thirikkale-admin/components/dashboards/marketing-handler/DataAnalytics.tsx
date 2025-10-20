"use client";

import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';
import { Badge } from '@/components/ui/badge';
import {
    BarChart3,
    Users,
    Star,
    Target,
    Download,
    Filter,
    RefreshCw,
    Eye,
    Activity,
    DollarSign,
    Gift,
    ArrowUpRight,
    ArrowDownRight,
    LineChart
} from "lucide-react";

interface AnalyticsMetric {
    id: string;
    title: string;
    value: string;
    change: string;
    changeType: "increase" | "decrease" | "neutral";
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface ChartData {
    label: string;
    value: number;
    change?: number;
}

interface CampaignPerformance {
    id: string;
    name: string;
    type: "Email" | "Social" | "Push" | "SMS";
    status: "Active" | "Completed" | "Draft" | "Paused";
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
    spend: number;
    roi: number;
    startDate: string;
    endDate: string;
}

const analyticsMetrics: AnalyticsMetric[] = [
    {
        id: "total-users",
        title: "Total Active Users",
        value: "24,567",
        change: "+12.5%",
        changeType: "increase",
        icon: Users,
        color: "text-blue-600"
    },
    {
        id: "revenue",
        title: "Revenue Generated",
        value: "$187,340",
        change: "+8.2%",
        changeType: "increase",
        icon: DollarSign,
        color: "text-green-600"
    },
    {
        id: "conversion-rate",
        title: "Conversion Rate",
        value: "3.47%",
        change: "-0.3%",
        changeType: "decrease",
        icon: Target,
        color: "text-orange-600"
    },
    {
        id: "engagement",
        title: "Engagement Rate",
        value: "67.8%",
        change: "+5.1%",
        changeType: "increase",
        icon: Activity,
        color: "text-purple-600"
    },
    {
        id: "points-earned",
        title: "Points Earned",
        value: "1.2M",
        change: "+15.3%",
        changeType: "increase",
        icon: Star,
        color: "text-yellow-600"
    },
    {
        id: "rewards-claimed",
        title: "Rewards Claimed",
        value: "3,847",
        change: "+22.7%",
        changeType: "increase",
        icon: Gift,
        color: "text-pink-600"
    }
];

const userActivityData: ChartData[] = [
    { label: "Mon", value: 1200, change: 5.2 },
    { label: "Tue", value: 1450, change: 8.1 },
    { label: "Wed", value: 1380, change: -2.3 },
    { label: "Thu", value: 1620, change: 12.4 },
    { label: "Fri", value: 1890, change: 18.7 },
    { label: "Sat", value: 2100, change: 25.3 },
    { label: "Sun", value: 1750, change: 15.8 }
];

const topCampaigns: CampaignPerformance[] = [
    {
        id: "C001",
        name: "Summer Ride Rewards",
        type: "Email",
        status: "Active",
        impressions: 45000,
        clicks: 2340,
        conversions: 156,
        ctr: 5.2,
        conversionRate: 6.7,
        spend: 2500,
        roi: 340,
        startDate: "2024-07-01",
        endDate: "2024-08-31"
    },
    {
        id: "C002",
        name: "Point Booster Campaign",
        type: "Push",
        status: "Active",
        impressions: 32000,
        clicks: 1890,
        conversions: 134,
        ctr: 5.9,
        conversionRate: 7.1,
        spend: 1800,
        roi: 420,
        startDate: "2024-07-15",
        endDate: "2024-08-15"
    },
    {
        id: "C003",
        name: "Referral Boost",
        type: "Social",
        status: "Completed",
        impressions: 28000,
        clicks: 1240,
        conversions: 89,
        ctr: 4.4,
        conversionRate: 7.2,
        spend: 1200,
        roi: 380,
        startDate: "2024-06-01",
        endDate: "2024-07-31"
    },
    {
        id: "C004",
        name: "Weekend Special",
        type: "SMS",
        status: "Paused",
        impressions: 18000,
        clicks: 720,
        conversions: 45,
        ctr: 4.0,
        conversionRate: 6.3,
        spend: 800,
        roi: 280,
        startDate: "2024-07-20",
        endDate: "2024-08-20"
    }
];

const revenueData: ChartData[] = [
    { label: "Jan", value: 12500 },
    { label: "Feb", value: 15200 },
    { label: "Mar", value: 18700 },
    { label: "Apr", value: 16800 },
    { label: "May", value: 21400 },
    { label: "Jun", value: 19600 },
    { label: "Jul", value: 23800 }
];

export default function DataAnalytics() {
    const { setPageHeader } = usePageHeader();
    const [timeRange, setTimeRange] = useState('7d');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setPageHeader({
            title: "Data Analytics",
            subtitle: "Analyze business data and generate insights"
        });
    }, [setPageHeader]);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    };

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800 border-green-200";
            case "Completed": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Draft": return "bg-gray-100 text-gray-800 border-gray-200";
            case "Paused": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getCampaignTypeStyle = (type: string) => {
        switch (type) {
            case "Email": return "bg-purple-100 text-purple-800 border-purple-200";
            case "Social": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Push": return "bg-orange-100 text-orange-800 border-orange-200";
            case "SMS": return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                    </select>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsMetrics.map((metric) => (
                    <div key={metric.id} className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                                <div className="flex items-center mt-2">
                                    {metric.changeType === "increase" ? (
                                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                                    ) : metric.changeType === "decrease" ? (
                                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                                    ) : null}
                                    <span className={`text-sm font-medium ml-1 ${metric.changeType === "increase"
                                            ? "text-green-600"
                                            : metric.changeType === "decrease"
                                                ? "text-red-600"
                                                : "text-gray-600"
                                        }`}>
                                        {metric.change}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                                <metric.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Activity Chart */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">User Activity</h3>
                            <p className="text-sm text-gray-500">Daily active users over time</p>
                        </div>
                        <LineChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {userActivityData.map((data) => (
                            <div key={data.label} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-700 w-10">{data.label}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(data.value / 2500) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-900">{data.value.toLocaleString()}</span>
                                    <span className={`text-xs font-medium ${data.change && data.change > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {data.change && data.change > 0 ? '+' : ''}{data.change}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Trend Chart */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                            <p className="text-sm text-gray-500">Monthly revenue growth</p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {revenueData.map((data) => (
                            <div key={data.label} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-700 w-10">{data.label}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                                        <div
                                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(data.value / 25000) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">${data.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Campaign Performance Table */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
                            <p className="text-sm text-gray-500">Top performing marketing campaigns</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {/* Table Header */}
                    <div className="bg-gray-100 border-b-2 border-gray-300">
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                            <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">Campaign</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Type</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Impressions</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Clicks</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">CTR</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Conversions</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Conv. Rate</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">ROI</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* Campaign Rows */}
                    {topCampaigns.map((campaign) => (
                        <div key={campaign.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                            <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                                {/* Campaign Name */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{campaign.name}</p>
                                    <p className="text-xs text-gray-500">ID: {campaign.id}</p>
                                </div>

                                {/* Type */}
                                <div className="flex justify-center">
                                    <Badge className={`${getCampaignTypeStyle(campaign.type)} border`}>
                                        {campaign.type}
                                    </Badge>
                                </div>

                                {/* Status */}
                                <div className="flex justify-center">
                                    <Badge className={`${getStatusBadgeStyle(campaign.status)} border`}>
                                        {campaign.status}
                                    </Badge>
                                </div>

                                {/* Impressions */}
                                <div className="text-center text-sm font-medium text-gray-900">
                                    {campaign.impressions.toLocaleString()}
                                </div>

                                {/* Clicks */}
                                <div className="text-center text-sm font-medium text-gray-900">
                                    {campaign.clicks.toLocaleString()}
                                </div>

                                {/* CTR */}
                                <div className="text-center text-sm font-medium text-gray-900">
                                    {campaign.ctr}%
                                </div>

                                {/* Conversions */}
                                <div className="text-center text-sm font-medium text-gray-900">
                                    {campaign.conversions}
                                </div>

                                {/* Conversion Rate */}
                                <div className="text-center text-sm font-medium text-gray-900">
                                    {campaign.conversionRate}%
                                </div>

                                {/* ROI */}
                                <div className="text-center">
                                    <span className={`text-sm font-bold ${campaign.roi > 300 ? 'text-green-600' :
                                            campaign.roi > 200 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {campaign.roi}%
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-center">
                                    <button className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
