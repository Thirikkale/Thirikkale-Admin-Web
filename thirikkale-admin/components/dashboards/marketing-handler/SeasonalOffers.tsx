"use client";

import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { useEffect, useState } from "react";
import {
    Calendar,
    Snowflake,
    Sun,
    Leaf,
    Flower,
    Plus,
    Search,
    Eye,
    Edit,
    MoreHorizontal,
    Clock,
    Users,
    TrendingUp,
    Target,
    CheckCircle,
    AlertCircle,
    Star
} from "lucide-react";

export default function SeasonalOffers() {
    const { setPageHeader } = usePageHeader();
    const [searchTerm, setSearchTerm] = useState("");
    const [seasonFilter, setSeasonFilter] = useState("all");

    useEffect(() => {
        setPageHeader({
            title: "Seasonal Offers",
            subtitle: "Manage seasonal promotion campaigns and time-limited offers"
        });
    }, [setPageHeader]);

    const seasonalOffers = [
        {
            id: 1,
            name: "Winter Ride Savings",
            description: "25% off rides during winter season",
            season: "Winter",
            icon: Snowflake,
            discount: 25,
            discountType: "percentage",
            startDate: "2024-12-01",
            endDate: "2025-02-28",
            status: "Active",
            totalUses: 2340,
            totalSavings: 45600,
            conversionRate: 68.5,
            targetAudience: "All Users"
        },
        {
            id: 2,
            name: "Spring Festival Bonus",
            description: "Free rides for first-time users in spring",
            season: "Spring",
            icon: Flower,
            discount: 100,
            discountType: "fixed",
            startDate: "2024-03-01",
            endDate: "2024-05-31",
            status: "Scheduled",
            totalUses: 0,
            totalSavings: 0,
            conversionRate: 0,
            targetAudience: "New Users"
        },
        {
            id: 3,
            name: "Summer Travel Deals",
            description: "Airport rides at 30% discount",
            season: "Summer",
            icon: Sun,
            discount: 30,
            discountType: "percentage",
            startDate: "2024-06-01",
            endDate: "2024-08-31",
            status: "Scheduled",
            totalUses: 0,
            totalSavings: 0,
            conversionRate: 0,
            targetAudience: "Premium Users"
        },
        {
            id: 4,
            name: "Autumn Commute Special",
            description: "20% off weekday morning rides",
            season: "Autumn",
            icon: Leaf,
            discount: 20,
            discountType: "percentage",
            startDate: "2024-09-01",
            endDate: "2024-11-30",
            status: "Draft",
            totalUses: 0,
            totalSavings: 0,
            conversionRate: 0,
            targetAudience: "Regular Commuters"
        }
    ];

    const stats = [
        {
            title: "Active Offers",
            value: "1",
            change: "1 winter campaign",
            icon: Target,
            color: "text-green-600"
        },
        {
            title: "Total Uses",
            value: "2.3K",
            change: "+15% this season",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Customer Savings",
            value: "$45.6K",
            change: "From active offers",
            icon: Star,
            color: "text-yellow-600"
        },
        {
            title: "Conversion Rate",
            value: "68.5%",
            change: "+5% improvement",
            icon: TrendingUp,
            color: "text-purple-600"
        }
    ];

    const upcomingSeasons = [
        {
            season: "Spring",
            startDate: "2024-03-01",
            campaignsPlanned: 2,
            estimatedReach: "5.2K"
        },
        {
            season: "Summer",
            startDate: "2024-06-01",
            campaignsPlanned: 1,
            estimatedReach: "3.8K"
        },
        {
            season: "Autumn",
            startDate: "2024-09-01",
            campaignsPlanned: 1,
            estimatedReach: "4.1K"
        }
    ];

    const filteredOffers = seasonalOffers.filter(offer => {
        const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeason = seasonFilter === "all" || offer.season.toLowerCase() === seasonFilter.toLowerCase();
        return matchesSearch && matchesSeason;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-700 border-green-200";
            case "Scheduled": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Draft": return "bg-gray-100 text-gray-700 border-gray-200";
            case "Expired": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getSeasonColor = (season: string) => {
        switch (season) {
            case "Winter": return "bg-blue-100 text-blue-700";
            case "Spring": return "bg-green-100 text-green-700";
            case "Summer": return "bg-yellow-100 text-yellow-700";
            case "Autumn": return "bg-orange-100 text-orange-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Active": return CheckCircle;
            case "Scheduled": return Clock;
            case "Draft": return Edit;
            case "Expired": return AlertCircle;
            default: return Clock;
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
                {/* Seasonal Offers */}
                <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Seasonal Offers</h2>
                                <p className="text-gray-600 mt-1">
                                    Create and manage seasonal promotion campaigns
                                </p>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg border border-blue-600 text-sm font-medium flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Create Offer
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search offers..."
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <select
                                value={seasonFilter}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSeasonFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Seasons</option>
                                <option value="winter">Winter</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                                <option value="autumn">Autumn</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            {filteredOffers.map((offer) => {
                                const StatusIcon = getStatusIcon(offer.status);
                                return (
                                    <div key={offer.id} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg ${getSeasonColor(offer.season)}`}>
                                                    <offer.icon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{offer.name}</h3>
                                                    <p className="text-gray-600 mb-2">{offer.description}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeasonColor(offer.season)}`}>
                                                            {offer.season}
                                                        </span>
                                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(offer.status)}`}>
                                                            <StatusIcon className="h-3 w-3" />
                                                            {offer.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
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

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className="bg-purple-50 p-3 rounded-lg text-center">
                                                <div className="text-lg font-bold text-purple-900">
                                                    {offer.discount}{offer.discountType === 'percentage' ? '%' : '$'}
                                                </div>
                                                <div className="text-sm text-purple-700">Discount</div>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg text-center">
                                                <div className="text-lg font-bold text-blue-900">
                                                    {offer.totalUses.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-blue-700">Total Uses</div>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg text-center">
                                                <div className="text-lg font-bold text-green-900">
                                                    ${offer.totalSavings.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-green-700">Savings</div>
                                            </div>
                                            <div className="bg-yellow-50 p-3 rounded-lg text-center">
                                                <div className="text-lg font-bold text-yellow-900">
                                                    {offer.conversionRate}%
                                                </div>
                                                <div className="text-sm text-yellow-700">Conversion</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                                                </div>
                                                <div>
                                                    Target: {offer.targetAudience}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Upcoming Seasons */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            Upcoming Seasons
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {upcomingSeasons.map((season, index) => (
                                <div key={index} className="border border-gray-100 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-gray-900">{season.season}</h4>
                                        <span className="text-sm text-gray-600">
                                            {new Date(season.startDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Campaigns Planned:</span>
                                            <span className="font-medium text-gray-900">{season.campaignsPlanned}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Estimated Reach:</span>
                                            <span className="font-medium text-gray-900">{season.estimatedReach} users</span>
                                        </div>
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
