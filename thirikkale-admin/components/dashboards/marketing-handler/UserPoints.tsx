"use client";

import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { useEffect, useState } from "react";
import {
    User,
    Star,
    TrendingUp,
    Search,
    Filter,
    Gift,
    ArrowUpRight,
    ArrowDownLeft,
    Eye,
    Clock,
    Activity
} from "lucide-react";

export default function UserPoints() {
    const { setPageHeader } = usePageHeader();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    useEffect(() => {
        setPageHeader({
            title: "User Points",
            subtitle: "Manage individual user point balances and transaction history"
        });
    }, [setPageHeader]);

    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@email.com",
            currentPoints: 2450,
            lifetimePoints: 8750,
            tier: "Gold",
            lastActivity: "2 hours ago",
            avatar: "JD",
            status: "Active"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.j@email.com",
            currentPoints: 850,
            lifetimePoints: 3200,
            tier: "Silver",
            lastActivity: "1 day ago",
            avatar: "SJ",
            status: "Active"
        },
        {
            id: 3,
            name: "Mike Chen",
            email: "mike.chen@email.com",
            currentPoints: 15600,
            lifetimePoints: 28400,
            tier: "Platinum",
            lastActivity: "3 hours ago",
            avatar: "MC",
            status: "Active"
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily.d@email.com",
            currentPoints: 340,
            lifetimePoints: 1890,
            tier: "Bronze",
            lastActivity: "5 hours ago",
            avatar: "ED",
            status: "Active"
        }
    ];

    const transactions = [
        {
            id: 1,
            userId: 1,
            type: "earned",
            points: 150,
            description: "Ride completion bonus",
            date: "2024-01-15T10:30:00",
            source: "ride"
        },
        {
            id: 2,
            userId: 1,
            type: "redeemed",
            points: -500,
            description: "10% discount on ride",
            date: "2024-01-14T18:45:00",
            source: "redemption"
        },
        {
            id: 3,
            userId: 1,
            type: "earned",
            points: 100,
            description: "Referral bonus",
            date: "2024-01-13T14:20:00",
            source: "referral"
        },
        {
            id: 4,
            userId: 1,
            type: "earned",
            points: 75,
            description: "Peak hour ride bonus",
            date: "2024-01-12T08:15:00",
            source: "bonus"
        }
    ];

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
            title: "Avg Balance",
            value: "1,456",
            change: "+5% increase",
            icon: TrendingUp,
            color: "text-purple-600"
        }
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedUserTransactions = selectedUser
        ? transactions.filter(t => t.userId === selectedUser)
        : [];

    const getTierColor = (tier: string) => {
        switch (tier) {
            case "Bronze": return "bg-amber-100 text-amber-700";
            case "Silver": return "bg-gray-100 text-gray-700";
            case "Gold": return "bg-yellow-100 text-yellow-700";
            case "Platinum": return "bg-purple-100 text-purple-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6 space-y-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Users List */}
                <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">User Points</h2>
                                <p className="text-gray-600 mt-1">
                                    View and manage user point balances
                                </p>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedUser === user.id ? 'ring-2 ring-blue-500 border-blue-500' : ''
                                        }`}
                                    onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTierColor(user.tier)}`}>
                                                        {user.tier}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {user.lastActivity}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                                                <Star className="h-5 w-5 text-yellow-500" />
                                                {user.currentPoints.toLocaleString()}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {user.lifetimePoints.toLocaleString()} lifetime
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                            Transaction History
                        </h3>
                        {selectedUser && (
                            <p className="text-sm text-gray-600 mt-1">
                                {users.find(u => u.id === selectedUser)?.name}
                            </p>
                        )}
                    </div>
                    <div className="p-6">
                        {!selectedUser ? (
                            <div className="text-center py-8">
                                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">Select a user to view transaction history</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {selectedUserTransactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${transaction.type === 'earned'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                                }`}>
                                                {transaction.type === 'earned' ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownLeft className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{transaction.description}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(transaction.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`font-bold ${transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
