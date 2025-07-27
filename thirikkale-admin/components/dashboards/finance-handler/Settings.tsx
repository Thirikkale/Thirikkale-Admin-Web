"use client"

import React from "react"

export default function FinanceHandlerSettings() {
    return (
        <div className="max-w-3xl mx-auto p-8 space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Finance Handler Settings</h1>
                <p className="text-gray-500 text-lg">Manage payout rules, payment methods, and financial preferences for your organization.</p>
            </div>

            {/* Payout Rules Section */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payout Rules</h2>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="w-48 font-medium text-gray-700">Minimum Payout Amount</label>
                        <input type="number" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter amount (Rs.)" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="w-48 font-medium text-gray-700">Payout Frequency</label>
                        <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option>Weekly</option>
                            <option>Bi-Weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Payment Methods Section */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="w-48 font-medium text-gray-700">Default Method</label>
                        <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option>Bank Transfer</option>
                            <option>Cash</option>
                            <option>Card</option>
                        </select>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="w-48 font-medium text-gray-700">Allowed Methods</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-blue-600" defaultChecked /> Bank Transfer
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-blue-600" defaultChecked /> Cash
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-blue-600" /> Card
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notification Preferences Section */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <input type="checkbox" className="accent-blue-600" defaultChecked />
                        <span className="text-gray-700">Email me when a payout is processed</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="checkbox" className="accent-blue-600" />
                        <span className="text-gray-700">Send SMS for failed payouts</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
