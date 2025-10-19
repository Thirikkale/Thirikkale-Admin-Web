import React, { useEffect, useState } from 'react'
import { usePageHeader } from '@/components/providers/PageHeaderProvider'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  TrendingUp,
  Percent,
  Clock,
  MapPin,
  Users,
  Car,
  AlertCircle,
  Save,
  RotateCcw,
  Settings,
  Calendar,
  Zap,
  Shield,
  Bell,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function Pricing() {
  const { setPageHeader } = usePageHeader()
  const [activeTab, setActiveTab] = useState('fare')
  const [hasChanges, setHasChanges] = useState(false)

  // Fare Configuration State
  const [fareConfig, setFareConfig] = useState({
    baseFare: 150,
    perKmRate: 50,
    perMinuteRate: 5,
    minimumFare: 200,
    bookingFee: 25,
    cancellationFee: 50,
    waitingChargePerMin: 3
  })

  // Commission Rates State
  const [commissionRates, setCommissionRates] = useState({
    driverCommission: 20,
    platformFee: 15,
    paymentGatewayFee: 2.5,
    referralBonus: 100,
    driverIncentive: 5
  })

  // Surge Pricing State
  const [surgePricing, setSurgePricing] = useState({
    enabled: true,
    peakHourMultiplier: 1.5,
    highDemandMultiplier: 2.0,
    weatherMultiplier: 1.3,
    eventMultiplier: 2.5
  })

  // Vehicle Type Pricing State
  const [vehicleTypes, setVehicleTypes] = useState([
    { id: 1, type: 'Regular', baseMultiplier: 1.0, perKmMultiplier: 1.0, icon: 'car', active: true },
    { id: 2, type: 'Premium', baseMultiplier: 1.5, perKmMultiplier: 1.4, icon: 'car', active: true },
    { id: 3, type: 'Shared', baseMultiplier: 0.7, perKmMultiplier: 0.8, icon: 'users', active: true },
    { id: 4, type: 'Bike', baseMultiplier: 0.5, perKmMultiplier: 0.6, icon: 'bike', active: false }
  ])

  // Policies State
  const [policies, setPolicies] = useState({
    maxCancellations: 3,
    cancellationWindow: 5,
    ratingThreshold: 3.5,
    maxWaitTime: 10,
    refundPolicy: 'auto',
    disputeResolution: 24
  })

  useEffect(() => {
    setPageHeader({
      title: "Pricing & Policy Management",
      subtitle: "Configure pricing models, commission rates, and platform policies"
    })
  }, [setPageHeader])

  const handleFareChange = (field: string, value: number) => {
    setFareConfig(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleCommissionChange = (field: string, value: number) => {
    setCommissionRates(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSurgeChange = (field: string, value: number | boolean) => {
    setSurgePricing(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleVehicleTypeChange = (id: number, field: string, value: number | boolean) => {
    setVehicleTypes(prev => prev.map(v =>
      v.id === id ? { ...v, [field]: value } : v
    ))
    setHasChanges(true)
  }

  const handlePolicyChange = (field: string, value: number | string) => {
    setPolicies(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSaveChanges = () => {
    // TODO: API call to save changes
    console.log('Saving changes...', {
      fareConfig,
      commissionRates,
      surgePricing,
      vehicleTypes,
      policies
    })
    setHasChanges(false)
    alert('Changes saved successfully!')
  }

  const handleResetChanges = () => {
    // Reset to default values
    setHasChanges(false)
    alert('Changes reset to default values')
  }

  const tabs = [
    { name: 'fare', label: 'Fare Calculation', icon: DollarSign },
    { name: 'commission', label: 'Commission Rates', icon: Percent },
    { name: 'surge', label: 'Surge Pricing', icon: TrendingUp },
    { name: 'vehicles', label: 'Vehicle Types', icon: Car },
    { name: 'policies', label: 'Policies', icon: Shield }
  ]

  const calculateSampleFare = (distance: number, duration: number) => {
    const distanceCost = distance * fareConfig.perKmRate
    const timeCost = duration * fareConfig.perMinuteRate
    const totalFare = fareConfig.baseFare + distanceCost + timeCost + fareConfig.bookingFee
    return Math.max(totalFare, fareConfig.minimumFare)
  }

  return (
    <div className="space-y-6">
      {/* Save/Reset Actions - Sticky Banner */}
      {hasChanges && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-yellow-800 font-semibold">Unsaved Changes</h3>
              <p className="text-yellow-600 text-sm">You have modified pricing settings. Save or reset your changes.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleResetChanges}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSaveChanges}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex-shrink-0 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${activeTab === tab.name
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Fare Calculation Tab */}
          {activeTab === 'fare' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Fare Calculation Settings</h2>
                  <p className="text-gray-600 text-sm">Configure base rates and per-kilometer pricing</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>

              {/* Fare Configuration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Base Fare */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-green-800">Base Fare</label>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <input
                    type="number"
                    value={fareConfig.baseFare}
                    onChange={(e) => handleFareChange('baseFare', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-bold text-gray-800"
                  />
                  <p className="text-green-700 text-xs mt-2">Initial charge for every ride</p>
                </div>

                {/* Per KM Rate */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-blue-800">Per KM Rate</label>
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <input
                    type="number"
                    value={fareConfig.perKmRate}
                    onChange={(e) => handleFareChange('perKmRate', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-bold text-gray-800"
                  />
                  <p className="text-blue-700 text-xs mt-2">Charge per kilometer traveled</p>
                </div>

                {/* Minimum Fare */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-orange-800">Minimum Fare</label>
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  <input
                    type="number"
                    value={fareConfig.minimumFare}
                    onChange={(e) => handleFareChange('minimumFare', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg font-bold text-gray-800"
                  />
                  <p className="text-orange-700 text-xs mt-2">Minimum charge for any ride</p>
                </div>

                {/* Waiting Charge */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-yellow-800">Waiting Charge/Min</label>
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <input
                    type="number"
                    value={fareConfig.waitingChargePerMin}
                    onChange={(e) => handleFareChange('waitingChargePerMin', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg font-bold text-gray-800"
                  />
                  <p className="text-yellow-700 text-xs mt-2">Charge per minute of waiting</p>
                </div>
              </div>

              {/* Fare Calculator Preview */}
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-bold text-indigo-800 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Sample Fare Calculation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-2">10 km, 20 minutes</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      LKR {calculateSampleFare(10, 20).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-2">25 km, 45 minutes</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      LKR {calculateSampleFare(25, 45).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-2">50 km, 90 minutes</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      LKR {calculateSampleFare(50, 90).toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-indigo-700 text-sm mt-4">
                  Formula: Base Fare + (Distance × Per KM Rate) + (Duration × Per Minute Rate) + Booking Fee
                </p>
              </div>
            </div>
          )}

          {/* Commission Rates Tab */}
          {activeTab === 'commission' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Commission & Fee Structure</h2>
                  <p className="text-gray-600 text-sm">Manage platform fees and driver commissions</p>
                </div>
                <Percent className="h-8 w-8 text-blue-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Driver Commission */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Driver Commission</label>
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="0.5"
                      value={commissionRates.driverCommission}
                      onChange={(e) => handleCommissionChange('driverCommission', Number(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={commissionRates.driverCommission}
                      onChange={(e) => handleCommissionChange('driverCommission', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                    />
                    <span className="text-gray-600 font-semibold">%</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Percentage of fare kept by driver</p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      On a LKR 1000 ride, driver receives: <span className="font-bold">LKR {(1000 * (100 - commissionRates.driverCommission) / 100).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Platform Fee */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Platform Fee</label>
                    <Settings className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="0.5"
                      value={commissionRates.platformFee}
                      onChange={(e) => handleCommissionChange('platformFee', Number(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={commissionRates.platformFee}
                      onChange={(e) => handleCommissionChange('platformFee', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                    />
                    <span className="text-gray-600 font-semibold">%</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Platform service fee from total fare</p>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      On a LKR 1000 ride, platform earns: <span className="font-bold">LKR {(1000 * commissionRates.platformFee / 100).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Payment Gateway Fee */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Payment Gateway Fee</label>
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={commissionRates.paymentGatewayFee}
                      onChange={(e) => handleCommissionChange('paymentGatewayFee', Number(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={commissionRates.paymentGatewayFee}
                      onChange={(e) => handleCommissionChange('paymentGatewayFee', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                      step="0.1"
                    />
                    <span className="text-gray-600 font-semibold">%</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Transaction processing fee</p>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      On a LKR 1000 ride, gateway fee: <span className="font-bold">LKR {(1000 * commissionRates.paymentGatewayFee / 100).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Driver Incentive */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Driver Incentive</label>
                    <TrendingUp className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="15"
                      step="0.5"
                      value={commissionRates.driverIncentive}
                      onChange={(e) => handleCommissionChange('driverIncentive', Number(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={commissionRates.driverIncentive}
                      onChange={(e) => handleCommissionChange('driverIncentive', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                    />
                    <span className="text-gray-600 font-semibold">%</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Additional bonus for high-performing drivers</p>
                </div>
              </div>

              {/* Commission Breakdown */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Commission Breakdown (Sample: LKR 1000 Ride)</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-xs text-gray-600 mb-1">Driver Receives</p>
                    <p className="text-xl font-bold text-blue-600">
                      LKR {(1000 * (100 - commissionRates.driverCommission) / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-xs text-gray-600 mb-1">Platform Earns</p>
                    <p className="text-xl font-bold text-green-600">
                      LKR {(1000 * commissionRates.platformFee / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-xs text-gray-600 mb-1">Payment Gateway</p>
                    <p className="text-xl font-bold text-purple-600">
                      LKR {(1000 * commissionRates.paymentGatewayFee / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-xs text-gray-600 mb-1">Driver Incentive</p>
                    <p className="text-xl font-bold text-orange-600">
                      LKR {(1000 * commissionRates.driverIncentive / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Surge Pricing Tab */}
          {activeTab === 'surge' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Surge Pricing Configuration</h2>
                  <p className="text-gray-600 text-sm">Dynamic pricing multipliers for high-demand scenarios</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>

              {/* Enable/Disable Surge */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-red-800 flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Surge Pricing Status
                    </h3>
                    <p className="text-red-700 text-sm mt-1">
                      {surgePricing.enabled ? 'Dynamic pricing is active' : 'Using standard pricing only'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSurgeChange('enabled', !surgePricing.enabled)}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${surgePricing.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${surgePricing.enabled ? 'translate-x-9' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>

              {/* Surge Multipliers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Peak Hour Multiplier */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Peak Hour Multiplier</label>
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1.0"
                      max="3.0"
                      step="0.1"
                      value={surgePricing.peakHourMultiplier}
                      onChange={(e) => handleSurgeChange('peakHourMultiplier', Number(e.target.value))}
                      className="flex-1"
                      disabled={!surgePricing.enabled}
                    />
                    <input
                      type="number"
                      value={surgePricing.peakHourMultiplier}
                      onChange={(e) => handleSurgeChange('peakHourMultiplier', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                      step="0.1"
                      disabled={!surgePricing.enabled}
                    />
                    <span className="text-gray-600 font-semibold">×</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Morning (7-9 AM) & Evening (5-8 PM)</p>
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      LKR 1000 ride becomes: <span className="font-bold">LKR {(1000 * surgePricing.peakHourMultiplier).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* High Demand Multiplier */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">High Demand Multiplier</label>
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1.0"
                      max="3.5"
                      step="0.1"
                      value={surgePricing.highDemandMultiplier}
                      onChange={(e) => handleSurgeChange('highDemandMultiplier', Number(e.target.value))}
                      className="flex-1"
                      disabled={!surgePricing.enabled}
                    />
                    <input
                      type="number"
                      value={surgePricing.highDemandMultiplier}
                      onChange={(e) => handleSurgeChange('highDemandMultiplier', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                      step="0.1"
                      disabled={!surgePricing.enabled}
                    />
                    <span className="text-gray-600 font-semibold">×</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">When demand exceeds driver availability</p>
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      LKR 1000 ride becomes: <span className="font-bold">LKR {(1000 * surgePricing.highDemandMultiplier).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Weather Multiplier */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Weather Multiplier</label>
                    <Cloud className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1.0"
                      max="2.5"
                      step="0.1"
                      value={surgePricing.weatherMultiplier}
                      onChange={(e) => handleSurgeChange('weatherMultiplier', Number(e.target.value))}
                      className="flex-1"
                      disabled={!surgePricing.enabled}
                    />
                    <input
                      type="number"
                      value={surgePricing.weatherMultiplier}
                      onChange={(e) => handleSurgeChange('weatherMultiplier', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                      step="0.1"
                      disabled={!surgePricing.enabled}
                    />
                    <span className="text-gray-600 font-semibold">×</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Heavy rain or adverse weather conditions</p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      LKR 1000 ride becomes: <span className="font-bold">LKR {(1000 * surgePricing.weatherMultiplier).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Event Multiplier */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Event Multiplier</label>
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1.0"
                      max="4.0"
                      step="0.1"
                      value={surgePricing.eventMultiplier}
                      onChange={(e) => handleSurgeChange('eventMultiplier', Number(e.target.value))}
                      className="flex-1"
                      disabled={!surgePricing.enabled}
                    />
                    <input
                      type="number"
                      value={surgePricing.eventMultiplier}
                      onChange={(e) => handleSurgeChange('eventMultiplier', Number(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                      step="0.1"
                      disabled={!surgePricing.enabled}
                    />
                    <span className="text-gray-600 font-semibold">×</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Special events, concerts, festivals</p>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      LKR 1000 ride becomes: <span className="font-bold">LKR {(1000 * surgePricing.eventMultiplier).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Surge Pricing Info */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-5">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-1" />
                  <div>
                    <h3 className="text-yellow-800 font-semibold mb-2">Surge Pricing Guidelines</h3>
                    <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                      <li>Multipliers are applied on top of the base fare calculation</li>
                      <li>Multiple surge factors can be combined (e.g., peak hour + weather)</li>
                      <li>Riders are notified before booking when surge pricing is active</li>
                      <li>Excessive surge multipliers may reduce ride acceptance rates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Types Tab */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Vehicle Type Pricing</h2>
                  <p className="text-gray-600 text-sm">Configure pricing multipliers for different vehicle categories</p>
                </div>
                <Car className="h-8 w-8 text-blue-600" />
              </div>

              {/* Vehicle Types List */}
              <div className="grid grid-cols-1 gap-4">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`bg-white border-2 rounded-lg p-6 transition-all ${vehicle.active ? 'border-blue-300' : 'border-gray-200 opacity-60'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Car className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{vehicle.type}</h3>
                          <p className="text-sm text-gray-600">
                            {vehicle.active ? 'Active vehicle category' : 'Inactive category'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleVehicleTypeChange(vehicle.id, 'active', !vehicle.active)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${vehicle.active ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${vehicle.active ? 'translate-x-8' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Base Fare Multiplier */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Base Fare Multiplier
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0.5"
                            max="2.5"
                            step="0.1"
                            value={vehicle.baseMultiplier}
                            onChange={(e) => handleVehicleTypeChange(vehicle.id, 'baseMultiplier', Number(e.target.value))}
                            className="flex-1"
                            disabled={!vehicle.active}
                          />
                          <input
                            type="number"
                            value={vehicle.baseMultiplier}
                            onChange={(e) => handleVehicleTypeChange(vehicle.id, 'baseMultiplier', Number(e.target.value))}
                            className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                            step="0.1"
                            disabled={!vehicle.active}
                          />
                          <span className="text-gray-600 font-semibold">×</span>
                        </div>
                        <p className="text-gray-600 text-xs mt-2">
                          Base fare: LKR {(fareConfig.baseFare * vehicle.baseMultiplier).toFixed(2)}
                        </p>
                      </div>

                      {/* Per KM Multiplier */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Per KM Rate Multiplier
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0.5"
                            max="2.5"
                            step="0.1"
                            value={vehicle.perKmMultiplier}
                            onChange={(e) => handleVehicleTypeChange(vehicle.id, 'perKmMultiplier', Number(e.target.value))}
                            className="flex-1"
                            disabled={!vehicle.active}
                          />
                          <input
                            type="number"
                            value={vehicle.perKmMultiplier}
                            onChange={(e) => handleVehicleTypeChange(vehicle.id, 'perKmMultiplier', Number(e.target.value))}
                            className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                            step="0.1"
                            disabled={!vehicle.active}
                          />
                          <span className="text-gray-600 font-semibold">×</span>
                        </div>
                        <p className="text-gray-600 text-xs mt-2">
                          Per KM: LKR {(fareConfig.perKmRate * vehicle.perKmMultiplier).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Sample Calculation */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 mb-2 font-semibold">Sample Fare (10 km, 20 min):</p>
                      <p className="text-xl font-bold text-blue-600">
                        LKR {(
                          (fareConfig.baseFare * vehicle.baseMultiplier) +
                          (10 * fareConfig.perKmRate * vehicle.perKmMultiplier) +
                          (20 * fareConfig.perMinuteRate) +
                          fareConfig.bookingFee
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Vehicle Type */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                <Car className="h-5 w-5 mr-2" />
                Add New Vehicle Type
              </Button>
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Platform Policies</h2>
                  <p className="text-gray-600 text-sm">Configure operational rules and guidelines</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Max Cancellations */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Max Cancellations/Day</label>
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <input
                    type="number"
                    value={policies.maxCancellations}
                    onChange={(e) => handlePolicyChange('maxCancellations', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-bold"
                    min="1"
                    max="10"
                  />
                  <p className="text-gray-600 text-sm mt-3">Maximum allowed cancellations per user per day</p>
                </div>

                {/* Cancellation Window */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Free Cancellation Window</label>
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <input
                    type="number"
                    value={policies.cancellationWindow}
                    onChange={(e) => handlePolicyChange('cancellationWindow', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-bold"
                    min="1"
                    max="15"
                  />
                  <p className="text-gray-600 text-sm mt-3">Minutes after booking for free cancellation</p>
                </div>

                {/* Rating Threshold */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Minimum Rating Threshold</label>
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <input
                    type="number"
                    value={policies.ratingThreshold}
                    onChange={(e) => handlePolicyChange('ratingThreshold', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-bold"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                  />
                  <p className="text-gray-600 text-sm mt-3">Minimum rating required for active drivers</p>
                </div>

                {/* Max Wait Time */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Max Wait Time</label>
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <input
                    type="number"
                    value={policies.maxWaitTime}
                    onChange={(e) => handlePolicyChange('maxWaitTime', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-bold"
                    min="5"
                    max="30"
                  />
                  <p className="text-gray-600 text-sm mt-3">Maximum driver wait time (minutes) before charging</p>
                </div>

                {/* Refund Policy */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Refund Policy</label>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <select
                    value={policies.refundPolicy}
                    onChange={(e) => handlePolicyChange('refundPolicy', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base font-semibold"
                  >
                    <option value="auto">Automatic (Algorithm-based)</option>
                    <option value="manual">Manual Review Required</option>
                    <option value="instant">Instant Refund</option>
                    <option value="none">No Refunds</option>
                  </select>
                  <p className="text-gray-600 text-sm mt-3">How refund requests are processed</p>
                </div>

                {/* Dispute Resolution */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-base font-semibold text-gray-800">Dispute Resolution Time</label>
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <input
                    type="number"
                    value={policies.disputeResolution}
                    onChange={(e) => handlePolicyChange('disputeResolution', Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-bold"
                    min="6"
                    max="72"
                  />
                  <p className="text-gray-600 text-sm mt-3">Maximum hours to resolve disputes</p>
                </div>
              </div>

              {/* Policy Summary */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Current Policy Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Cancellation Policy</p>
                    <p className="text-sm font-semibold text-gray-800">
                      Max {policies.maxCancellations}/day, Free within {policies.cancellationWindow} min
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Rating Requirements</p>
                    <p className="text-sm font-semibold text-gray-800">
                      Minimum {policies.ratingThreshold} stars to stay active
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Refund Processing</p>
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {policies.refundPolicy} refund policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper Components
function Calculator({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  )
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
