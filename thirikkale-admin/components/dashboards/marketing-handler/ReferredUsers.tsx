"use client";

import React, { useEffect, useState } from "react";
import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    UserCheck,
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

interface ReferredUser {
    id: string;
    name: string;
    email: string;
    city: string;
    joinDate: string;
    referredBy: {
        id: string;
        name: string;
        referralCode: string;
    };
    status: "Active" | "Inactive" | "Pending" | "Rejected";
    verificationStatus: "Verified" | "Pending" | "Failed";
    firstRideDate: string | null;
    totalRides: number;
    totalSpent: number;
    rewardsEarned: number;
    referrerRewardPaid: number;
    lifetimeValue: number;
    tier: "Bronze" | "Silver" | "Gold" | "Platinum";
    lastActivity: string;
    avatar: string;
}

const sampleReferredUsers: ReferredUser[] = [
    {
        id: "RF001",
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        city: "Colombo",
        joinDate: "2024-07-15",
        referredBy: {
            id: "RU001",
            name: "John Doe",
            referralCode: "JOHN2024"
        },
        status: "Active",
        verificationStatus: "Verified",
        firstRideDate: "2024-07-16",
        totalRides: 28,
        totalSpent: 1250,
        rewardsEarned: 750,
        referrerRewardPaid: 1000,
        lifetimeValue: 1250,
        tier: "Silver",
        lastActivity: "2 hours ago",
        avatar: "👨‍💼"
    },
    {
        id: "RF002",
        name: "Maria Garcia",
        email: "maria.g@email.com",
        city: "Gampaha",
        joinDate: "2024-07-20",
        referredBy: {
            id: "RU002",
            name: "Sarah Johnson",
            referralCode: "SARAH24"
        },
        status: "Active",
        verificationStatus: "Verified",
        firstRideDate: "2024-07-22",
        totalRides: 15,
        totalSpent: 680,
        rewardsEarned: 340,
        referrerRewardPaid: 1500,
        lifetimeValue: 680,
        tier: "Bronze",
        lastActivity: "1 day ago",
        avatar: "👩‍💻"
    },
    {
        id: "RF003",
        name: "David Kim",
        email: "david.kim@email.com",
        city: "Kandy",
        joinDate: "2024-07-25",
        referredBy: {
            id: "RU003",
            name: "Mike Chen",
            referralCode: "MIKE2024"
        },
        status: "Active",
        verificationStatus: "Verified",
        firstRideDate: "2024-07-25",
        totalRides: 42,
        totalSpent: 2100,
        rewardsEarned: 1200,
        referrerRewardPaid: 2500,
        lifetimeValue: 2100,
        tier: "Gold",
        lastActivity: "30 minutes ago",
        avatar: "👨‍🚀"
    },
    {
        id: "RF004",
        name: "Sophie Miller",
        email: "sophie.m@email.com",
        city: "Matara",
        joinDate: "2024-07-28",
        referredBy: {
            id: "RU001",
            name: "John Doe",
            referralCode: "JOHN2024"
        },
        status: "Pending",
        verificationStatus: "Pending",
        firstRideDate: null,
        totalRides: 0,
        totalSpent: 0,
        rewardsEarned: 0,
        referrerRewardPaid: 0,
        lifetimeValue: 0,
        tier: "Bronze",
        lastActivity: "1 week ago",
        avatar: "👩‍🎨"
    },
    {
        id: "RF005",
        name: "James Wilson",
        email: "james.w@email.com",
        city: "Negombo",
        joinDate: "2024-07-30",
        referredBy: {
            id: "RU005",
            name: "David Wilson",
            referralCode: "DAVID24"
        },
        status: "Active",
        verificationStatus: "Verified",
        firstRideDate: "2024-07-31",
        totalRides: 12,
        totalSpent: 540,
        rewardsEarned: 270,
        referrerRewardPaid: 4500,
        lifetimeValue: 540,
        tier: "Bronze",
        lastActivity: "3 hours ago",
        avatar: "👨‍🔬"
    },
    {
        id: "RF006",
        name: "Emma Brown",
        email: "emma.b@email.com",
        city: "Galle",
        joinDate: "2024-07-18",
        referredBy: {
            id: "RU006",
            name: "Lisa Brown",
            referralCode: "LISA2024"
        },
        status: "Rejected",
        verificationStatus: "Failed",
        firstRideDate: null,
        totalRides: 0,
        totalSpent: 0,
        rewardsEarned: 0,
        referrerRewardPaid: 0,
        lifetimeValue: 0,
        tier: "Bronze",
        lastActivity: "2 weeks ago",
        avatar: "👩‍🏫"
    },
    {
        id: "RF007",
        name: "Michael Chang",
        email: "michael.c@email.com",
        city: "Jaffna",
        joinDate: "2024-08-01",
        referredBy: {
            id: "RU003",
            name: "Mike Chen",
            referralCode: "MIKE2024"
        },
        status: "Active",
        verificationStatus: "Verified",
        firstRideDate: "2024-08-02",
        totalRides: 8,
        totalSpent: 380,
        rewardsEarned: 190,
        referrerRewardPaid: 2500,
        lifetimeValue: 380,
        tier: "Bronze",
        lastActivity: "1 hour ago",
        avatar: "👨‍⚕️"
    }
];

const tabs = [
    { name: 'All', count: 234 },
    { name: 'Active', count: 189 },
    { name: 'Pending', count: 32 },
    { name: 'Rejected', count: 13 }
];

export default function ReferredUsers() {
    const { setPageHeader } = usePageHeader();
    const [activeTab, setActiveTab] = useState('All');
    const [searchFilters, setSearchFilters] = useState({
        name: '',
        email: '',
        referrerName: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        setPageHeader({
            title: "Referred Users",
            subtitle: "Manage users who joined through referral programs"
        });
    }, [setPageHeader]);

    const stats = [
        {
            title: "Total Referred Users",
            value: "234",
            change: "+28% this month",
            icon: UserPlus,
            color: "text-blue-600"
        },
        {
            title: "Successful Referrals",
            value: "189",
            change: "80.8% success rate",
            icon: UserCheck,
            color: "text-green-600"
        },
        {
            title: "Total Revenue",
            value: "$15,670",
            change: "+32% vs last month",
            icon: Gift,
            color: "text-emerald-600"
        },
        {
            title: "Avg. Lifetime Value",
            value: "$892",
            change: "Per referred user",
            icon: Star,
            color: "text-purple-600"
        }
    ];

    // Filter users based on selected filters and active tab
    const filteredUsers = sampleReferredUsers.filter(user => {
        // Filter by active tab
        if (activeTab !== 'All') {
            if (user.status !== activeTab) return false;
        }

        // Filter by search filters
        if (searchFilters.name && !user.name.toLowerCase().includes(searchFilters.name.toLowerCase())) return false;
        if (searchFilters.email && !user.email.toLowerCase().includes(searchFilters.email.toLowerCase())) return false;
        if (searchFilters.referrerName && !user.referredBy.name.toLowerCase().includes(searchFilters.referrerName.toLowerCase())) return false;
        if (searchFilters.dateFrom && new Date(user.joinDate) < new Date(searchFilters.dateFrom)) return false;
        if (searchFilters.dateTo && new Date(user.joinDate) > new Date(searchFilters.dateTo)) return false;

        return true;
    });

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800 border-green-200";
            case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Inactive": return "bg-gray-100 text-gray-800 border-gray-200";
            case "Rejected": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getVerificationBadgeStyle = (status: string) => {
        switch (status) {
            case "Verified": return "bg-green-100 text-green-800 border-green-200";
            case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Failed": return "bg-red-100 text-red-800 border-red-200";
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
            case "Pending": return Clock;
            case "Inactive": return Clock;
            case "Rejected": return XCircle;
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

                        {/* Referrer Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Referrer Name"
                                value={searchFilters.referrerName}
                                onChange={(e) => handleFilterChange('referrerName', e.target.value)}
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
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">User Info</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Referred By</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Total Rides</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Total Spent</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">LTV</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Verification</div>
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
                                <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr' }}>
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

                                    {/* Referred By Column */}
                                    <div className="text-center">
                                        <div className="mb-1">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.referredBy.name}</p>
                                        </div>
                                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 mb-1">
                                            <span className="text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded">
                                                {user.referredBy.referralCode}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
                                            <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Total Rides Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-gray-900">{user.totalRides}</span>
                                        {user.firstRideDate && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                First: {new Date(user.firstRideDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>

                                    {/* Total Spent Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-green-600">${user.totalSpent}</span>
                                    </div>

                                    {/* Lifetime Value Column */}
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-purple-600">${user.lifetimeValue}</span>
                                    </div>

                                    {/* Verification Status Column */}
                                    <div className="flex justify-center">
                                        <Badge className={`${getVerificationBadgeStyle(user.verificationStatus)} border text-xs`}>
                                            {user.verificationStatus}
                                        </Badge>
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
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No referred users found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            {filteredUsers.length > 0 && (
                <div className="text-sm text-gray-500 text-center">
                    Showing {filteredUsers.length} of {sampleReferredUsers.length} referred users
                </div>
            )}
        </div>
    );
}
