"use client";

import React, { useEffect, useState } from "react";
import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Star,
    TrendingUp,
    Gift,
    Clock,
    Search,
    Eye,
    Edit
} from "lucide-react";

interface UserPoint {
    id: string;
    name: string;
    email: string;
    city: string;
    currentPoints: number;
    lifetimePoints: number;
    tier: "Bronze" | "Silver" | "Gold" | "Platinum";
    lastActivity: string;
    joinDate: string;
    status: "Active" | "Inactive";
    avatar: string;
}

const sampleUsers: UserPoint[] = [
    {
        id: 'U001',
        name: 'John Doe',
        email: 'john.doe@email.com',
        city: 'Colombo',
        currentPoints: 2450,
        lifetimePoints: 8750,
        tier: 'Gold',
        lastActivity: '2 hours ago',
        joinDate: '2024-01-15',
        status: 'Active',
        avatar: '👨‍💼'
    },
    {
        id: 'U002',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        city: 'Gampaha',
        currentPoints: 850,
        lifetimePoints: 3200,
        tier: 'Silver',
        lastActivity: '1 day ago',
        joinDate: '2024-02-20',
        status: 'Active',
        avatar: '👩‍💻'
    },
    {
        id: 'U003',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        city: 'Kandy',
        currentPoints: 15600,
        lifetimePoints: 28400,
        tier: 'Platinum',
        lastActivity: '3 hours ago',
        joinDate: '2023-11-10',
        status: 'Active',
        avatar: '👨‍🚀'
    },
    {
        id: 'U004',
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        city: 'Matara',
        currentPoints: 340,
        lifetimePoints: 1890,
        tier: 'Bronze',
        lastActivity: '5 hours ago',
        joinDate: '2024-03-05',
        status: 'Active',
        avatar: '👩‍🎨'
    },
    {
        id: 'U005',
        name: 'David Wilson',
        email: 'david.w@email.com',
        city: 'Negombo',
        currentPoints: 7800,
        lifetimePoints: 12300,
        tier: 'Gold',
        lastActivity: '1 hour ago',
        joinDate: '2023-12-18',
        status: 'Inactive',
        avatar: '👨‍🔬'
    },
    {
        id: 'U006',
        name: 'Lisa Brown',
        email: 'lisa.b@email.com',
        city: 'Galle',
        currentPoints: 180,
        lifetimePoints: 980,
        tier: 'Bronze',
        lastActivity: '2 days ago',
        joinDate: '2024-04-12',
        status: 'Active',
        avatar: '👩‍🏫'
    },
    {
        id: 'U007',
        name: 'Ahmed Hassan',
        email: 'ahmed.h@email.com',
        city: 'Jaffna',
        currentPoints: 4200,
        lifetimePoints: 9800,
        tier: 'Gold',
        lastActivity: '4 hours ago',
        joinDate: '2023-10-22',
        status: 'Active',
        avatar: '👨‍⚕️'
    },
    {
        id: 'U008',
        name: 'Maya Patel',
        email: 'maya.p@email.com',
        city: 'Anuradhapura',
        currentPoints: 1250,
        lifetimePoints: 4500,
        tier: 'Silver',
        lastActivity: '6 hours ago',
        joinDate: '2024-01-28',
        status: 'Active',
        avatar: '👩‍🔬'
    }
];

const tabs = [
    { name: 'All', count: 156 },
    { name: 'Active', count: 128 },
    { name: 'Inactive', count: 28 },
    { name: 'Bronze', count: 45 },
    { name: 'Silver', count: 38 },
    { name: 'Gold', count: 52 },
    { name: 'Platinum', count: 21 }
];

export default function UserPoints() {
    const { setPageHeader } = usePageHeader();
    const [activeTab, setActiveTab] = useState('All');
    const [searchFilters, setSearchFilters] = useState({
        id: '',
        name: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        setPageHeader({
            title: "User Points Management",
            subtitle: "Manage individual user point balances and reward tiers"
        });
    }, [setPageHeader]);

    const stats = [
        {
            title: "Total Active Users",
            value: "12.4K",
            change: "+8% this month",
            icon: User,
            color: "text-blue-600"
        },
        {
            title: "Points Distributed",
            value: "2.4M",
            change: "+15% vs last month",
            icon: Star,
            color: "text-yellow-600"
        },
        {
            title: "Points Redeemed",
            value: "890K",
            change: "+23% redemption rate",
            icon: Gift,
            color: "text-green-600"
        },
        {
            title: "Avg Points Balance",
            value: "1,456",
            change: "+5% increase",
            icon: TrendingUp,
            color: "text-purple-600"
        }
    ];

    // Filter users based on selected filters and active tab
    const filteredUsers = sampleUsers.filter(user => {
        // Filter by active tab
        if (activeTab !== 'All') {
            if (activeTab === 'Active' && user.status !== 'Active') return false;
            if (activeTab === 'Inactive' && user.status !== 'Inactive') return false;
            if (['Bronze', 'Silver', 'Gold', 'Platinum'].includes(activeTab) && user.tier !== activeTab) return false;
        }

        // Filter by search filters
        if (searchFilters.id && !user.id.toLowerCase().includes(searchFilters.id.toLowerCase())) return false;
        if (searchFilters.name && !user.name.toLowerCase().includes(searchFilters.name.toLowerCase())) return false;
        if (searchFilters.dateFrom && new Date(user.joinDate) < new Date(searchFilters.dateFrom)) return false;
        if (searchFilters.dateTo && new Date(user.joinDate) > new Date(searchFilters.dateTo)) return false;

        return true;
    });

    const getTierBadgeStyle = (tier: string) => {
        switch (tier) {
            case "Bronze": return "bg-amber-100 text-amber-800 border-amber-200";
            case "Silver": return "bg-gray-100 text-gray-800 border-gray-200";
            case "Gold": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Platinum": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800 border-green-200";
            case "Inactive": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
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
                        {/* User ID Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="User ID"
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
                                value={searchFilters.name}
                                onChange={(e) => handleFilterChange('name', e.target.value)}
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
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>

                        {/* Date To Filter */}
                        <div className="relative">
                            <input
                                type="date"
                                value={searchFilters.dateTo}
                                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gray-100 border-b-2 border-gray-300">
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr 1.5fr' }}>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">User Info</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Tier</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Current Points</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Lifetime Points</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>

                    {/* User Rows */}
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                            <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr 1.5fr' }}>
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
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs text-gray-500">{user.lastActivity}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Column */}
                                <div className="text-sm text-gray-700 truncate text-center" title={user.email}>
                                    {user.email}
                                </div>

                                {/* Tier Column */}
                                <div className="text-center">
                                    <Badge className={`${getTierBadgeStyle(user.tier)} border`}>
                                        {user.tier}
                                    </Badge>
                                </div>

                                {/* Current Points Column */}
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        {user.currentPoints.toLocaleString()}
                                    </div>
                                </div>

                                {/* Lifetime Points Column */}
                                <div className="text-sm text-gray-700 text-center font-medium">
                                    {user.lifetimePoints.toLocaleString()}
                                </div>

                                {/* Status Column */}
                                <div className="text-center">
                                    <Badge className={`${getStatusBadgeStyle(user.status)} border`}>
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
                    ))}

                    {/* Empty State */}
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">
                                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">
                                    <User className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            {filteredUsers.length > 0 && (
                <div className="text-sm text-gray-500 text-center">
                    Showing {filteredUsers.length} of {sampleUsers.length} users
                </div>
            )}
        </div>
    );
}
