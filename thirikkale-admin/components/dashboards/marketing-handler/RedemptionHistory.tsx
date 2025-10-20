"use client";

import React, { useEffect, useState } from "react";
import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { Badge } from "@/components/ui/badge";
import {
    Gift,
    User,
    TrendingUp,
    Search,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    Star,
    Package,
    Eye,
    Edit
} from "lucide-react";

interface Redemption {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    city: string;
    rewardType: string;
    rewardValue: string;
    pointsUsed: number;
    remainingPoints: number;
    status: "Redeemed" | "Pending" | "Processing" | "Expired";
    redeemedAt: string;
    usedAt: string | null;
    expiresAt: string;
    avatar: string;
}

const sampleRedemptions: Redemption[] = [
    {
        id: "R001",
        userId: "U001",
        userName: "John Doe",
        userEmail: "john.doe@email.com",
        city: "Colombo",
        rewardType: "Ride Discount",
        rewardValue: "10% off next ride",
        pointsUsed: 500,
        remainingPoints: 1950,
        status: "Redeemed",
        redeemedAt: "2024-01-15",
        usedAt: "2024-01-15",
        expiresAt: "2024-02-15",
        avatar: "👨‍💼"
    },
    {
        id: "R002",
        userId: "U002",
        userName: "Sarah Johnson",
        userEmail: "sarah.j@email.com",
        city: "Gampaha",
        rewardType: "Free Ride",
        rewardValue: "Up to $20 ride credit",
        pointsUsed: 1500,
        remainingPoints: 850,
        status: "Pending",
        redeemedAt: "2024-01-14",
        usedAt: null,
        expiresAt: "2024-02-14",
        avatar: "👩‍💻"
    },
    {
        id: "R003",
        userId: "U003",
        userName: "Mike Chen",
        userEmail: "mike.chen@email.com",
        city: "Kandy",
        rewardType: "Gift Card",
        rewardValue: "$50 Amazon Gift Card",
        pointsUsed: 2500,
        remainingPoints: 13100,
        status: "Processing",
        redeemedAt: "2024-01-13",
        usedAt: null,
        expiresAt: "2024-03-13",
        avatar: "👨‍🚀"
    },
    {
        id: "R004",
        userId: "U004",
        userName: "Emily Davis",
        userEmail: "emily.d@email.com",
        city: "Matara",
        rewardType: "Priority Booking",
        rewardValue: "24h priority booking",
        pointsUsed: 300,
        remainingPoints: 340,
        status: "Expired",
        redeemedAt: "2023-12-10",
        usedAt: null,
        expiresAt: "2024-01-10",
        avatar: "👩‍🎨"
    },
    {
        id: "R005",
        userId: "U001",
        userName: "John Doe",
        userEmail: "john.doe@email.com",
        city: "Colombo",
        rewardType: "Premium Upgrade",
        rewardValue: "Business class upgrade",
        pointsUsed: 800,
        remainingPoints: 1650,
        status: "Redeemed",
        redeemedAt: "2024-01-12",
        usedAt: "2024-01-12",
        expiresAt: "2024-02-12",
        avatar: "👨‍💼"
    },
    {
        id: "R006",
        userId: "U005",
        userName: "David Wilson",
        userEmail: "david.w@email.com",
        city: "Negombo",
        rewardType: "Meal Voucher",
        rewardValue: "$25 restaurant credit",
        pointsUsed: 750,
        remainingPoints: 7050,
        status: "Processing",
        redeemedAt: "2024-01-11",
        usedAt: null,
        expiresAt: "2024-02-11",
        avatar: "👨‍🔬"
    },
    {
        id: "R007",
        userId: "U006",
        userName: "Lisa Brown",
        userEmail: "lisa.b@email.com",
        city: "Galle",
        rewardType: "Fuel Discount",
        rewardValue: "15% off fuel purchase",
        pointsUsed: 400,
        remainingPoints: 180,
        status: "Pending",
        redeemedAt: "2024-01-10",
        usedAt: null,
        expiresAt: "2024-02-10",
        avatar: "👩‍🏫"
    },
    {
        id: "R008",
        userId: "U007",
        userName: "Ahmed Hassan",
        userEmail: "ahmed.h@email.com",
        city: "Jaffna",
        rewardType: "Shopping Voucher",
        rewardValue: "$100 mall credit",
        pointsUsed: 3000,
        remainingPoints: 1200,
        status: "Redeemed",
        redeemedAt: "2024-01-09",
        usedAt: "2024-01-20",
        expiresAt: "2024-04-09",
        avatar: "👨‍⚕️"
    }
];

const tabs = [
    { name: 'All', count: 1234 },
    { name: 'Redeemed', count: 890 },
    { name: 'Pending', count: 234 },
    { name: 'Processing', count: 78 },
    { name: 'Expired', count: 32 }
];

export default function RedemptionHistory() {
    const { setPageHeader } = usePageHeader();
    const [activeTab, setActiveTab] = useState('All');
    const [searchFilters, setSearchFilters] = useState({
        id: '',
        userName: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        setPageHeader({
            title: "Redemption History",
            subtitle: "Track point redemptions and reward claims across all users"
        });
    }, [setPageHeader]);

    const stats = [
        {
            title: "Total Redemptions",
            value: "1,234",
            change: "+18% this month",
            icon: Gift,
            color: "text-green-600"
        },
        {
            title: "Points Redeemed",
            value: "890K",
            change: "+23% vs last month",
            icon: Star,
            color: "text-yellow-600"
        },
        {
            title: "Active Redemptions",
            value: "456",
            change: "Currently processing",
            icon: User,
            color: "text-blue-600"
        },
        {
            title: "Avg Redemption Value",
            value: "720",
            change: "Points per redemption",
            icon: TrendingUp,
            color: "text-purple-600"
        }
    ];

    // Filter redemptions based on selected filters and active tab
    const filteredRedemptions = sampleRedemptions.filter(redemption => {
        // Filter by active tab
        if (activeTab !== 'All') {
            if (redemption.status !== activeTab) return false;
        }

        // Filter by search filters
        if (searchFilters.id && !redemption.id.toLowerCase().includes(searchFilters.id.toLowerCase())) return false;
        if (searchFilters.userName && !redemption.userName.toLowerCase().includes(searchFilters.userName.toLowerCase())) return false;
        if (searchFilters.dateFrom && new Date(redemption.redeemedAt) < new Date(searchFilters.dateFrom)) return false;
        if (searchFilters.dateTo && new Date(redemption.redeemedAt) > new Date(searchFilters.dateTo)) return false;

        return true;
    });

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "Redeemed": return "bg-green-100 text-green-800 border-green-200";
            case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Processing": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Expired": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Redeemed": return CheckCircle;
            case "Pending": return Clock;
            case "Processing": return Package;
            case "Expired": return AlertCircle;
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
                        {/* Redemption ID Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Redemption ID"
                                value={searchFilters.id}
                                onChange={(e) => handleFilterChange('id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        {/* User Name Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="User Name"
                                value={searchFilters.userName}
                                onChange={(e) => handleFilterChange('userName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
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
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">User Info</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Reward Details</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Points Used</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Remaining Points</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Redeemed Date</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Expires Date</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* Redemption Rows */}
                    {filteredRedemptions.map((redemption) => {
                        const StatusIcon = getStatusIcon(redemption.status);
                        return (
                            <div key={redemption.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                                    {/* User Info Column */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm border border-gray-300">
                                                {redemption.avatar}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="mb-1">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{redemption.userName}</p>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{redemption.city}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs text-gray-400">ID:</span>
                                                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                    {redemption.id}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{redemption.userEmail}</p>
                                        </div>
                                    </div>

                                    {/* Reward Details Column */}
                                    <div className="text-center">
                                        <div className="mb-1">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{redemption.rewardType}</p>
                                        </div>
                                        <p className="text-xs text-gray-600 truncate">{redemption.rewardValue}</p>
                                    </div>

                                    {/* Points Used Column */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-sm font-bold text-red-600">
                                            <Star className="h-4 w-4 text-red-500" />
                                            -{redemption.pointsUsed.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Remaining Points Column */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-sm font-bold text-green-600">
                                            <Star className="h-4 w-4 text-green-500" />
                                            {redemption.remainingPoints.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Status Column */}
                                    <div className="flex justify-center">
                                        <Badge className={`${getStatusBadgeStyle(redemption.status)} border flex items-center gap-1`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {redemption.status}
                                        </Badge>
                                    </div>

                                    {/* Redeemed Date Column */}
                                    <div className="text-sm text-gray-700 text-center">
                                        {new Date(redemption.redeemedAt).toLocaleDateString()}
                                    </div>

                                    {/* Expires Date Column */}
                                    <div className="text-sm text-gray-700 text-center">
                                        {new Date(redemption.expiresAt).toLocaleDateString()}
                                    </div>

                                    {/* Actions Column */}
                                    <div className="flex justify-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-50 transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty State */}
                    {filteredRedemptions.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">
                                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">
                                    <Gift className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No redemptions found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            {filteredRedemptions.length > 0 && (
                <div className="text-sm text-gray-500 text-center">
                    Showing {filteredRedemptions.length} of {sampleRedemptions.length} redemptions
                </div>
            )}
        </div>
    );
}
