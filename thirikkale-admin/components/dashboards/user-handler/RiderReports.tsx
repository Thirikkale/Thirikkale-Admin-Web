import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

const sampleReports = [
    {
        id: 'RR100',
        rider: 'Nimal Perera',
        city: 'Colombo',
        reportedBy: 'Kasun Rajapaksa',
        reason: 'Inappropriate behavior',
        date: '2025-04-26',
        status: 'Open',
        avatar: '🧑',
    },
    {
        id: 'RR101',
        rider: 'Sanduni Wickramasinghe',
        city: 'Negombo',
        reportedBy: 'Roshan Jayawardena',
        reason: 'Payment issue',
        date: '2025-04-25',
        status: 'Closed',
        avatar: '👩',
    },
    {
        id: 'RR102',
        rider: 'Roshan Jayawardena',
        city: 'Jaffna',
        reportedBy: 'Nimal Perera',
        reason: 'Late arrival',
        date: '2025-04-24',
        status: 'In Review',
        avatar: '👨',
    },
];

const tabs = [
    { name: 'All', count: sampleReports.length },
    { name: 'Open', count: sampleReports.filter((r) => r.status === 'Open').length },
    { name: 'In Review', count: sampleReports.filter((r) => r.status === 'In Review').length },
    { name: 'Closed', count: sampleReports.filter((r) => r.status === 'Closed').length },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Open':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'In Review':
            return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Closed':
            return 'bg-green-100 text-green-800 border border-green-200';
        default:
            return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
};

export default function RiderReports() {
    const { setPageHeader } = usePageHeader();
    const [activeTab, setActiveTab] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        setPageHeader({
            title: 'Rider Reports',
            subtitle: 'View and manage reports related to riders.',
        });
    }, [setPageHeader]);

    const filteredReports = sampleReports.filter(
        (r) =>
            (activeTab === 'All' || r.status === activeTab) &&
            (r.rider.toLowerCase().includes(search.toLowerCase()) ||
                r.reportedBy.toLowerCase().includes(search.toLowerCase()) ||
                r.reason.toLowerCase().includes(search.toLowerCase()) ||
                r.city.toLowerCase().includes(search.toLowerCase()) ||
                r.id.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                {/* Status Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex overflow-hidden flex-wrap">
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
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeTab === tab.name ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Filter */}
                <div className="p-6 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search by rider, driver, reason, city, or ID"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Table */}
                <div className="overflow-hidden">
                    <div className="bg-gray-100 border-b-2 border-gray-300">
                        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '0.8fr 1.7fr 1.7fr 1.5fr 0.8fr 1fr' }}>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Report ID</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rider Info</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Reported By</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Reason</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                            <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
                        </div>
                    </div>
                    {filteredReports.map((r) => (
                        <div key={r.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                            <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '0.8fr 1.7fr 1.7fr 1.5fr 0.8fr 1fr' }}>
                                {/* Report ID Column */}
                                <div className="text-xs font-semibold text-blue-700 bg-blue-50 rounded px-1.5 py-0.5 text-center border border-blue-100 w-fit mx-auto">
                                    {r.id}
                                </div>
                                {/* Rider Info Column */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg border border-gray-300">
                                            {r.avatar}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex-shrink-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{r.rider}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{r.city}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs text-gray-400">Rider ID:</span>
                                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                {`R${r.id.slice(-3)}`}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">{r.date}</p>
                                    </div>
                                </div>
                                {/* Reported By Column */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg border border-gray-300">
                                            {/* Placeholder avatar for Driver */}
                                            <span className="text-gray-400">👤</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-1">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{r.reportedBy}</p>
                                        </div>
                                        {/* Demo/placeholder city for Driver */}
                                        <p className="text-xs text-gray-500 truncate">{r.city} {/* or Driver's city if available */}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs text-gray-400">Driver ID:</span>
                                            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                                {`D${r.id.slice(-3)}`}
                                            </span>
                                        </div>
                                        {/* Demo/placeholder date for Driver */}
                                        <p className="text-xs text-gray-400 truncate">{r.date}</p>
                                    </div>
                                </div>
                                {/* Reason Column */}
                                <div className="text-sm text-gray-700 text-center">{r.reason}</div>
                                {/* Status Column */}
                                <div className="text-center">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(r.status)}`}>
                                        {r.status}
                                    </span>
                                </div>
                                {/* Actions Column */}
                                <div className="flex flex-col space-y-1 items-center">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors">
                                        View
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded-md border border-red-300 hover:bg-red-50 transition-colors">
                                        Resolve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
