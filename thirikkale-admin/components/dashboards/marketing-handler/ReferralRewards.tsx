"use client";

import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { useEffect, useState } from "react";
import {
    Users,
    Star,
    TrendingUp,
    Plus,
    Search,
    Share,
    Gift,
    Target,
    Calendar,
    Eye,
    Edit,
    CheckCircle,
    MoreHorizontal
} from "lucide-react";

export default function ReferralRewards() {
    const { setPageHeader } = usePageHeader();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setPageHeader({
            title: "Referral Rewards",
            subtitle: "Loyalty points integration with referral incentives"
        });
    }, [setPageHeader]);

    const referralPrograms = [
        {
            id: 1,
            name: "New User Referral",
            description: "Reward for referring new users to the platform",
            referrerReward: 500,
            refereeReward: 250,
            status: "Active",
            totalReferrals: 1234,
            totalPointsAwarded: 926500,
            conversionRate: 68.5,
            createdAt: "2024-01-01",
            expiresAt: "2024-12-31"
        },
        {
            id: 2,
            name: "Driver Referral Bonus",
            description: "Special bonus for referring drivers",
            referrerReward: 1000,
            refereeReward: 500,
            status: "Active",
            totalReferrals: 456,
            totalPointsAwarded: 684000,
            conversionRate: 72.3,
            createdAt: "2024-01-15",
            expiresAt: "2024-06-30"
        },
        {
            id: 3,
            name: "Premium User Referral",
            description: "Enhanced rewards for premium tier referrals",
            referrerReward: 750,
            refereeReward: 400,
            status: "Paused",
            totalReferrals: 234,
            totalPointsAwarded: 269100,
            conversionRate: 45.2,
            createdAt: "2023-12-01",
            expiresAt: "2024-03-31"
        }
    ];

    const recentReferrals = [
        {
            id: 1,
            referrerName: "John Doe",
            referrerEmail: "john.doe@email.com",
            refereeName: "Jane Smith",
            refereeEmail: "jane.smith@email.com",
            programName: "New User Referral",
            pointsAwarded: 750,
            status: "Completed",
            createdAt: "2024-01-15T10:30:00"
        },
        {
            id: 2,
            referrerName: "Mike Chen",
            referrerEmail: "mike.chen@email.com",
            refereeName: "Sarah Wilson",
            refereeEmail: "sarah.wilson@email.com",
            programName: "Driver Referral Bonus",
            pointsAwarded: 1500,
            status: "Pending",
            createdAt: "2024-01-14T14:20:00"
        },
        {
            id: 3,
            referrerName: "Emily Davis",
            referrerEmail: "emily.d@email.com",
            refereeName: "Robert Brown",
            refereeEmail: "robert.brown@email.com",
            programName: "New User Referral",
            pointsAwarded: 750,
            status: "Completed",
            createdAt: "2024-01-13T16:45:00"
        }
    ];

    const stats = [
        {
            title: "Total Referrals",
            value: "1,924",
            change: "+23% this month",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Points Awarded",
            value: "1.88M",
            change: "+18% vs last month",
            icon: Star,
            color: "text-yellow-600"
        },
        {
            title: "Active Programs",
            value: "2",
            change: "1 paused program",
            icon: Target,
            color: "text-green-600"
        },
        {
            title: "Conversion Rate",
            value: "62.0%",
            change: "+5.2% improvement",
            icon: TrendingUp,
            color: "text-purple-600"
        }
    ];

    const filteredPrograms = referralPrograms.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-700 border-green-200";
            case "Paused": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Completed": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Pending": return "bg-orange-100 text-orange-700 border-orange-200";
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Referral Programs */}
                <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Referral Programs</h2>
                                <p className="text-gray-600 mt-1">
                                    Manage referral reward programs and point distribution
                                </p>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg border border-blue-600 text-sm font-medium flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Create Program
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mt-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search programs..."
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            {filteredPrograms.map((program) => (
                                <div key={program.id} className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)}`}>
                                                    <CheckCircle className="h-3 w-3" />
                                                    {program.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{program.description}</p>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Share className="h-4 w-4 text-blue-600" />
                                                        <span className="text-sm font-medium text-blue-900">Referrer Reward</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-500" />
                                                        <span className="font-bold text-blue-900">{program.referrerReward}</span>
                                                        <span className="text-sm text-blue-700">points</span>
                                                    </div>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Gift className="h-4 w-4 text-green-600" />
                                                        <span className="text-sm font-medium text-green-900">Referee Reward</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-500" />
                                                        <span className="font-bold text-green-900">{program.refereeReward}</span>
                                                        <span className="text-sm text-green-700">points</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-600">Total Referrals:</span>
                                                    <div className="font-semibold text-gray-900">{program.totalReferrals.toLocaleString()}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Points Awarded:</span>
                                                    <div className="font-semibold text-gray-900">{program.totalPointsAwarded.toLocaleString()}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Conversion Rate:</span>
                                                    <div className="font-semibold text-gray-900">{program.conversionRate}%</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                <Eye className="h-4 w-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                <Edit className="h-4 w-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Created: {new Date(program.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Expires: {new Date(program.expiresAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Referrals */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Recent Referrals
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentReferrals.map((referral) => (
                                <div key={referral.id} className="border border-gray-100 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-900">{referral.programName}</span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(referral.status)}`}>
                                            {referral.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="text-gray-600">Referrer:</span>
                                            <div className="font-medium text-gray-900">{referral.referrerName}</div>
                                            <div className="text-gray-600">{referral.referrerEmail}</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Referee:</span>
                                            <div className="font-medium text-gray-900">{referral.refereeName}</div>
                                            <div className="text-gray-600">{referral.refereeEmail}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="font-bold text-gray-900">{referral.pointsAwarded}</span>
                                            <span className="text-sm text-gray-600">points</span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {new Date(referral.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
