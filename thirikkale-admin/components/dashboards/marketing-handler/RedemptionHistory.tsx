"use client";

import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { useEffect, useState } from "react";
import {
    Gift,
    User,
    TrendingUp,
    Search,
    Filter,
    Calendar,
    Download,
    CheckCircle,
    Clock,
    AlertCircle,
    Star,
    Package,
    Eye
} from "lucide-react";

export default function RedemptionHistory() {
    const { setPageHeader } = usePageHeader();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        setPageHeader({
            title: "Redemption History",
            subtitle: "Track point redemptions and reward claims"
        });
    }, [setPageHeader]);

    const redemptions = [
        {
            id: 1,
            userId: 1,
            userName: "John Doe",
            userEmail: "john.doe@email.com",
            rewardType: "Ride Discount",
            rewardValue: "10% off next ride",
            pointsUsed: 500,
            status: "Redeemed",
            redeemedAt: "2024-01-15T14:30:00",
            usedAt: "2024-01-15T18:45:00",
            expiresAt: "2024-02-15T14:30:00"
        },
        {
            id: 2,
            userId: 2,
            userName: "Sarah Johnson",
            userEmail: "sarah.j@email.com",
            rewardType: "Free Ride",
            rewardValue: "Up to $20 ride credit",
            pointsUsed: 1500,
            status: "Pending",
            redeemedAt: "2024-01-14T10:15:00",
            usedAt: null,
            expiresAt: "2024-02-14T10:15:00"
        },
        {
            id: 3,
            userId: 3,
            userName: "Mike Chen",
            userEmail: "mike.chen@email.com",
            rewardType: "Gift Card",
            rewardValue: "$50 Amazon Gift Card",
            pointsUsed: 2500,
            status: "Processing",
            redeemedAt: "2024-01-13T16:20:00",
            usedAt: null,
            expiresAt: "2024-03-13T16:20:00"
        },
        {
            id: 4,
            userId: 4,
            userName: "Emily Davis",
            userEmail: "emily.d@email.com",
            rewardType: "Priority Booking",
            rewardValue: "24h priority booking",
            pointsUsed: 300,
            status: "Expired",
            redeemedAt: "2023-12-10T09:30:00",
            usedAt: null,
            expiresAt: "2024-01-10T09:30:00"
        },
        {
            id: 5,
            userId: 1,
            userName: "John Doe",
            userEmail: "john.doe@email.com",
            rewardType: "Premium Upgrade",
            rewardValue: "Business class upgrade",
            pointsUsed: 800,
            status: "Redeemed",
            redeemedAt: "2024-01-12T11:45:00",
            usedAt: "2024-01-12T15:30:00",
            expiresAt: "2024-02-12T11:45:00"
        }
    ];

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
            title: "Active Users",
            value: "456",
            change: "Users who redeemed",
            icon: User,
            color: "text-blue-600"
        },
        {
            title: "Avg Redemption",
            value: "720",
            change: "Points per redemption",
            icon: TrendingUp,
            color: "text-purple-600"
        }
    ];

    const statusStats = [
        { status: "Redeemed", count: 890, percentage: 72.1, color: "bg-green-100 text-green-700" },
        { status: "Pending", count: 234, percentage: 19.0, color: "bg-yellow-100 text-yellow-700" },
        { status: "Processing", count: 78, percentage: 6.3, color: "bg-blue-100 text-blue-700" },
        { status: "Expired", count: 32, percentage: 2.6, color: "bg-red-100 text-red-700" }
    ];

    const filteredRedemptions = redemptions.filter(redemption => {
        const matchesSearch = redemption.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            redemption.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            redemption.rewardType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || redemption.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Redeemed": return CheckCircle;
            case "Pending": return Clock;
            case "Processing": return Package;
            case "Expired": return AlertCircle;
            default: return Clock;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Redeemed": return "bg-green-100 text-green-700 border-green-200";
            case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Expired": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
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

            {/* Status Distribution */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Redemption Status Distribution
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {statusStats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className={`inline-flex items-center px-3 py-2 rounded-lg ${stat.color} mb-2`}>
                                    <span className="font-medium">{stat.status}</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                                <div className="text-sm text-gray-600">{stat.percentage}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Redemption History</h2>
                            <p className="text-gray-600 mt-1">
                                Track all point redemptions and reward claims
                            </p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg border border-blue-600 text-sm font-medium flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    {/* Search and Filters */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search redemptions..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="redeemed">Redeemed</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="expired">Expired</option>
                        </select>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            More Filters
                        </button>
                    </div>

                    {/* Redemptions Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Reward</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Points Used</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Redeemed</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Expires</th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRedemptions.map((redemption) => {
                                    const StatusIcon = getStatusIcon(redemption.status);
                                    return (
                                        <tr key={redemption.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{redemption.userName}</div>
                                                    <div className="text-gray-600">{redemption.userEmail}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{redemption.rewardType}</div>
                                                    <div className="text-gray-600">{redemption.rewardValue}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center gap-1 font-medium text-gray-900">
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    {redemption.pointsUsed.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(redemption.status)}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    {redemption.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-1 text-gray-600">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(redemption.redeemedAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="text-gray-600">
                                                    {new Date(redemption.expiresAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                    <Eye className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredRedemptions.length === 0 && (
                        <div className="text-center py-8">
                            <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No redemptions found matching your search criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
