"use client"

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Mail,
    Shield,
    BarChart3,
    Save
} from 'lucide-react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'

export default function MarketingHandlerSettings() {
    const { setPageHeader } = usePageHeader()

    useEffect(() => {
        setPageHeader({
            title: "Marketing Handler Settings",
            subtitle: "Configure marketing tools, campaigns, and preferences"
        })
    }, [setPageHeader])

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Settings</h1>
                <p className="text-gray-500 text-lg">Manage your marketing campaigns, analytics, and communication preferences.</p>
            </div>

            {/* Campaign Settings */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Campaign Settings</h2>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Default Campaign Duration</label>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option>7 days</option>
                                <option>14 days</option>
                                <option>30 days</option>
                                <option>90 days</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Auto-approval Threshold</label>
                            <input type="number" className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Budget amount (Rs.)" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="checkbox" className="accent-blue-600" defaultChecked />
                        <span className="text-gray-700">Enable automatic campaign optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="checkbox" className="accent-blue-600" />
                        <span className="text-gray-700">Require approval for campaigns over budget threshold</span>
                    </div>
                </div>
            </section>

            {/* Email & Notification Settings */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Email & Notifications</h2>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Email Template Style</label>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option>Modern</option>
                                <option>Classic</option>
                                <option>Minimal</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Send Time Optimization</label>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option>Automatic</option>
                                <option>Morning (8-10 AM)</option>
                                <option>Afternoon (2-4 PM)</option>
                                <option>Evening (6-8 PM)</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" defaultChecked />
                            <span className="text-gray-700">Email me when a campaign starts</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" defaultChecked />
                            <span className="text-gray-700">Email me daily campaign summaries</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" />
                            <span className="text-gray-700">SMS alerts for urgent campaign issues</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" />
                            <span className="text-gray-700">Push notifications for mobile app</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Analytics & Reporting */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Analytics & Reporting</h2>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Default Report Period</label>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                                <option>Custom range</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Auto-export Reports</label>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option>Disabled</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Quarterly</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" defaultChecked />
                            <span className="text-gray-700">Include demographic data in reports</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" defaultChecked />
                            <span className="text-gray-700">Track conversion attribution</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" />
                            <span className="text-gray-700">Enable real-time analytics</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy & Security */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-5 w-5 text-red-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Privacy & Security</h2>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Data Retention Period</label>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option>6 months</option>
                                <option>1 year</option>
                                <option>2 years</option>
                                <option>Custom</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Two-Factor Authentication</label>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option>Disabled</option>
                                <option>SMS</option>
                                <option>Email</option>
                                <option>Authenticator App</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" defaultChecked />
                            <span className="text-gray-700">Comply with GDPR regulations</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" defaultChecked />
                            <span className="text-gray-700">Anonymize user data in reports</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-blue-600" />
                            <span className="text-gray-700">Enable audit logging</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button size="lg" className="px-8">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                </Button>
            </div>
        </div>
    )
}
