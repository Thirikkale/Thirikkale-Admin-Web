import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';
import { getAllVehicles, updateVehicleDocumentVerificationStatus, type Vehicle as BackendVehicle } from '@/lib/api/adminService';
import { Loader } from '@/components/ui/loader';
import { AlertCircle, X, CheckCircle, XCircle, RefreshCw, Eye, FileText } from 'lucide-react';

interface Vehicle {
  id: string;
  readableId?: string; // V00001, V00002 - for display
  plate: string;
  type: string;
  owner: string;
  driverId: string;
  driverReadableId?: string; // D00001 - for display
  status: string;
  registered: string;
  avatar: string;
  model?: string;
  year?: string;
  color?: string;
  make?: string;
  isActive: boolean;
  isVerified: boolean;
  revenueLicenseUrl?: string;
  vehicleRegistrationUrl?: string;
  vehicleInsuranceUrl?: string;
  revenueLicenseVerificationStatus?: string;
  vehicleRegistrationVerificationStatus?: string;
  vehicleInsuranceVerificationStatus?: string;
  insuranceCompany?: string;
  insurancePolicyNumber?: string;
  insuranceExpiry?: string;
  revenueLicenseExpiry?: string;
}

const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'APPROVED':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'PENDING':
    case 'PENDING_REVIEW':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'RESUBMISSION_REQUIRED':
      return 'bg-orange-100 text-orange-800 border border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const getVehicleTypeAvatar = (type: string) => {
  const t = type?.toLowerCase();
  if (t?.includes('car')) return '🚗';
  if (t?.includes('van')) return '🚐';
  if (t?.includes('bike') || t?.includes('motorcycle')) return '🏍️';
  if (t?.includes('tuk') || t?.includes('three')) return '🛺';
  return '🚙';
};

export default function VehicleManagement() {
  const { setPageHeader } = usePageHeader();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ url: string; type: string } | null>(null);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    setPageHeader({
      title: 'Vehicle Management',
      subtitle: 'Manage vehicles, registration, and compliance.',
    });
  }, [setPageHeader]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllVehicles();

      if (response?.data) {
        const mappedVehicles: Vehicle[] = response.data.map((v: BackendVehicle) => ({
          id: v.vehicleId,
          readableId: v.readableId, // V00001, V00002, etc.
          plate: v.vehicleRegistration,
          type: v.vehicleType,
          owner: v.driverName,
          driverId: v.driverId,
          driverReadableId: v.driverReadableId, // D00001
          status: v.verificationStatus || 'PENDING',
          registered: v.createdAt ? new Date(v.createdAt).toISOString().split('T')[0] : 'N/A',
          avatar: getVehicleTypeAvatar(v.vehicleType),
          model: v.vehicleModel,
          year: v.vehicleYear,
          color: v.vehicleColor,
          make: v.vehicleMake,
          isActive: v.isActive,
          isVerified: v.isVerified,
          revenueLicenseUrl: v.revenueLicenseUrl,
          vehicleRegistrationUrl: v.vehicleRegistrationUrl,
          vehicleInsuranceUrl: v.vehicleInsuranceUrl,
          revenueLicenseVerificationStatus: v.revenueLicenseVerificationStatus,
          vehicleRegistrationVerificationStatus: v.vehicleRegistrationVerificationStatus,
          vehicleInsuranceVerificationStatus: v.vehicleInsuranceVerificationStatus,
          insuranceCompany: v.insuranceCompany,
          insurancePolicyNumber: v.insurancePolicyNumber,
          insuranceExpiry: v.insuranceExpiry,
          revenueLicenseExpiry: v.revenueLicenseExpiry,
        }));
        setVehicles(mappedVehicles);
      } else {
        setError('Failed to fetch vehicles');
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('An error occurred while fetching vehicles');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { name: 'All', count: vehicles.length },
    { name: 'Approved', count: vehicles.filter((v) => v.status?.toUpperCase() === 'APPROVED').length },
    { name: 'Pending', count: vehicles.filter((v) => ['PENDING', 'PENDING_REVIEW'].includes(v.status?.toUpperCase())).length },
    { name: 'Rejected', count: vehicles.filter((v) => v.status?.toUpperCase() === 'REJECTED').length },
  ];

  const filteredVehicles = vehicles.filter(
    (vehicle) => {
      const matchesTab = activeTab === 'All' ||
        (activeTab === 'Pending' && ['PENDING', 'PENDING_REVIEW'].includes(vehicle.status?.toUpperCase())) ||
        vehicle.status?.toUpperCase() === activeTab.toUpperCase();

      const matchesSearch = search === '' ||
        vehicle.plate?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.owner?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.type?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.readableId?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.driverReadableId?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.id?.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    }
  );

  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleViewDocument = (url: string, type: string) => {
    setSelectedDocument({ url, type });
    setShowDocumentViewer(true);
  };

  const handleDocumentAction = async (documentType: string, action: 'approve' | 'reject' | 'resubmit') => {
    if (!selectedVehicle) return;

    const statusMap: Record<string, 'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED'> = {
      approve: 'APPROVED',
      reject: 'REJECTED',
      resubmit: 'RESUBMISSION_REQUIRED'
    };

    try {
      setProcessingAction(true);
      const response = await updateVehicleDocumentVerificationStatus(
        selectedVehicle.id,
        documentType,
        statusMap[action]
      );

      if (response?.data) {
        // Update local state
        setSelectedVehicle(prev => {
          if (!prev) return prev;
          const fieldName = `${documentType}VerificationStatus` as keyof Vehicle;
          return { ...prev, [fieldName]: statusMap[action] };
        });

        setVehicles(prev => prev.map(v => {
          if (v.id === selectedVehicle.id) {
            const fieldName = `${documentType}VerificationStatus` as keyof Vehicle;
            return { ...v, [fieldName]: statusMap[action] };
          }
          return v;
        }));

        alert(`Document ${action}d successfully`);
        setShowDocumentViewer(false);
      } else {
        alert(`Failed to ${action} document`);
      }
    } catch (err) {
      console.error(`Error ${action}ing document:`, err);
      alert(`An error occurred while ${action}ing the document`);
    } finally {
      setProcessingAction(false);
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-blue-600" />
          <span className="ml-3 text-gray-600">Loading vehicles...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
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
              placeholder="Search by plate, owner, type, vehicle ID (V00001), or driver ID (D00001)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            <div className="bg-gray-100 border-b-2 border-gray-300">
              <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Vehicle Info</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Type</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Owner</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Registered</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</div>
                <div className="text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
              </div>
            </div>
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No vehicles found
              </div>
            ) : (
              filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                  <div className="grid gap-4 px-6 py-4 items-center" style={{ gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}>
                    {/* Vehicle Info Column */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg border border-gray-300">
                          {vehicle.avatar}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">{vehicle.plate}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">ID:</span>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {vehicle.readableId || vehicle.id.substring(0, 8)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Type Column */}
                    <div className="text-sm text-gray-700 text-center">{vehicle.type}</div>
                    {/* Owner Column */}
                    <div className="text-sm text-gray-700 text-center">{vehicle.owner}</div>
                    {/* Registered Column */}
                    <div className="text-sm text-gray-700 text-center">{vehicle.registered}</div>
                    {/* Status Column */}
                    <div className="text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </div>
                    {/* Actions Column */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewVehicle(vehicle)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1.5 rounded-md border border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Vehicle Details Modal */}
      {showModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Vehicle Details</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedVehicle.plate} • Vehicle ID: <span className="font-semibold text-blue-600">
                    {selectedVehicle.readableId || selectedVehicle.id}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Vehicle ID</p>
                    <p className="text-sm font-semibold text-blue-600">{selectedVehicle.readableId || selectedVehicle.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Registration Number</p>
                    <p className="text-sm font-medium text-gray-900">{selectedVehicle.plate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Type</p>
                    <p className="text-sm font-medium text-gray-900">{selectedVehicle.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Owner</p>
                    <p className="text-sm font-medium text-gray-900">{selectedVehicle.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Driver ID</p>
                    <p className="text-sm font-semibold text-blue-600">{selectedVehicle.driverReadableId || selectedVehicle.driverId}</p>
                  </div>
                  {selectedVehicle.make && (
                    <div>
                      <p className="text-sm text-gray-600">Make</p>
                      <p className="text-sm font-medium text-gray-900">{selectedVehicle.make}</p>
                    </div>
                  )}
                  {selectedVehicle.model && (
                    <div>
                      <p className="text-sm text-gray-600">Model</p>
                      <p className="text-sm font-medium text-gray-900">{selectedVehicle.model}</p>
                    </div>
                  )}
                  {selectedVehicle.year && (
                    <div>
                      <p className="text-sm text-gray-600">Year</p>
                      <p className="text-sm font-medium text-gray-900">{selectedVehicle.year}</p>
                    </div>
                  )}
                  {selectedVehicle.color && (
                    <div>
                      <p className="text-sm text-gray-600">Color</p>
                      <p className="text-sm font-medium text-gray-900">{selectedVehicle.color}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedVehicle.status)}`}>
                      {selectedVehicle.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-sm font-medium text-gray-900">{selectedVehicle.isActive ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              {(selectedVehicle.insuranceCompany || selectedVehicle.insurancePolicyNumber) && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedVehicle.insuranceCompany && (
                      <div>
                        <p className="text-sm text-gray-600">Insurance Company</p>
                        <p className="text-sm font-medium text-gray-900">{selectedVehicle.insuranceCompany}</p>
                      </div>
                    )}
                    {selectedVehicle.insurancePolicyNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Policy Number</p>
                        <p className="text-sm font-medium text-gray-900">{selectedVehicle.insurancePolicyNumber}</p>
                      </div>
                    )}
                    {selectedVehicle.insuranceExpiry && (
                      <div>
                        <p className="text-sm text-gray-600">Insurance Expiry</p>
                        <p className="text-sm font-medium text-gray-900">{selectedVehicle.insuranceExpiry}</p>
                      </div>
                    )}
                    {selectedVehicle.revenueLicenseExpiry && (
                      <div>
                        <p className="text-sm text-gray-600">Revenue License Expiry</p>
                        <p className="text-sm font-medium text-gray-900">{selectedVehicle.revenueLicenseExpiry}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Document Verification */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Verification
                </h3>
                <div className="space-y-3">
                  {/* Revenue License */}
                  {selectedVehicle.revenueLicenseUrl && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Revenue License</p>
                          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${getStatusColor(selectedVehicle.revenueLicenseVerificationStatus || 'PENDING')}`}>
                            {selectedVehicle.revenueLicenseVerificationStatus || 'PENDING'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDocument(selectedVehicle.revenueLicenseUrl!, 'revenueLicense')}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  )}

                  {/* Vehicle Registration */}
                  {selectedVehicle.vehicleRegistrationUrl && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Vehicle Registration</p>
                          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${getStatusColor(selectedVehicle.vehicleRegistrationVerificationStatus || 'PENDING')}`}>
                            {selectedVehicle.vehicleRegistrationVerificationStatus || 'PENDING'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDocument(selectedVehicle.vehicleRegistrationUrl!, 'vehicleRegistration')}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  )}

                  {/* Vehicle Insurance */}
                  {selectedVehicle.vehicleInsuranceUrl && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Vehicle Insurance</p>
                          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${getStatusColor(selectedVehicle.vehicleInsuranceVerificationStatus || 'PENDING')}`}>
                            {selectedVehicle.vehicleInsuranceVerificationStatus || 'PENDING'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDocument(selectedVehicle.vehicleInsuranceUrl!, 'vehicleInsurance')}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {showDocumentViewer && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            {/* Document Viewer Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Document Verification</h3>
                <p className="text-sm text-blue-100 mt-0.5">
                  {selectedDocument.type.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
              <button
                onClick={() => setShowDocumentViewer(false)}
                className="text-white hover:text-gray-200 transition-colors"
                disabled={processingAction}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Document Display */}
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={selectedDocument.url}
                  alt="Document"
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-center gap-3">
              <button
                onClick={() => handleDocumentAction(selectedDocument.type, 'approve')}
                disabled={processingAction}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-md"
              >
                <CheckCircle className="w-5 h-5" />
                {processingAction ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={() => handleDocumentAction(selectedDocument.type, 'reject')}
                disabled={processingAction}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-md"
              >
                <XCircle className="w-5 h-5" />
                {processingAction ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={() => handleDocumentAction(selectedDocument.type, 'resubmit')}
                disabled={processingAction}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-md"
              >
                <RefreshCw className="w-5 h-5" />
                {processingAction ? 'Processing...' : 'Request Resubmission'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
