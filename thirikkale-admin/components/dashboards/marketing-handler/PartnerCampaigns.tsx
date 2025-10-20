"use client";

import { usePageHeader } from "@/components/providers/PageHeaderProvider";
import { useEffect, useState } from "react";
import {
    Building,
    TrendingUp,
    Plus,
    Search,
    Eye,
    Edit,
    MoreHorizontal,
    Target,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    DollarSign,
    Handshake
} from "lucide-react";

export default function PartnerCampaigns() {
    const { setPageHeader } = usePageHeader();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        setPageHeader({
            title: "Partner Campaigns",
            subtitle: "Manage partner promotion and collaboration campaigns"
        });
    }, [setPageHeader]);

    const partners = [
        {
            id: 1,
            name: "Metro Mall",
            logo: "MM",
            type: "Shopping Center",
            status: "Active",
            joinDate: "2024-01-15",
            totalCampaigns: 3,
            activeCampaigns: 2,
            revenue: 15400,
            customers: 1250
        },
        {
            id: 2,
            name: "City Hotel Group",
            logo: "CH",
            type: "Hospitality",
            status: "Active",
            joinDate: "2023-11-20",
            totalCampaigns: 5,
            activeCampaigns: 1,
            revenue: 28900,
            customers: 850
        },
        {
            id: 3,
            name: "FoodDelight Restaurant",
            logo: "FD",
            type: "Restaurant",
            status: "Paused",
            joinDate: "2024-02-01",
            totalCampaigns: 2,
            activeCampaigns: 0,
            revenue: 8200,
            customers: 340
        }
    ];

    const campaigns = [
        {
            id: 1,
            name: "Metro Mall Shopping Discount",
            partnerId: 1,
            partnerName: "Metro Mall",
            description: "20% discount for rides to Metro Mall",
            campaignType: "Location-based",
            discount: 20,
            startDate: "2024-01-20",
            endDate: "2024-03-20",
            status: "Active",
            totalUses: 450,
            revenue: 6800,
            conversionRate: 34.5
        },
        {
            id: 2,
            name: "Hotel Guest Special",
            partnerId: 2,
            partnerName: "City Hotel Group",
            description: "Free airport transfers for hotel guests",
            campaignType: "Service-based",
            discount: 100,
            startDate: "2024-01-10",
            endDate: "2024-06-10",
            status: "Active",
            totalUses: 120,
            revenue: 4500,
            conversionRate: 78.2
        },
        {
            id: 3,
            name: "Dine & Ride Package",
            partnerId: 3,
            partnerName: "FoodDelight Restaurant",
            description: "Combo offer: meal + ride discount",
            campaignType: "Package Deal",
            discount: 15,
            startDate: "2024-02-05",
            endDate: "2024-04-05",
            status: "Paused",
            totalUses: 89,
            revenue: 1340,
            conversionRate: 12.8
        },
        {
            id: 4,
            name: "Weekend Shopping Boost",
            partnerId: 1,
            partnerName: "Metro Mall",
            description: "Extra discounts for weekend mall visits",
            campaignType: "Time-based",
            discount: 25,
            startDate: "2024-03-01",
            endDate: "2024-05-01",
            status: "Scheduled",
            totalUses: 0,
            revenue: 0,
            conversionRate: 0
        }
    ];

    const stats = [
        {
            title: "Active Partners",
            value: "2",
            change: "1 new this month",
            icon: Building,
            color: "text-blue-600"
        },
        {
            title: "Running Campaigns",
            value: "3",
            change: "2 scheduled soon",
            icon: Target,
            color: "text-green-600"
        },
        {
            title: "Total Revenue",
            value: "$52.3K",
            change: "+24% vs last month",
            icon: DollarSign,
            color: "text-purple-600"
        },
        {
            title: "Avg Conversion",
            value: "41.8%",
            change: "+8.3% improvement",
            icon: TrendingUp,
            color: "text-yellow-600"
        }
    ];

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || campaign.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-700 border-green-200";
            case "Scheduled": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Paused": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Expired": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Active": return CheckCircle;
            case "Scheduled": return Clock;
            case "Paused": return AlertCircle;
            case "Expired": return AlertCircle;
            default: return Clock;
        }
    };

    const getCampaignTypeColor = (type: string) => {
        switch (type) {
            case "Location-based": return "bg-blue-100 text-blue-700";
            case "Service-based": return "bg-green-100 text-green-700";
            case "Package Deal": return "bg-purple-100 text-purple-700";
            case "Time-based": return "bg-orange-100 text-orange-700";
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
                {/* Campaigns */}
                <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Partner Campaigns</h2>
                                <p className="text-gray-600 mt-1">
                                    Manage promotion campaigns with business partners
                                </p>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg border border-blue-600 text-sm font-medium flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Create Campaign
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search campaigns..."
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
                                <option value="active">Active</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="paused">Paused</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            {filteredCampaigns.map((campaign) => {
                                const StatusIcon = getStatusIcon(campaign.status);
                                return (
                                    <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {campaign.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-3">{campaign.description}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-600">Partner:</span>
                                                    <span className="font-medium text-gray-900">{campaign.partnerName}</span>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCampaignTypeColor(campaign.campaignType)}`}>
                                                        {campaign.campaignType}
                                                    </span>
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
                                                    {campaign.discount}%
                                                </div>
                                                <div className="text-sm text-purple-700">Discount</div>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg text-center">
                                                <div className="text-lg font-bold text-blue-900">
                                                    {campaign.totalUses}
                                                </div>
                                                <div className="text-sm text-blue-700">Total Uses</div>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg text-center">
                                                <div className="text-lg font-bold text-green-900">
                                                    ${campaign.revenue.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-green-700">Revenue</div>
                                            </div>
                                            <div className="bg-yellow-50 p-3 rounded-lg text-center">
                                                <div className="text-lg font-bold text-yellow-900">
                                                    {campaign.conversionRate}%
                                                </div>
                                                <div className="text-sm text-yellow-700">Conversion</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Partners */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Handshake className="h-5 w-5 text-blue-600" />
                            Partners
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {partners.map((partner) => (
                                <div key={partner.id} className="border border-gray-100 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm">
                                            {partner.logo}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                                            <p className="text-sm text-gray-600">{partner.type}</p>
                                        </div>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(partner.status)}`}>
                                            {partner.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-600">Campaigns:</span>
                                            <div className="font-medium text-gray-900">
                                                {partner.activeCampaigns}/{partner.totalCampaigns}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Revenue:</span>
                                            <div className="font-medium text-gray-900">
                                                ${partner.revenue.toLocaleString()}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Customers:</span>
                                            <div className="font-medium text-gray-900">
                                                {partner.customers.toLocaleString()}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Since:</span>
                                            <div className="font-medium text-gray-900">
                                                {new Date(partner.joinDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New Partner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
