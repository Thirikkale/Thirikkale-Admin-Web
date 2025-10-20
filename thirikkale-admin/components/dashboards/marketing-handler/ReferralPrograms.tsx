"use client";

import React, { useEffect, useState } from "react";
import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { Badge } from "@/components/ui/badge";
import {
    Settings,
    Users,
    Gift,
    Search,
    Calendar,
    Eye,
    Edit,
    Trash2,
    Target,
    TrendingUp,
    CheckCircle,
    Clock,
    Pause,
    Play
} from "lucide-react";

interface ReferralProgram {
    id: string;
    name: string;
    description: string;
    type: "Points" | "Cash" | "Credits" | "Discount";
    status: "Active" | "Inactive" | "Draft" | "Expired";
    startDate: string;
    endDate: string;
    referrerReward: {
        type: string;
        value: number;
        unit: string;
    };
    refereeReward: {
        type: string;
        value: number;
        unit: string;
    };
    conditions: {
        minSpend?: number;
        validityDays: number;
        maxReferrals?: number;
    };
    metrics: {
        totalParticipants: number;
        totalReferrals: number;
        successfulReferrals: number;
        totalRewardsPaid: number;
        conversionRate: number;
    };
    createdDate: string;
    lastModified: string;
}

const samplePrograms: ReferralProgram[] = [
    {
        id: "RP001",
        name: "Summer Referral Boost",
        description: "Special summer campaign with double rewards for both referrer and referee",
        type: "Points",
        status: "Active",
        startDate: "2024-07-01",
        endDate: "2024-08-31",
        referrerReward: {
            type: "Points",
            value: 1000,
            unit: "points"
        },
        refereeReward: {
            type: "Points",
            value: 500,
            unit: "points"
        },
        conditions: {
            minSpend: 25,
            validityDays: 30,
            maxReferrals: 10
        },
        metrics: {
            totalParticipants: 245,
            totalReferrals: 892,
            successfulReferrals: 734,
            totalRewardsPaid: 158400,
            conversionRate: 82.3
        },
        createdDate: "2024-06-15",
        lastModified: "2024-07-20"
    },
    {
        id: "RP002",
        name: "New User Welcome",
        description: "Standard referral program for new user acquisition",
        type: "Cash",
        status: "Active",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        referrerReward: {
            type: "Cash",
            value: 10,
            unit: "$"
        },
        refereeReward: {
            type: "Credits",
            value: 15,
            unit: "ride credits"
        },
        conditions: {
            minSpend: 20,
            validityDays: 60
        },
        metrics: {
            totalParticipants: 1456,
            totalReferrals: 3247,
            successfulReferrals: 2893,
            totalRewardsPaid: 28930,
            conversionRate: 89.1
        },
        createdDate: "2023-12-15",
        lastModified: "2024-07-18"
    },
    {
        id: "RP003",
        name: "Premium Driver Referral",
        description: "Exclusive program for referring premium drivers to the platform",
        type: "Cash",
        status: "Active",
        startDate: "2024-06-01",
        endDate: "2024-09-30",
        referrerReward: {
            type: "Cash",
            value: 50,
            unit: "$"
        },
        refereeReward: {
            type: "Cash",
            value: 25,
            unit: "$"
        },
        conditions: {
            validityDays: 90,
            maxReferrals: 5
        },
        metrics: {
            totalParticipants: 89,
            totalReferrals: 234,
            successfulReferrals: 198,
            totalRewardsPaid: 14850,
            conversionRate: 84.6
        },
        createdDate: "2024-05-20",
        lastModified: "2024-07-25"
    },
    {
        id: "RP004",
        name: "Weekend Warriors",
        description: "Weekend-only referral bonuses with extra rewards",
        type: "Discount",
        status: "Inactive",
        startDate: "2024-05-01",
        endDate: "2024-06-30",
        referrerReward: {
            type: "Discount",
            value: 20,
            unit: "% off next ride"
        },
        refereeReward: {
            type: "Discount",
            value: 25,
            unit: "% off first ride"
        },
        conditions: {
            validityDays: 14
        },
        metrics: {
            totalParticipants: 156,
            totalReferrals: 423,
            successfulReferrals: 367,
            totalRewardsPaid: 8960,
            conversionRate: 86.8
        },
        createdDate: "2024-04-15",
        lastModified: "2024-06-30"
    },
    {
        id: "RP005",
        name: "Holiday Special 2024",
        description: "Special holiday season referral program with gift vouchers",
        type: "Credits",
        status: "Draft",
        startDate: "2024-12-01",
        endDate: "2025-01-15",
        referrerReward: {
            type: "Credits",
            value: 30,
            unit: "ride credits"
        },
        refereeReward: {
            type: "Credits",
            value: 20,
            unit: "ride credits"
        },
        conditions: {
            minSpend: 30,
            validityDays: 45,
            maxReferrals: 15
        },
        metrics: {
            totalParticipants: 0,
            totalReferrals: 0,
            successfulReferrals: 0,
            totalRewardsPaid: 0,
            conversionRate: 0
        },
        createdDate: "2024-07-30",
        lastModified: "2024-07-30"
    }
];

const tabs = [
    { name: 'All', count: 5 },
    { name: 'Active', count: 3 },
    { name: 'Inactive', count: 1 },
    { name: 'Draft', count: 1 },
    { name: 'Expired', count: 0 }
];

export default function ReferralPrograms() {
    const { setPageHeader } = usePageHeader();
    const [activeTab, setActiveTab] = useState('All');
    const [searchFilters, setSearchFilters] = useState({
        name: '',
        type: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        setPageHeader({
            title: "Referral Programs",
            subtitle: "Create and manage referral reward programs"
        });
    }, [setPageHeader]);

    const stats = [
        {
            title: "Active Programs",
            value: "3",
            change: "+1 this month",
            icon: Target,
            color: "text-blue-600"
        },
        {
            title: "Total Participants",
            value: "1,946",
            change: "+15% vs last month",
            icon: Users,
            color: "text-green-600"
        },
        {
            title: "Total Referrals",
            value: "4,796",
            change: "+22% this month",
            icon: TrendingUp,
            color: "text-purple-600"
        },
        {
            title: "Rewards Paid Out",
            value: "$211,140",
            change: "+18% vs last month",
            icon: Gift,
            color: "text-emerald-600"
        }
    ];

    // Filter programs based on selected filters and active tab
    const filteredPrograms = samplePrograms.filter(program => {
        // Filter by active tab
        if (activeTab !== 'All') {
            if (program.status !== activeTab) return false;
        }

        // Filter by search filters
        if (searchFilters.name && !program.name.toLowerCase().includes(searchFilters.name.toLowerCase())) return false;
        if (searchFilters.type && program.type !== searchFilters.type) return false;
        if (searchFilters.dateFrom && new Date(program.startDate) < new Date(searchFilters.dateFrom)) return false;
        if (searchFilters.dateTo && new Date(program.endDate) > new Date(searchFilters.dateTo)) return false;

        return true;
    });

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800 border-green-200";
            case "Inactive": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Draft": return "bg-gray-100 text-gray-800 border-gray-200";
            case "Expired": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getTypeBadgeStyle = (type: string) => {
        switch (type) {
            case "Points": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Cash": return "bg-green-100 text-green-800 border-green-200";
            case "Credits": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Discount": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Active": return CheckCircle;
            case "Inactive": return Pause;
            case "Draft": return Clock;
            case "Expired": return Clock;
            default: return Clock;
        }
    };

    const handleFilterChange = (field: string, value: string) => {
        setSearchFilters(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                {/* Status Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex-shrink-0 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.name
                                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.name}
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeTab === tab.name ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Filters */}
                <div className="p-6 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Program Name Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Program Name"
                                value={searchFilters.name}
                                onChange={(e) => handleFilterChange('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        {/* Type Filter */}
                        <div>
                            <select
                                value={searchFilters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Types</option>
                                <option value="Points">Points</option>
                                <option value="Cash">Cash</option>
                                <option value="Credits">Credits</option>
                                <option value="Discount">Discount</option>
                            </select>
                        </div>

                        {/* Date From Filter */}
                        <div className="relative">
                            <input
                                type="date"
                                value={searchFilters.dateFrom}
                                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        {/* Date To Filter */}
                        <div className="relative">
                            <input
                                type="date"
                                value={searchFilters.dateTo}
                                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gray-100 border-b-2 border-gray-300">
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Program Info</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Type</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Participants</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Success Rate</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Total Paid</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Duration</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* Program Rows */}
                    {filteredPrograms.map((program) => {
                        const StatusIcon = getStatusIcon(program.status);
                        return (
                            <div key={program.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                                    {/* Program Info Column */}
                                    <div className="flex flex-col">
                                        <div className="mb-1">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{program.name}</p>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{program.description}</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-400">ID:</span>
                                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                {program.id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Type Column */}
                                    <div className="flex justify-center">
                                        <Badge className={`${getTypeBadgeStyle(program.type)} border`}>
                                            {program.type}
                                        </Badge>
                                    </div>

                                    {/* Status Column */}
                                    <div className="flex justify-center">
                                        <Badge className={`${getStatusBadgeStyle(program.status)} border flex items-center gap-1`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {program.status}
                                        </Badge>
                                    </div>

                                    {/* Participants Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-gray-900">{program.metrics.totalParticipants.toLocaleString()}</span>
                                    </div>

                                    {/* Success Rate Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-green-600">{program.metrics.conversionRate}%</span>
                                    </div>

                                    {/* Total Paid Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-purple-600">
                                            {program.type === 'Cash' ? '$' : ''}{program.metrics.totalRewardsPaid.toLocaleString()}
                                            {program.type === 'Points' ? ' pts' : ''}
                                        </span>
                                    </div>

                                    {/* Duration Column */}
                                    <div className="text-center">
                                        <div className="text-xs text-gray-600">
                                            <p>{new Date(program.startDate).toLocaleDateString()}</p>
                                            <p>to</p>
                                            <p>{new Date(program.endDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {/* Actions Column */}
                                    <div className="flex justify-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-50 transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        {program.status === 'Active' ? (
                                            <button className="text-yellow-600 hover:text-yellow-800 p-1 rounded-md hover:bg-yellow-50 transition-colors">
                                                <Pause className="h-4 w-4" />
                                            </button>
                                        ) : program.status === 'Inactive' ? (
                                            <button className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-50 transition-colors">
                                                <Play className="h-4 w-4" />
                                            </button>
                                        ) : null}
                                        <button className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty State */}
                    {filteredPrograms.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">
                                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">
                                    <Settings className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No referral programs found</h3>
                                <p className="text-gray-500">Try adjusting your filters or create a new program.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            {filteredPrograms.length > 0 && (
                <div className="text-sm text-gray-500 text-center">
                    Showing {filteredPrograms.length} of {samplePrograms.length} referral programs
                </div>
            )}
        </div>
    );
}
