"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CashTransactions from './CashPayments'
import CardTransactions from './CardPayments'
import {
    Banknote,
    CreditCard,
    DollarSign,
    TrendingUp,
    BarChart3
} from "lucide-react"

export default function PaymentManagement() {
    const [activeTab, setActiveTab] = useState("overview")

    const overviewStats = {
        totalToday: 15670.50,
        cashToday: 4820.25,
        cardToday: 10850.25,
        transactionsToday: 234,
        cashTransactions: 89,
        cardTransactions: 145
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "cash":
                return <CashTransactions />
            case "card":
                return <CardTransactions />
            default:
                return (
                    <div className="space-y-6">
                        {/* Overview Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue Today</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${overviewStats.totalToday.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">
                                        <TrendingUp className="h-3 w-3 inline mr-1" />
                                        +12.5% from yesterday
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Cash Payments</CardTitle>
                                    <Banknote className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${overviewStats.cashToday.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">{overviewStats.cashTransactions} transactions</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Card Payments</CardTitle>
                                    <CreditCard className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${overviewStats.cardToday.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">{overviewStats.cardTransactions} transactions</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Payment Method Breakdown */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Method Distribution</CardTitle>
                                    <CardDescription>Today&apos;s payment breakdown</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <CreditCard className="h-4 w-4 text-blue-600" />
                                                <span className="font-medium">Card Payments</span>
                                            </div>
                                            <span className="font-bold">${overviewStats.cardToday.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="h-3 rounded-full bg-blue-600"
                                                style={{ width: `${(overviewStats.cardToday / overviewStats.totalToday) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            {Math.round((overviewStats.cardToday / overviewStats.totalToday) * 100)}% of total revenue
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Banknote className="h-4 w-4 text-green-600" />
                                                <span className="font-medium">Cash Payments</span>
                                            </div>
                                            <span className="font-bold">${overviewStats.cashToday.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="h-3 rounded-full bg-green-600"
                                                style={{ width: `${(overviewStats.cashToday / overviewStats.totalToday) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            {Math.round((overviewStats.cashToday / overviewStats.totalToday) * 100)}% of total revenue
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                    <CardDescription>Manage payments and transactions</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button
                                        className="w-full justify-start"
                                        variant="outline"
                                        onClick={() => setActiveTab("cash")}
                                    >
                                        <Banknote className="h-4 w-4 mr-2" />
                                        View Cash Transactions
                                    </Button>
                                    <Button
                                        className="w-full justify-start"
                                        variant="outline"
                                        onClick={() => setActiveTab("card")}
                                    >
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        View Card Transactions
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <BarChart3 className="h-4 w-4 mr-2" />
                                        Generate Payment Report
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
                    <p className="text-gray-600">Monitor and manage all payment transactions</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={activeTab === "overview" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("overview")}
                    >
                        Overview
                    </Button>
                    <Button
                        variant={activeTab === "cash" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("cash")}
                    >
                        <Banknote className="h-4 w-4 mr-2" />
                        Cash
                    </Button>
                    <Button
                        variant={activeTab === "card" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("card")}
                    >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Card
                    </Button>
                </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    )
}
