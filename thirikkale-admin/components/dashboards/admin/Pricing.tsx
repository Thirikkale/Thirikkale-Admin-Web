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

// API Configuration - Route through AdminService
const ADMIN_SERVICE_URL = process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL || 'http://localhost:8083/admin-service'

// Vehicle Type Interface matching backend
interface VehiclePricingData {
  id: string
  vehicleType: string
  baseFare: number
  perKmRate: number
  perMinuteWaitingRate: number
  surgeMultiplier: number
  active: boolean
}

export default function Pricing() {
  const { setPageHeader } = usePageHeader()
  const [activeTab, setActiveTab] = useState('vehicles')
  const [hasChanges, setHasChanges] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('TUK')

  // Vehicle Type Pricing State (fetched from PricingService)
  const [vehicleTypes, setVehicleTypes] = useState<VehiclePricingData[]>([])

  // Commission Rates State (can be moved to AdminService later)
  const [commissionRates, setCommissionRates] = useState({
    driverCommission: 20,
    platformFee: 15,
    paymentGatewayFee: 2.5,
    referralBonus: 100,
    driverIncentive: 5
  })

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
    fetchAllPricings()
  }, [setPageHeader])

  // Fetch all vehicle pricing through AdminService
  const fetchAllPricings = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${ADMIN_SERVICE_URL}/api/admin/pricing/all`)
      if (!response.ok) {
        throw new Error('Failed to fetch pricing data')
      }
      const data: VehiclePricingData[] = await response.json()
      setVehicleTypes(data)

      // Set first vehicle type as selected if available
      if (data.length > 0 && !selectedVehicleType) {
        setSelectedVehicleType(data[0].vehicleType)
      }
    } catch (error) {
      console.error('Error fetching pricing data:', error)
      alert('Failed to load pricing data from server')
    } finally {
      setLoading(false)
    }
  }

  const handleVehiclePricingChange = (vehicleType: string, field: keyof VehiclePricingData, value: number | boolean) => {
    setVehicleTypes(prev => prev.map(v =>
      v.vehicleType === vehicleType ? { ...v, [field]: value } : v
    ))
    setHasChanges(true)
  }

  const handleCommissionChange = (field: string, value: number) => {
    setCommissionRates(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handlePolicyChange = (field: string, value: number | string) => {
    setPolicies(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSaveChanges = async () => {
    try {
      // Save each vehicle pricing through AdminService
      for (const vehicle of vehicleTypes) {
        const response = await fetch(`${ADMIN_SERVICE_URL}/api/admin/pricing/vehicle/${vehicle.vehicleType}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            baseFare: vehicle.baseFare,
            perKmRate: vehicle.perKmRate,
            perMinuteWaitingRate: vehicle.perMinuteWaitingRate,
            surgeMultiplier: vehicle.surgeMultiplier,
            active: vehicle.active
          })
        })

        if (!response.ok) {
          throw new Error(`Failed to update ${vehicle.vehicleType}`)
        }
      }

      setHasChanges(false)
      alert('✅ All pricing changes saved successfully!')
      fetchAllPricings() // Refresh data
    } catch (error) {
      console.error('Error saving changes:', error)
      alert('❌ Failed to save changes. Please try again.')
    }
  }

  const handleResetChanges = () => {
    fetchAllPricings() // Reload from server
    setHasChanges(false)
  }

  const tabs = [
    { name: 'vehicles', label: 'Vehicle Pricing', icon: Car },
    { name: 'commission', label: 'Commission Rates', icon: Percent },
    { name: 'policies', label: 'Policies', icon: Shield }
  ]

  // Get selected vehicle pricing for calculations
  const getSelectedVehicle = () => {
    return vehicleTypes.find(v => v.vehicleType === selectedVehicleType) || vehicleTypes[0]
  }

  const calculateSampleFare = (distance: number, duration: number, vehicleData?: VehiclePricingData) => {
    const vehicle = vehicleData || getSelectedVehicle()
    if (!vehicle) return 0

    const distanceCost = distance * vehicle.perKmRate
    const timeCost = duration * vehicle.perMinuteWaitingRate
    const totalFare = vehicle.baseFare + distanceCost + timeCost
    return totalFare
  }

  // Get vehicle icon
  const getVehicleIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'TUK':
        return '🛺'
      case 'RIDE':
      case 'PRIME_RIDE':
        return '🚗'
      case 'SQUAD':
        return '🚐'
      case 'RUSH':
        return '🏍️'
      default:
        return '🚙'
    }
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
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading pricing data...</span>
            </div>
          )}

          {/* Vehicle Types Tab */}
          {!loading && activeTab === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Vehicle Type Pricing</h2>
                  <p className="text-gray-600 text-sm">Configure pricing for different vehicle categories from Pricing Service</p>
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
                        <span className="text-3xl">{getVehicleIcon(vehicle.vehicleType)}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{vehicle.vehicleType}</h3>
                          <p className="text-sm text-gray-600">
                            {vehicle.active ? 'Active vehicle category' : 'Inactive category'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleVehiclePricingChange(vehicle.vehicleType, 'active', !vehicle.active)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${vehicle.active ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${vehicle.active ? 'translate-x-8' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Base Fare */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Base Fare
                        </label>
                        <input
                          type="number"
                          value={vehicle.baseFare}
                          onChange={(e) => handleVehiclePricingChange(vehicle.vehicleType, 'baseFare', Number(e.target.value))}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                          disabled={!vehicle.active}
                          step="10"
                        />
                        <p className="text-gray-600 text-xs mt-2">
                          LKR {vehicle.baseFare.toFixed(2)}
                        </p>
                      </div>

                      {/* Per KM Rate */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Per KM Rate
                        </label>
                        <input
                          type="number"
                          value={vehicle.perKmRate}
                          onChange={(e) => handleVehiclePricingChange(vehicle.vehicleType, 'perKmRate', Number(e.target.value))}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                          disabled={!vehicle.active}
                          step="5"
                        />
                        <p className="text-gray-600 text-xs mt-2">
                          LKR {vehicle.perKmRate.toFixed(2)}/km
                        </p>
                      </div>

                      {/* Per Minute Waiting Rate */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Waiting Rate/Min
                        </label>
                        <input
                          type="number"
                          value={vehicle.perMinuteWaitingRate}
                          onChange={(e) => handleVehiclePricingChange(vehicle.vehicleType, 'perMinuteWaitingRate', Number(e.target.value))}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                          disabled={!vehicle.active}
                          step="1"
                        />
                        <p className="text-gray-600 text-xs mt-2">
                          LKR {vehicle.perMinuteWaitingRate.toFixed(2)}/min
                        </p>
                      </div>

                      {/* Surge Multiplier */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Surge Multiplier
                        </label>
                        <input
                          type="number"
                          value={vehicle.surgeMultiplier}
                          onChange={(e) => handleVehiclePricingChange(vehicle.vehicleType, 'surgeMultiplier', Number(e.target.value))}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold"
                          disabled={!vehicle.active}
                          step="0.1"
                          min="1.0"
                          max="5.0"
                        />
                        <p className="text-gray-600 text-xs mt-2">
                          {vehicle.surgeMultiplier.toFixed(1)}× multiplier
                        </p>
                      </div>
                    </div>

                    {/* Sample Calculation */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                      <p className="text-sm text-gray-700 mb-2 font-semibold">Sample Fares:</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded p-2 text-center">
                          <p className="text-xs text-gray-600">10 km, 20 min</p>
                          <p className="text-lg font-bold text-indigo-600">
                            LKR {calculateSampleFare(10, 20, vehicle).toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-white rounded p-2 text-center">
                          <p className="text-xs text-gray-600">25 km, 45 min</p>
                          <p className="text-lg font-bold text-indigo-600">
                            LKR {calculateSampleFare(25, 45, vehicle).toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-white rounded p-2 text-center">
                          <p className="text-xs text-gray-600">50 km, 90 min</p>
                          <p className="text-lg font-bold text-indigo-600">
                            LKR {calculateSampleFare(50, 90, vehicle).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

          {/* Policies Tab */}
          {!loading && activeTab === 'policies' && (
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
