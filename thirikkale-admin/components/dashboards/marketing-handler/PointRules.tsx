"use client";

import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { useEffect, useState } from "react";
import {
    Settings,
    Plus,
    Search,
    Filter,
    Edit,
    Star,
    DollarSign,
    Car,
    Users,
    CheckCircle,
    AlertCircle,
    Eye,
    MoreHorizontal
} from "lucide-react";

export default function PointRules() {
    const { setPageHeader } = usePageHeader();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setPageHeader({
            title: "Point Rules",
            subtitle: "Configure how points are earned and allocated"
        });
    }, [setPageHeader]);

    const rules = [
        {
            id: 1,
            name: "Ride Completion",
            description: "Points earned for completing a ride",
            trigger: "Ride Complete",
            pointsEarned: 10,
            condition: "Per ride completed",
            status: "Active",
            multiplier: 1.0,
            category: "Rides",
            created: "2024-01-01"
        },
        {
            id: 2,
            name: "First Ride Bonus",
            description: "Welcome bonus for new users",
            trigger: "First Ride",
            pointsEarned: 100,
            condition: "One-time only",
            status: "Active",
            multiplier: 1.0,
            category: "Onboarding",
            created: "2024-01-01"
        },
        {
            id: 3,
            name: "Weekend Multiplier",
            description: "Double points on weekends",
            trigger: "Weekend Ride",
            pointsEarned: 20,
            condition: "Saturday & Sunday only",
            status: "Active",
            multiplier: 2.0,
            category: "Promotions",
            created: "2024-01-15"
        },
        {
            id: 4,
            name: "Referral Reward",
            description: "Points for successful referrals",
            trigger: "Referral Success",
            pointsEarned: 250,
            condition: "Per successful referral",
            status: "Active",
            multiplier: 1.0,
            category: "Referrals",
            created: "2024-01-10"
        },
        {
            id: 5,
            name: "Review Submission",
            description: "Points for leaving ride reviews",
            trigger: "Review Submit",
            pointsEarned: 5,
            condition: "Per review (max 1 per ride)",
            status: "Draft",
            multiplier: 1.0,
            category: "Engagement",
            created: "2024-01-20"
        }
    ];

    const stats = [
        {
            title: "Active Rules",
            value: "12",
            change: "+2 this month",
            icon: Settings,
            color: "text-blue-600"
        },
        {
            title: "Total Points Awarded",
            value: "2.1M",
            change: "+18% this month",
            icon: Star,
            color: "text-yellow-600"
        },
        {
            title: "Points Per User (Avg)",
            value: "340",
            change: "+12% from last month",
            icon: Users,
            color: "text-green-600"
        },
        {
            title: "Most Popular Rule",
            value: "Ride Completion",
            change: "89% of total points",
            icon: Car,
            color: "text-purple-600"
        }
    ];

    const getStatusBadge = (status: string) => {
        const statusColors = {
            Active: "bg-green-100 text-green-700 border-green-200",
            Draft: "bg-gray-100 text-gray-700 border-gray-200",
            Paused: "bg-yellow-100 text-yellow-700 border-yellow-200"
        };

        const statusIcons = {
            Active: CheckCircle,
            Draft: Edit,
            Paused: AlertCircle
        };

        const StatusIcon = statusIcons[status as keyof typeof statusIcons];

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status as keyof typeof statusColors]}`}>
                <StatusIcon className="h-3 w-3" />
                {status}
            </span>
        );
    };

    const getCategoryBadge = (category: string) => {
        const categoryColors = {
            Rides: "bg-blue-100 text-blue-700",
            Onboarding: "bg-green-100 text-green-700",
            Promotions: "bg-purple-100 text-purple-700",
            Referrals: "bg-orange-100 text-orange-700",
            Engagement: "bg-pink-100 text-pink-700"
        };

        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[category as keyof typeof categoryColors]}`}>
                {category}
            </span>
        );
    };

    const filteredRules = rules.filter(rule =>
        rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchTerm.toLowerCase())
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

            {/* Point Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-600" />
                            Points by Category
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Rides</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold">1,234,560</div>
                                    <div className="text-xs text-gray-500">58.9%</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Referrals</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold">456,750</div>
                                    <div className="text-xs text-gray-500">21.8%</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Promotions</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold">289,340</div>
                                    <div className="text-xs text-gray-500">13.8%</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Onboarding</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold">112,350</div>
                                    <div className="text-xs text-gray-500">5.5%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Point Value Settings
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">1 Point Value</span>
                                <span className="text-sm text-gray-600">$0.01</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Min Redemption</span>
                                <span className="text-sm text-gray-600">100 points</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Max Points Per Day</span>
                                <span className="text-sm text-gray-600">500 points</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Expiry Period</span>
                                <span className="text-sm text-gray-600">12 months</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Point Rules</h2>
                            <p className="text-gray-600 mt-1">
                                Configure how users earn points in your loyalty program
                            </p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg border border-blue-600 text-sm font-medium flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Rule
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
                                placeholder="Search rules..."
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

                    {/* Rules Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Rule</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Points</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Multiplier</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Created</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRules.map((rule) => (
                                        <tr key={rule.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{rule.name}</div>
                                                    <div className="text-sm text-gray-500 max-w-xs">
                                                        {rule.description}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        Trigger: {rule.trigger}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-gray-900 font-medium text-lg">
                                                    {rule.pointsEarned}
                                                </span>
                                                <div className="text-xs text-gray-500">{rule.condition}</div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`font-medium ${rule.multiplier > 1 ? 'text-orange-600' : 'text-gray-900'}`}>
                                                    {rule.multiplier}x
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                {getCategoryBadge(rule.category)}
                                            </td>
                                            <td className="py-4 px-4">
                                                {getStatusBadge(rule.status)}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-gray-600">{rule.created}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {filteredRules.length === 0 && (
                        <div className="text-center py-8">
                            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No rules found</h3>
                            <p className="text-gray-600">Try adjusting your search terms or create a new point rule.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
