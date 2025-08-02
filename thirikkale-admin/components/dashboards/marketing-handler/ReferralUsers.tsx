"use client";

import React, { useEffect, useState } from "react";
import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    UserPlus,
    Star,
    Search,
    Calendar,
    Eye,
    Edit,
    Gift,
    CheckCircle,
    Clock,
    XCircle
} from "lucide-react";

interface ReferralUser {
    id: string;
    name: string;
    email: string;
    city: string;
    joinDate: string;
    referralCode: string;
    totalReferrals: number;
    successfulReferrals: number;
    pendingReferrals: number;
    totalRewardsEarned: number;
    lifetimeValue: number;
    status: "Active" | "Inactive" | "Suspended";
    tier: "Bronze" | "Silver" | "Gold" | "Platinum";
    lastActivity: string;
    avatar: string;
}

const sampleReferralUsers: ReferralUser[] = [
    {
        id: "RU001",
        name: "John Doe",
        email: "john.doe@email.com",
        city: "Colombo",
        joinDate: "2024-01-15",
        referralCode: "JOHN2024",
        totalReferrals: 12,
        successfulReferrals: 10,
        pendingReferrals: 2,
        totalRewardsEarned: 2500,
        lifetimeValue: 15600,
        status: "Active",
        tier: "Gold",
        lastActivity: "2 hours ago",
        avatar: "👨‍💼"
    },
    {
        id: "RU002",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        city: "Gampaha",
        joinDate: "2024-01-20",
        referralCode: "SARAH24",
        totalReferrals: 8,
        successfulReferrals: 7,
        pendingReferrals: 1,
        totalRewardsEarned: 1750,
        lifetimeValue: 9800,
        status: "Active",
        tier: "Silver",
        lastActivity: "1 day ago",
        avatar: "👩‍💻"
    },
    {
        id: "RU003",
        name: "Mike Chen",
        email: "mike.chen@email.com",
        city: "Kandy",
        joinDate: "2024-02-01",
        referralCode: "MIKE2024",
        totalReferrals: 15,
        successfulReferrals: 14,
        pendingReferrals: 1,
        totalRewardsEarned: 3500,
        lifetimeValue: 22400,
        status: "Active",
        tier: "Platinum",
        lastActivity: "3 hours ago",
        avatar: "👨‍🚀"
    },
    {
        id: "RU004",
        name: "Emily Davis",
        email: "emily.d@email.com",
        city: "Matara",
        joinDate: "2024-01-10",
        referralCode: "EMILY24",
        totalReferrals: 5,
        successfulReferrals: 4,
        pendingReferrals: 0,
        totalRewardsEarned: 1000,
        lifetimeValue: 6200,
        status: "Inactive",
        tier: "Bronze",
        lastActivity: "1 week ago",
        avatar: "👩‍🎨"
    },
    {
        id: "RU005",
        name: "David Wilson",
        email: "david.w@email.com",
        city: "Negombo",
        joinDate: "2024-02-15",
        referralCode: "DAVID24",
        totalReferrals: 20,
        successfulReferrals: 18,
        pendingReferrals: 2,
        totalRewardsEarned: 4500,
        lifetimeValue: 31200,
        status: "Active",
        tier: "Platinum",
        lastActivity: "30 minutes ago",
        avatar: "👨‍🔬"
    },
    {
        id: "RU006",
        name: "Lisa Brown",
        email: "lisa.b@email.com",
        city: "Galle",
        joinDate: "2024-01-25",
        referralCode: "LISA2024",
        totalReferrals: 3,
        successfulReferrals: 2,
        pendingReferrals: 0,
        totalRewardsEarned: 500,
        lifetimeValue: 3100,
        status: "Suspended",
        tier: "Bronze",
        lastActivity: "2 weeks ago",
        avatar: "👩‍🏫"
    }
];

const tabs = [
    { name: 'All', count: 156 },
    { name: 'Active', count: 134 },
    { name: 'Inactive', count: 18 },
    { name: 'Suspended', count: 4 }
];

export default function ReferralUsers() {
    const { setPageHeader } = usePageHeader();
    const [activeTab, setActiveTab] = useState('All');
    const [searchFilters, setSearchFilters] = useState({
        name: '',
        email: '',
        referralCode: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        setPageHeader({
            title: "Referral Users",
            subtitle: "Manage users who participate in referral programs"
        });
    }, [setPageHeader]);

    const stats = [
        {
            title: "Total Referral Users",
            value: "156",
            change: "+12% this month",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Total Referrals Made",
            value: "892",
            change: "+18% vs last month",
            icon: UserPlus,
            color: "text-green-600"
        },
        {
            title: "Successful Referrals",
            value: "784",
            change: "87.9% success rate",
            icon: CheckCircle,
            color: "text-emerald-600"
        },
        {
            title: "Total Rewards Paid",
            value: "$18,420",
            change: "+25% this month",
            icon: Gift,
            color: "text-purple-600"
        }
    ];

    // Filter users based on selected filters and active tab
    const filteredUsers = sampleReferralUsers.filter(user => {
        // Filter by active tab
        if (activeTab !== 'All') {
            if (user.status !== activeTab) return false;
        }

        // Filter by search filters
        if (searchFilters.name && !user.name.toLowerCase().includes(searchFilters.name.toLowerCase())) return false;
        if (searchFilters.email && !user.email.toLowerCase().includes(searchFilters.email.toLowerCase())) return false;
        if (searchFilters.referralCode && !user.referralCode.toLowerCase().includes(searchFilters.referralCode.toLowerCase())) return false;
        if (searchFilters.dateFrom && new Date(user.joinDate) < new Date(searchFilters.dateFrom)) return false;
        if (searchFilters.dateTo && new Date(user.joinDate) > new Date(searchFilters.dateTo)) return false;

        return true;
    });

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800 border-green-200";
            case "Inactive": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Suspended": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getTierBadgeStyle = (tier: string) => {
        switch (tier) {
            case "Platinum": return "bg-purple-100 text-purple-800 border-purple-200";
            case "Gold": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Silver": return "bg-gray-100 text-gray-800 border-gray-200";
            case "Bronze": return "bg-orange-100 text-orange-800 border-orange-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Active": return CheckCircle;
            case "Inactive": return Clock;
            case "Suspended": return XCircle;
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Name Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="User Name"
                                value={searchFilters.name}
                                onChange={(e) => handleFilterChange('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        {/* Email Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Email"
                                value={searchFilters.email}
                                onChange={(e) => handleFilterChange('email', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        {/* Referral Code Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Referral Code"
                                value={searchFilters.referralCode}
                                onChange={(e) => handleFilterChange('referralCode', e.target.value)}
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
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">User Info</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Referral Code</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Total Referrals</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Successful</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Pending</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rewards Earned</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Tier</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* User Rows */}
                    {filteredUsers.map((user) => {
                        const StatusIcon = getStatusIcon(user.status);
                        return (
                            <div key={user.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                                    {/* User Info Column */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm border border-gray-300">
                                                {user.avatar}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="mb-1">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{user.city}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs text-gray-400">ID:</span>
                                                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                    {user.id}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Referral Code Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-md">
                                            {user.referralCode}
                                        </span>
                                    </div>

                                    {/* Total Referrals Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-gray-900">{user.totalReferrals}</span>
                                    </div>

                                    {/* Successful Referrals Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-green-600">{user.successfulReferrals}</span>
                                    </div>

                                    {/* Pending Referrals Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-yellow-600">{user.pendingReferrals}</span>
                                    </div>

                                    {/* Rewards Earned Column */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-sm font-bold text-green-600">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            {user.totalRewardsEarned.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Tier Column */}
                                    <div className="flex justify-center">
                                        <Badge className={`${getTierBadgeStyle(user.tier)} border`}>
                                            {user.tier}
                                        </Badge>
                                    </div>

                                    {/* Status Column */}
                                    <div className="flex justify-center">
                                        <Badge className={`${getStatusBadgeStyle(user.status)} border flex items-center gap-1`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {user.status}
                                        </Badge>
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
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">
                                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No referral users found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            {filteredUsers.length > 0 && (
                <div className="text-sm text-gray-500 text-center">
                    Showing {filteredUsers.length} of {sampleReferralUsers.length} referral users
                </div>
            )}
        </div>
    );
}
