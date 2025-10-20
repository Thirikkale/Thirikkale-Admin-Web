import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';
import { getAllDrivers, updateDocumentVerificationStatus, type Driver as BackendDriver } from '@/lib/api/adminService';
import { Loader } from '@/components/ui/loader';
import { AlertCircle } from 'lucide-react';

// Frontend driver interface for display
interface Driver {
  id: string;
  name: string;
  city: string;
  email: string;
  gender: string;
  status: string; // Based on profileExtractionStatus
  createdTime: string;
  avatar: string;
  phoneNumber?: string;
  rating?: number;
  totalRides?: number;
  isVerified?: boolean;
  isAvailable?: boolean;
  profileExtractionStatus?: string;
  verificationProgress?: number;
  documentVerificationStatus?: string;
  // Document URLs
  selfieUrl?: string;
  drivingLicenseUrl?: string;
  revenueLicenseUrl?: string;
  vehicleRegistrationUrl?: string;
  vehicleInsuranceUrl?: string;
  // Individual document statuses
  selfieStatus?: string;
  drivingLicenseStatus?: string;
  revenueLicenseStatus?: string;
  vehicleRegistrationStatus?: string;
  vehicleInsuranceStatus?: string;
}

// Map backend driver to frontend format
const mapDriverToFrontend = (backendDriver: BackendDriver): Driver => {
  const fullName = `${backendDriver.firstName} ${backendDriver.lastName}`.trim();

  // Determine status ONLY based on profileExtractionStatus from database
  const profileStatus = backendDriver.profileExtractionStatus || 'PENDING';
  let status: string;

  switch (profileStatus) {
    case 'COMPLETED':
      status = 'Completed';
      break;
    case 'IN_PROGRESS':
      status = 'In Progress';
      break;
    case 'FAILED':
      status = 'Failed';
      break;
    case 'PENDING':
    default:
      status = 'Pending';
      break;
  }

  // Determine avatar based on gender (you can enhance this logic)
  const avatar = '🧑';

  // Helper function to build full document URL
  const buildDocumentUrl = (filename: string | null | undefined): string | undefined => {
    if (!filename) return undefined;
    // If already a full URL, return as is
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }
    // Otherwise, prepend the base URL with context path and URL encode the filename
    const encodedFilename = encodeURIComponent(filename);
    return `http://localhost:8081/user-service/uploads/${encodedFilename}`;
  };

  return {
    id: backendDriver.driverId || '',
    name: fullName || 'Unknown Driver',
    city: 'N/A', // Backend doesn't provide city, you may need to add this field
    email: backendDriver.email || '',
    gender: 'N/A', // Backend doesn't provide gender, you may need to add this field
    status,
    createdTime: backendDriver.createdAt ? new Date(backendDriver.createdAt).toLocaleString() : 'N/A',
    avatar,
    phoneNumber: backendDriver.phoneNumber,
    rating: backendDriver.rating,
    totalRides: backendDriver.totalRidesCompleted,
    isVerified: backendDriver.isVerified,
    isAvailable: backendDriver.isAvailable,
    profileExtractionStatus: backendDriver.profileExtractionStatus,
    verificationProgress: backendDriver.verificationProgress,
    documentVerificationStatus: backendDriver.documentVerificationStatus,
    // Document URLs - build full URLs from filenames
    selfieUrl: buildDocumentUrl(backendDriver.selfieUrl),
    drivingLicenseUrl: buildDocumentUrl(backendDriver.drivingLicenseUrl),
    revenueLicenseUrl: buildDocumentUrl(backendDriver.revenueLicenseUrl),
    vehicleRegistrationUrl: buildDocumentUrl(backendDriver.vehicleRegistrationUrl),
    vehicleInsuranceUrl: buildDocumentUrl(backendDriver.vehicleInsuranceUrl),
    // Individual document statuses - fetch from database
    selfieStatus: backendDriver.selfieVerificationStatus || 'PENDING',
    drivingLicenseStatus: backendDriver.drivingLicenseVerificationStatus || 'PENDING',
    revenueLicenseStatus: backendDriver.revenueLicenseVerificationStatus || 'PENDING',
    vehicleRegistrationStatus: backendDriver.vehicleRegistrationVerificationStatus || 'PENDING',
    vehicleInsuranceStatus: backendDriver.vehicleInsuranceVerificationStatus || 'PENDING',
  };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'Failed':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

// Helper function to get document verification status colors and labels
const getDocumentStatusStyle = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'APPROVED':
      return {
        color: 'bg-green-100 text-green-700',
        label: 'Approved'
      };
    case 'REJECTED':
      return {
        color: 'bg-red-100 text-red-700',
        label: 'Rejected'
      };
    case 'RESUBMISSION_REQUIRED':
      return {
        color: 'bg-orange-100 text-orange-700',
        label: 'Resubmit'
      };
    case 'PENDING':
    default:
      return {
        color: 'bg-yellow-100 text-yellow-700',
        label: 'Pending'
      };
  }
};

export default function DriverManagement() {
  const { setPageHeader } = usePageHeader();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Document viewer modal state
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string;
    type: string;
    currentStatus: string;
    driverId: string;
  } | null>(null);

  useEffect(() => {
    setPageHeader({
      title: 'Driver Management',
      subtitle: 'Manage driver accounts, profiles, and activity.',
    });
  }, [setPageHeader]);

  // Fetch drivers from backend
  useEffect(() => {
    async function fetchDrivers() {
      setLoading(true);
      setError(null);

      const response = await getAllDrivers();

      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      if (response.data) {
        const mappedDrivers = response.data.map(mapDriverToFrontend);
        setDrivers(mappedDrivers);
      }

      setLoading(false);
    }

    fetchDrivers();
  }, []);

  // Calculate tab counts dynamically based on profileExtractionStatus
  const tabCounts = {
    all: drivers.length,
    completed: drivers.filter((d) => d.status === 'Completed').length,
    inProgress: drivers.filter((d) => d.status === 'In Progress').length,
    pending: drivers.filter((d) => d.status === 'Pending').length,
    failed: drivers.filter((d) => d.status === 'Failed').length,
  };

  const tabs = [
    { name: 'All', count: tabCounts.all },
    { name: 'Completed', count: tabCounts.completed },
    { name: 'In Progress', count: tabCounts.inProgress },
    { name: 'Pending', count: tabCounts.pending },
    { name: 'Failed', count: tabCounts.failed },
  ];

  const filteredDrivers = drivers.filter(
    (driver) => {
      // Filter by active tab
      const statusMatch = activeTab === 'All' || driver.status === activeTab;

      // Filter by search
      const searchMatch =
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.email.toLowerCase().includes(search.toLowerCase()) ||
        driver.city.toLowerCase().includes(search.toLowerCase()) ||
        driver.id.toLowerCase().includes(search.toLowerCase()) ||
        (driver.phoneNumber && driver.phoneNumber.includes(search));

      return statusMatch && searchMatch;
    }
  );

  const handleViewDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  const handleViewDocument = (url: string, type: string, currentStatus: string, driverId: string) => {
    setSelectedDocument({ url, type, currentStatus, driverId });
    setIsDocumentViewerOpen(true);
  };

  const handleCloseDocumentViewer = () => {
    setIsDocumentViewerOpen(false);
    setSelectedDocument(null);
  };

  const handleDocumentAction = async (action: 'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED') => {
    if (!selectedDocument) return;

    try {
      // Show loading state
      const actionText = action === 'APPROVED' ? 'Approving' :
        action === 'REJECTED' ? 'Rejecting' :
          'Requesting resubmission for';

      console.log(`${actionText} document: ${selectedDocument.type} for driver: ${selectedDocument.driverId}`);

      // Call API to update document status
      const response = await updateDocumentVerificationStatus(
        selectedDocument.driverId,
        selectedDocument.type,
        action
      );

      if (response.error) {
        alert(`Error: ${response.error}`);
        return;
      }

      // Success - update the local state
      setDrivers(prevDrivers =>
        prevDrivers.map(driver => {
          if (driver.id === selectedDocument.driverId) {
            // Update the specific document status
            const updatedDriver = { ...driver };
            switch (selectedDocument.type) {
              case 'selfie':
                updatedDriver.selfieStatus = action;
                break;
              case 'drivingLicense':
                updatedDriver.drivingLicenseStatus = action;
                break;
              case 'revenueLicense':
                updatedDriver.revenueLicenseStatus = action;
                break;
              case 'vehicleRegistration':
                updatedDriver.vehicleRegistrationStatus = action;
                break;
              case 'vehicleInsurance':
                updatedDriver.vehicleInsuranceStatus = action;
                break;
            }
            return updatedDriver;
          }
          return driver;
        })
      );

      // Also update selectedDriver if it's the same driver
      if (selectedDriver && selectedDriver.id === selectedDocument.driverId) {
        setSelectedDriver(prev => {
          if (!prev) return prev;
          const updated = { ...prev };
          switch (selectedDocument.type) {
            case 'selfie':
              updated.selfieStatus = action;
              break;
            case 'drivingLicense':
              updated.drivingLicenseStatus = action;
              break;
            case 'revenueLicense':
              updated.revenueLicenseStatus = action;
              break;
            case 'vehicleRegistration':
              updated.vehicleRegistrationStatus = action;
              break;
            case 'vehicleInsurance':
              updated.vehicleInsuranceStatus = action;
              break;
          }
          return updated;
        });
      }

      const successText = action === 'APPROVED' ? 'approved' :
        action === 'REJECTED' ? 'rejected' :
          'marked for resubmission';
      alert(`Document ${successText} successfully!`);
      handleCloseDocumentViewer();
    } catch (error) {
      console.error('Error updating document status:', error);
      alert('An error occurred while updating the document status.');
    }
  };

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
            placeholder="Search by name, email, city, or ID"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="bg-gray-100 border-b-2 border-gray-300">
            <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1.2fr 1.5fr' }}>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Driver Info</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Rating</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
              <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader size="lg" text="Loading drivers..." />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-600 text-center mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          )}

          {/* No Data State */}
          {!loading && !error && filteredDrivers.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">No drivers found</p>
            </div>
          )}

          {/* Driver List */}
          {!loading && !error && filteredDrivers.map((driver) => (
            <div key={driver.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 2fr 0.8fr 1.2fr 1.5fr' }}>
                {/* Driver Info Column */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {driver.selfieUrl ? (
                      <img
                        src={driver.selfieUrl}
                        alt={driver.name}
                        className="h-10 w-10 rounded-full object-cover border-2 border-blue-300"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-sm border border-blue-300 ${driver.selfieUrl ? 'hidden' : ''}`}>
                      {driver.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{driver.name}</p>
                    </div>
                    {driver.phoneNumber && (
                      <p className="text-xs text-gray-500 truncate">📞 {driver.phoneNumber}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">ID:</span>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded" title={driver.id}>
                        {driver.id ? driver.id.substring(0, 8) + '...' : 'N/A'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{driver.createdTime}</p>
                  </div>
                </div>
                {/* Email Column */}
                <div className="text-sm text-gray-700 truncate text-center" title={driver.email}>
                  {driver.email}
                </div>
                {/* Rating Column */}
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      {driver.rating ? driver.rating.toFixed(1) : 'N/A'}
                    </span>
                    {driver.rating && (
                      <span className="text-xs text-yellow-500">⭐</span>
                    )}
                    {driver.totalRides !== undefined && (
                      <span className="text-xs text-gray-500 mt-1">
                        {driver.totalRides} rides
                      </span>
                    )}
                  </div>
                </div>
                {/* Status Column */}
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(driver.status)}`}>
                    {driver.status}
                  </span>
                  {driver.profileExtractionStatus && (
                    <div className="text-xs text-gray-500 mt-1">
                      {driver.profileExtractionStatus}
                    </div>
                  )}

                  {/* Always show verification progress if the backend provides it (including 0%) */}
                  {driver.verificationProgress !== undefined && (
                    <div className="mt-1 w-full max-w-[140px] mx-auto">
                      <div className="text-xs text-blue-600">{driver.verificationProgress}%</div>
                      <div className="h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${Math.max(0, Math.min(100, driver.verificationProgress || 0))}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {/* Actions Column */}
                <div className="flex flex-col space-y-1 items-center">
                  <button
                    onClick={() => handleViewDriver(driver)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-20"
                  >
                    View
                  </button>
                  {driver.status === 'Completed' && (
                    <button className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded-md border border-green-300 hover:bg-green-50 transition-colors w-20">
                      Approve
                    </button>
                  )}
                  {driver.status === 'Failed' && (
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors w-20">
                      Retry
                    </button>
                  )}
                  <button className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded-md border border-red-300 hover:bg-red-50 transition-colors w-20">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Driver Details Modal */}
      {isModalOpen && selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={handleCloseModal}>
          <div
            className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Close Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={handleCloseModal}
                className="bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="p-4">

              {/* Header Section with Profile */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 mb-4 shadow-lg">
                <div className="flex items-center gap-4">
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    {selectedDriver.selfieUrl ? (
                      <img
                        src={selectedDriver.selfieUrl}
                        alt={selectedDriver.name}
                        className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`h-20 w-20 rounded-full bg-white flex items-center justify-center text-3xl border-4 border-white shadow-xl ${selectedDriver.selfieUrl ? 'hidden' : ''}`}>
                      {selectedDriver.avatar}
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="flex-1 text-white">
                    <h2 className="text-2xl font-bold mb-1">{selectedDriver.name}</h2>
                    <div className="flex items-center gap-3 text-sm flex-wrap mt-2">
                      <span className={`px-3 py-1 rounded-full font-semibold shadow-md ${selectedDriver.isAvailable
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-white'
                        }`}>
                        {selectedDriver.isAvailable ? '🟢 Online' : '⚫ Offline'}
                      </span>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="flex gap-4 text-white">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedDriver.rating ? selectedDriver.rating.toFixed(1) : 'N/A'}</div>
                      <div className="text-blue-100 text-xs">Rating ⭐</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedDriver.totalRides || 0}</div>
                      <div className="text-blue-100 text-xs">Rides</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-4">

                {/* LEFT COLUMN */}
                <div className="space-y-4">

                  {/* Account Information */}
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center border-b border-gray-200 pb-2">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      Account Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-500">Full Name:</span>
                        <span className="text-sm font-semibold text-gray-800 text-right">{selectedDriver.name}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-500">Driver ID:</span>
                        <span className="text-sm font-mono font-semibold text-blue-600 text-right break-all">{selectedDriver.id}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-500">Registration Date:</span>
                        <span className="text-sm font-semibold text-gray-800 text-right">{selectedDriver.createdTime || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-500">Profile Status:</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${selectedDriver.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          selectedDriver.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            selectedDriver.status === 'Failed' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                          }`}>
                          {selectedDriver.status || 'Pending'}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-500">Verification Progress:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${(selectedDriver.verificationProgress || 0) === 100
                                ? 'bg-green-500'
                                : (selectedDriver.verificationProgress || 0) >= 50
                                  ? 'bg-blue-500'
                                  : 'bg-yellow-500'
                                }`}
                              style={{ width: `${Math.max(0, Math.min(100, selectedDriver.verificationProgress || 0))}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-700">{selectedDriver.verificationProgress || 0}%</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-500">Verified:</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${selectedDriver.isVerified
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                          }`}>
                          {selectedDriver.isVerified ? '✓ Verified' : '✗ Not Verified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center border-b border-gray-200 pb-2">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-semibold text-gray-800 truncate">{selectedDriver.phoneNumber || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-semibold text-gray-800 truncate" title={selectedDriver.email}>{selectedDriver.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">

                  {/* Document Verification */}
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center border-b border-gray-200 pb-2">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Document Verification
                    </h3>
                    <div className="grid grid-cols-3 gap-3">

                      {/* Profile Picture */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-200 hover:shadow-md transition-shadow">
                        <div className="text-center mb-1">
                          <span className="text-2xl">📸</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 text-center mb-1">Profile Picture</p>
                        <div className="flex justify-center mb-1">
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getDocumentStatusStyle(selectedDriver.selfieStatus || 'PENDING').color}`}>
                            {getDocumentStatusStyle(selectedDriver.selfieStatus || 'PENDING').label}
                          </span>
                        </div>
                        {selectedDriver.selfieUrl ? (
                          <button
                            onClick={() => handleViewDocument(
                              selectedDriver.selfieUrl!,
                              'selfie',
                              selectedDriver.selfieStatus || 'PENDING',
                              selectedDriver.id
                            )}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow transition-all duration-200 hover:scale-105"
                          >
                            View
                          </button>
                        ) : (
                          <button disabled className="w-full bg-gray-200 text-gray-400 px-2 py-1 rounded-lg text-xs cursor-not-allowed">
                            N/A
                          </button>
                        )}
                      </div>

                      {/* Driving License */}
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-2 border border-indigo-200 hover:shadow-md transition-shadow">
                        <div className="text-center mb-1">
                          <span className="text-2xl">🪪</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 text-center mb-1">Driving License</p>
                        <div className="flex justify-center mb-1">
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getDocumentStatusStyle(selectedDriver.drivingLicenseStatus || 'PENDING').color}`}>
                            {getDocumentStatusStyle(selectedDriver.drivingLicenseStatus || 'PENDING').label}
                          </span>
                        </div>
                        {selectedDriver.drivingLicenseUrl ? (
                          <button
                            onClick={() => handleViewDocument(
                              selectedDriver.drivingLicenseUrl!,
                              'drivingLicense',
                              selectedDriver.drivingLicenseStatus || 'PENDING',
                              selectedDriver.id
                            )}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow transition-all duration-200 hover:scale-105"
                          >
                            View
                          </button>
                        ) : (
                          <button disabled className="w-full bg-gray-200 text-gray-400 px-2 py-1 rounded-lg text-xs cursor-not-allowed">
                            N/A
                          </button>
                        )}
                      </div>

                      {/* Revenue License */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200 hover:shadow-md transition-shadow">
                        <div className="text-center mb-1">
                          <span className="text-2xl">📋</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 text-center mb-1">Revenue License</p>
                        <div className="flex justify-center mb-1">
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getDocumentStatusStyle(selectedDriver.revenueLicenseStatus || 'PENDING').color}`}>
                            {getDocumentStatusStyle(selectedDriver.revenueLicenseStatus || 'PENDING').label}
                          </span>
                        </div>
                        {selectedDriver.revenueLicenseUrl ? (
                          <button
                            onClick={() => handleViewDocument(
                              selectedDriver.revenueLicenseUrl!,
                              'revenueLicense',
                              selectedDriver.revenueLicenseStatus || 'PENDING',
                              selectedDriver.id
                            )}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow transition-all duration-200 hover:scale-105"
                          >
                            View
                          </button>
                        ) : (
                          <button disabled className="w-full bg-gray-200 text-gray-400 px-2 py-1 rounded-lg text-xs cursor-not-allowed">
                            N/A
                          </button>
                        )}
                      </div>

                      {/* Vehicle Registration */}
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-2 border border-cyan-200 hover:shadow-md transition-shadow">
                        <div className="text-center mb-1">
                          <span className="text-2xl">🚗</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 text-center mb-1">Vehicle Registration</p>
                        <div className="flex justify-center mb-1">
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getDocumentStatusStyle(selectedDriver.vehicleRegistrationStatus || 'PENDING').color}`}>
                            {getDocumentStatusStyle(selectedDriver.vehicleRegistrationStatus || 'PENDING').label}
                          </span>
                        </div>
                        {selectedDriver.vehicleRegistrationUrl ? (
                          <button
                            onClick={() => handleViewDocument(
                              selectedDriver.vehicleRegistrationUrl!,
                              'vehicleRegistration',
                              selectedDriver.vehicleRegistrationStatus || 'PENDING',
                              selectedDriver.id
                            )}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow transition-all duration-200 hover:scale-105"
                          >
                            View
                          </button>
                        ) : (
                          <button disabled className="w-full bg-gray-200 text-gray-400 px-2 py-1 rounded-lg text-xs cursor-not-allowed">
                            N/A
                          </button>
                        )}
                      </div>

                      {/* Vehicle Insurance */}
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-2 border border-yellow-200 hover:shadow-md transition-shadow">
                        <div className="text-center mb-1">
                          <span className="text-2xl">🛡️</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 text-center mb-1">Vehicle Insurance</p>
                        <div className="flex justify-center mb-1">
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getDocumentStatusStyle(selectedDriver.vehicleInsuranceStatus || 'PENDING').color}`}>
                            {getDocumentStatusStyle(selectedDriver.vehicleInsuranceStatus || 'PENDING').label}
                          </span>
                        </div>
                        {selectedDriver.vehicleInsuranceUrl ? (
                          <button
                            onClick={() => handleViewDocument(
                              selectedDriver.vehicleInsuranceUrl!,
                              'vehicleInsurance',
                              selectedDriver.vehicleInsuranceStatus || 'PENDING',
                              selectedDriver.id
                            )}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow transition-all duration-200 hover:scale-105"
                          >
                            View
                          </button>
                        ) : (
                          <button disabled className="w-full bg-gray-200 text-gray-400 px-2 py-1 rounded-lg text-xs cursor-not-allowed">
                            N/A
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-3 flex justify-end gap-3 border-t border-blue-200 rounded-b-2xl">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold shadow-md hover:scale-105"
              >
                Close
              </button>
              {selectedDriver.status === 'Completed' && !selectedDriver.isVerified && (
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:scale-105">
                  Approve Driver
                </button>
              )}
              {!selectedDriver.isVerified && (
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:scale-105">
                  Verify Driver
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {isDocumentViewerOpen && selectedDocument && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-70" onClick={handleCloseDocumentViewer}>
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Document Viewer</h3>
                <p className="text-blue-100 text-sm mt-1">
                  {selectedDocument.type === 'selfie' && 'Profile Picture'}
                  {selectedDocument.type === 'drivingLicense' && 'Driving License'}
                  {selectedDocument.type === 'revenueLicense' && 'Revenue License'}
                  {selectedDocument.type === 'vehicleRegistration' && 'Vehicle Registration'}
                  {selectedDocument.type === 'vehicleInsurance' && 'Vehicle Insurance'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDocumentStatusStyle(selectedDocument.currentStatus).color}`}>
                  Current Status: {getDocumentStatusStyle(selectedDocument.currentStatus).label}
                </span>
                <button
                  onClick={handleCloseDocumentViewer}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
                >
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
              <div className="flex items-center justify-center h-full">
                <img
                  src={selectedDocument.url}
                  alt="Document"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">Review this document and take action:</p>
                  <p className="text-xs text-gray-500 mt-1">Driver ID: {selectedDocument.driverId.substring(0, 16)}...</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDocumentAction('REJECTED')}
                    className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                  <button
                    onClick={() => handleDocumentAction('RESUBMISSION_REQUIRED')}
                    className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Request Resubmission
                  </button>
                  <button
                    onClick={() => handleDocumentAction('APPROVED')}
                    className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
