import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';
import { getAllRiders, getRiderById, type Rider } from '@/lib/api/adminService';
import { X, User, Mail, Phone, MapPin, Calendar, Camera, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type RiderStatus = 'Active' | 'Suspended' | 'Pending' | 'Gender Verification';

interface RiderDisplay extends Rider {
  status: RiderStatus;
  fullName: string;
}

const getStatusColor = (status: RiderStatus) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'Suspended':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'Gender Verification':
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const getRiderStatus = (rider: Rider): RiderStatus => {
  if (!rider.isActive) return 'Suspended';
  if (!rider.genderVerified && rider.selfieUrl) return 'Gender Verification';
  if (!rider.isPhoneVerified) return 'Pending';
  return 'Active';
};

const getGenderIcon = (gender: string) => {
  switch (gender?.toUpperCase()) {
    case 'MALE':
      return '👨';
    case 'FEMALE':
      return '👩';
    default:
      return '👤';
  }
};

export default function RiderManagement() {
  const { setPageHeader } = usePageHeader();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [riders, setRiders] = useState<RiderDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRider, setSelectedRider] = useState<RiderDisplay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPageHeader({
      title: 'Rider Management',
      subtitle: 'Manage rider accounts, profiles, and gender verification.',
    });
    fetchRiders();
  }, [setPageHeader]);

  const fetchRiders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllRiders();

      if (response.data) {
        const ridersWithStatus: RiderDisplay[] = response.data.map(rider => ({
          ...rider,
          status: getRiderStatus(rider),
          fullName: `${rider.firstName} ${rider.lastName}`
        }));
        setRiders(ridersWithStatus);
      } else {
        setError(response.error || 'Failed to fetch riders');
      }
    } catch (err) {
      console.error('Error fetching riders:', err);
      setError('Failed to fetch riders from server');
    } finally {
      setLoading(false);
    }
  };

  const handleViewRider = async (rider: RiderDisplay) => {
    try {
      const response = await getRiderById(rider.riderId);
      if (response.data) {
        const riderWithStatus: RiderDisplay = {
          ...response.data,
          status: getRiderStatus(response.data),
          fullName: `${response.data.firstName} ${response.data.lastName}`
        };
        setSelectedRider(riderWithStatus);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Error fetching rider details:', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRider(null);
  };

  const tabs = [
    { name: 'All', count: riders.length },
    { name: 'Active', count: riders.filter((r) => r.status === 'Active').length },
    { name: 'Suspended', count: riders.filter((r) => r.status === 'Suspended').length },
    { name: 'Pending', count: riders.filter((r) => r.status === 'Pending').length },
    { name: 'Gender Verification', count: riders.filter((r) => r.status === 'Gender Verification').length },
  ];

  const filteredRiders = riders.filter(
    (rider) =>
      (activeTab === 'All' || rider.status === activeTab) &&
      (rider.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        rider.email?.toLowerCase().includes(search.toLowerCase()) ||
        rider.riderId?.toLowerCase().includes(search.toLowerCase()) ||
        rider.readableId?.toLowerCase().includes(search.toLowerCase()) ||
        rider.phoneNumber?.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading riders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">Error: {error}</span>
        </div>
        <button
          onClick={fetchRiders}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        {/* Status Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
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
            placeholder="Search by name, email, phone, or rider ID (R00001)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="bg-gray-100 border-b-2 border-gray-300">
            <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1.2fr 1.5fr' }}>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rider Info</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rides</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
            </div>
          </div>
          {filteredRiders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No riders found</p>
            </div>
          ) : (
            filteredRiders.map((rider) => (
              <div key={rider.riderId} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 1.2fr 1.5fr' }}>
                  {/* Rider Info Column */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg border-2 border-white shadow">
                        {getGenderIcon(rider.gender || 'NOT_SPECIFIED')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{rider.fullName}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-400">ID:</span>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {rider.readableId || (rider.riderId ? rider.riderId.slice(0, 8) : 'N/A')}
                        </span>
                      </div>
                      {rider.rating !== undefined && rider.rating > 0 && (
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 text-xs">⭐</span>
                          <span className="text-xs text-gray-600 ml-1">{rider.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Column */}
                  <div className="text-sm space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-gray-700">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="text-xs truncate">{rider.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-gray-700">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span className="text-xs">{rider.phoneNumber || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Gender Column */}
                  <div className="text-center">
                    <div className="text-sm text-gray-700">
                      {rider.gender === 'NOT_SPECIFIED' ? '?' : rider.gender}
                    </div>
                    {rider.genderVerified && (
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto mt-1" />
                    )}
                  </div>

                  {/* Rides Column */}
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {rider.totalRides || 0}
                    </div>
                    <div className="text-xs text-gray-500">trips</div>
                  </div>

                  {/* Status Column */}
                  <div className="text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(rider.status)}`}>
                      {rider.status}
                    </span>
                    {rider.isPhoneVerified && (
                      <div className="text-xs text-green-600 mt-1 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Phone Verified
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-col space-y-1 items-center">
                    <button
                      onClick={() => handleViewRider(rider)}
                      className="w-full text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1.5 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rider Details Modal */}
      {isModalOpen && selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedRider.fullName}</h2>
                <p className="text-sm text-gray-600">
                  Rider ID: <span className="font-semibold text-blue-600">
                    {selectedRider.readableId || selectedRider.riderId}
                  </span>
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-xs text-blue-600 font-medium mb-1">Account Status</div>
                  <div className={`text-sm font-semibold ${selectedRider.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedRider.isActive ? 'Active' : 'Suspended'}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-xs text-green-600 font-medium mb-1">Total Rides</div>
                  <div className="text-sm font-semibold text-green-900">{selectedRider.totalRides || 0}</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="text-xs text-yellow-600 font-medium mb-1">Rating</div>
                  <div className="text-sm font-semibold text-yellow-900">
                    {selectedRider.rating ? `⭐ ${selectedRider.rating.toFixed(1)}` : 'No rating'}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-xs text-purple-600 font-medium mb-1">Gender Status</div>
                  <div className="text-sm font-semibold text-purple-900">
                    {selectedRider.genderVerified ? '✓ Verified' : '⏳ Pending'}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Full Name</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedRider.fullName}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Gender</label>
                    <p className="text-sm text-gray-900 mt-1 flex items-center">
                      {selectedRider.gender === 'NOT_SPECIFIED' ? 'Not Specified' : selectedRider.gender}
                      {selectedRider.genderVerified && (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Email</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedRider.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Phone Number</label>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-gray-900">{selectedRider.phoneNumber || 'N/A'}</p>
                      {selectedRider.isPhoneVerified && (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Date of Birth</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedRider.dateOfBirth || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Women Only Access</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedRider.womenOnlyAccess ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {(selectedRider.emergencyContactName || selectedRider.emergencyContactPhone) && (
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    Emergency Contact
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Contact Name</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedRider.emergencyContactName || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Contact Phone</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedRider.emergencyContactPhone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Gender Verification Selfie */}
              {selectedRider.selfieUrl && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-blue-600" />
                    Gender Verification Selfie
                  </h3>
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedRider.selfieUrl}
                      alt="Gender verification selfie"
                      className="w-64 h-64 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-4">
                        {selectedRider.genderVerified ? (
                          <span className="flex items-center text-green-600 font-semibold">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Verified
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-600 font-semibold">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Pending Verification
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Gender detection selfie submitted for verification.
                      </p>
                      {!selectedRider.genderVerified && (
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </button>
                          <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Ride Statistics */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Ride Statistics
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Total Rides</label>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{selectedRider.totalRides || 0}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Rating</label>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {selectedRider.rating ? `⭐ ${selectedRider.rating.toFixed(1)}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Last Ride</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedRider.lastRideDate
                        ? new Date(selectedRider.lastRideDate).toLocaleDateString()
                        : 'No rides yet'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Account Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Preferred Payment</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedRider.preferredPaymentMethod || 'CASH'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Account Created</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedRider.createdAt
                        ? new Date(selectedRider.createdAt).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Edit Rider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
