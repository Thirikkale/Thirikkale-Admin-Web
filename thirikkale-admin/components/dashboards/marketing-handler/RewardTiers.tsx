"use client";

import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { useEffect, useState } from "react";
import {
    BarChart3,
    Plus,
    Search,
    Filter,
    Edit,
    Star,
    Crown,
    Gift,
    Users,
    CheckCircle,
    Eye,
    MoreHorizontal
} from "lucide-react";

export default function RewardTiers() {
    const { setPageHeader } = usePageHeader();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setPageHeader({
            title: "Reward Tiers",
            subtitle: "Configure different loyalty tiers and benefits"
        });
    }, [setPageHeader]);

    const tiers = [
        {
            id: 1,
            name: "Bronze",
            pointsRequired: 0,
            color: "bg-amber-100 text-amber-700",
            icon: Star,
            benefits: ["5% ride discount", "Priority support"],
            users: 8450,
            percentage: 68.2,
            status: "Active"
        },
        {
            id: 2,
            name: "Silver",
            pointsRequired: 1000,
            color: "bg-gray-100 text-gray-700",
            icon: Star,
            benefits: ["10% ride discount", "Free cancellation", "Priority booking"],
            users: 2340,
            percentage: 18.9,
            status: "Active"
        },
        {
            id: 3,
            name: "Gold",
            pointsRequired: 5000,
            color: "bg-yellow-100 text-yellow-700",
            icon: Crown,
            benefits: ["15% ride discount", "Free waiting time", "Premium vehicles"],
            users: 1250,
            percentage: 10.1,
            status: "Active"
        },
        {
            id: 4,
            name: "Platinum",
            pointsRequired: 15000,
            color: "bg-purple-100 text-purple-700",
            icon: Crown,
            benefits: ["20% ride discount", "Concierge service", "Airport lounge access"],
            users: 340,
            percentage: 2.8,
            status: "Active"
        }
    ];

    const stats = [
        {
            title: "Total Members",
            value: "12.4K",
            change: "+8% this month",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Premium Members",
            value: "1.59K",
            change: "+15% from Gold+",
            icon: Crown,
            color: "text-purple-600"
        },
        {
            title: "Tier Upgrades",
            value: "234",
            change: "This month",
            icon: BarChart3,
            color: "text-green-600"
        },
        {
            title: "Avg Points/User",
            value: "1,456",
            change: "+12% improvement",
            icon: Star,
            color: "text-yellow-600"
        }
    ];

    const filteredTiers = tiers.filter(tier =>
        tier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            {/* Tier Distribution */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        Tier Distribution
                    </h3>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        {tiers.map((tier) => (
                            <div key={tier.id} className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${tier.color}`}>
                                    <tier.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900">{tier.name}</span>
                                        <span className="text-sm text-gray-600">
                                            {tier.users.toLocaleString()} users ({tier.percentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${tier.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
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
                            <h2 className="text-xl font-semibold text-gray-900">Reward Tiers</h2>
                            <p className="text-gray-600 mt-1">
                                Configure different loyalty tiers and their benefits
                            </p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg border border-blue-600 text-sm font-medium flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Tier
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
                                placeholder="Search tiers..."
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

                    {/* Tiers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredTiers.map((tier) => (
                            <div key={tier.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${tier.color}`}>
                                        <tier.icon className="h-6 w-6" />
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">
                                        <CheckCircle className="h-3 w-3" />
                                        {tier.status}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {tier.pointsRequired === 0 ? "Starting tier" : `${tier.pointsRequired.toLocaleString()} points required`}
                                </p>

                                <div className="space-y-2 mb-4">
                                    <h4 className="text-sm font-medium text-gray-900">Benefits:</h4>
                                    <ul className="space-y-1">
                                        {tier.benefits.map((benefit, index) => (
                                            <li key={index} className="text-xs text-gray-600 flex items-center gap-1">
                                                <Gift className="h-3 w-3 text-green-500" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Members:</span>
                                        <span className="font-medium">{tier.users.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mt-1">
                                        <span className="text-gray-600">Percentage:</span>
                                        <span className="font-medium">{tier.percentage}%</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <button className="flex-1 h-8 px-3 hover:bg-gray-100 rounded flex items-center justify-center text-sm">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                    </button>
                                    <button className="flex-1 h-8 px-3 hover:bg-gray-100 rounded flex items-center justify-center text-sm">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </button>
                                    <button className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
