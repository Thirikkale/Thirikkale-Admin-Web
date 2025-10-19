/**
 * Admin Service API Client
 * Connects to the Spring Boot Admin Backend
 */

const ADMIN_SERVICE_URL = process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL || 'http://localhost:8083/admin-service';
const USER_SERVICE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:8081/user-service';
// Note: RIDE_SERVICE_URL removed - all requests now go through ADMIN_SERVICE_URL

// Types matching your backend DTOs
export interface Driver {
  driverId: string;
  readableId?: string; // D00001, D00002 - for display
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
  profilePhotoUrl?: string;
  isAvailable: boolean;
  isVerified: boolean;
  isDocumentsUploaded: boolean;
  faceVerificationStatus: string;
  documentVerificationStatus: string;
  profileExtractionStatus: string;
  verificationDate?: string;
  verificationProgress: number;
  licenseNumber?: string;
  licenseExpiry?: string;
  vehicleRegistration?: string;
  vehicleType?: string;
  whatsappNumber?: string;
  selfieUrl?: string;
  drivingLicenseUrl?: string;
  revenueLicenseUrl?: string;
  vehicleRegistrationUrl?: string;
  vehicleInsuranceUrl?: string;
  // Individual document verification statuses
  selfieVerificationStatus?: string;
  drivingLicenseVerificationStatus?: string;
  revenueLicenseVerificationStatus?: string;
  vehicleRegistrationVerificationStatus?: string;
  vehicleInsuranceVerificationStatus?: string;
  faceMatchScore?: number;
  faceVerificationAttempts: number;
  totalEarnings: number;
  totalRidesCompleted: number;
  rating: number;
  isActive: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  nextRequiredAction?: string;
}

export interface Rider {
  riderId: string;
  readableId?: string; // R00001, R00002 - for display
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
  profilePhotoUrl?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  gender: string;
  selfieUrl?: string;
  womenOnlyAccess: boolean;
  genderVerified: boolean;
  rating: number;
  totalRides: number;
  lastRideDate?: string;
  preferredPaymentMethod: string;
  isActive: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
  profilePhotoUrl?: string;
  isActive: boolean;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface Vehicle {
  vehicleId: string;
  readableId?: string; // V00001, V00002 - for display
  driverId: string;
  driverReadableId?: string; // D00001 - for display
  driverName: string;
  vehicleType: string;
  vehicleRegistration: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  vehicleMake?: string;
  isActive: boolean;
  isVerified: boolean;
  isDocumentsUploaded: boolean;
  verificationStatus: string;
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
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Generic API fetch function with error handling
 */
async function apiFetch<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

/**
 * ==================== DRIVER APIs ====================
 */

/**
 * Get all drivers through admin service
 */
export async function getAllDrivers(): Promise<ApiResponse<Driver[]>> {
  return apiFetch<Driver[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers`);
}

/**
 * Get driver by ID
 */
export async function getDriverById(driverId: string): Promise<ApiResponse<Driver>> {
  return apiFetch<Driver>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers/${driverId}`);
}

/**
 * Get pending verification drivers
 */
export async function getPendingVerificationDrivers(): Promise<ApiResponse<Driver[]>> {
  return apiFetch<Driver[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers/pending-verification`);
}

/**
 * Get drivers pending documents
 */
export async function getDriversPendingDocuments(): Promise<ApiResponse<Driver[]>> {
  return apiFetch<Driver[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers/pending-documents`);
}

/**
 * Get available drivers
 */
export async function getAvailableDrivers(): Promise<ApiResponse<Driver[]>> {
  return apiFetch<Driver[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers/available`);
}

/**
 * Update driver verification status
 */
export async function updateDriverVerification(
  driverId: string,
  isVerified: boolean,
  notes?: string
): Promise<ApiResponse<Driver>> {
  return apiFetch<Driver>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers/${driverId}/verification`, {
    method: 'PUT',
    body: JSON.stringify({
      isVerified,
      verificationNotes: notes,
    }),
  });
}

/**
 * Update driver availability
 */
export async function updateDriverAvailability(
  driverId: string,
  isAvailable: boolean
): Promise<ApiResponse<Driver>> {
  return apiFetch<Driver>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers/${driverId}/availability`, {
    method: 'PUT',
    body: JSON.stringify({ isAvailable }),
  });
}

/**
 * Update document verification status
 */
export async function updateDocumentVerificationStatus(
  driverId: string,
  documentType: string,
  status: 'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED'
): Promise<ApiResponse<Driver>> {
  return apiFetch<Driver>(`${ADMIN_SERVICE_URL}/api/v1/admin/drivers/${driverId}/documents/${documentType}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

/**
 * ==================== RIDER APIs ====================
 */

/**
 * Get all riders through admin service
 */
export async function getAllRiders(): Promise<ApiResponse<Rider[]>> {
  return apiFetch<Rider[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/riders`);
}

/**
 * Get rider by ID
 */
export async function getRiderById(riderId: string): Promise<ApiResponse<Rider>> {
  return apiFetch<Rider>(`${ADMIN_SERVICE_URL}/api/v1/admin/riders/${riderId}`);
}

/**
 * ==================== USER APIs ====================
 */

/**
 * Get all users through admin service
 */
export async function getAllUsers(): Promise<ApiResponse<User[]>> {
  return apiFetch<User[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/users`);
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  return apiFetch<User>(`${ADMIN_SERVICE_URL}/api/v1/admin/users/${userId}`);
}

/**
 * ==================== VEHICLE APIs ====================
 */

/**
 * Get all vehicles through admin service
 */
export async function getAllVehicles(): Promise<ApiResponse<Vehicle[]>> {
  return apiFetch<Vehicle[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/vehicles`);
}

/**
 * Get vehicle by ID
 */
export async function getVehicleById(vehicleId: string): Promise<ApiResponse<Vehicle>> {
  return apiFetch<Vehicle>(`${ADMIN_SERVICE_URL}/api/v1/admin/vehicles/${vehicleId}`);
}

/**
 * Update vehicle document verification status
 */
export async function updateVehicleDocumentVerificationStatus(
  vehicleId: string,
  documentType: string,
  status: 'APPROVED' | 'REJECTED' | 'RESUBMISSION_REQUIRED'
): Promise<ApiResponse<Vehicle>> {
  return apiFetch<Vehicle>(`${ADMIN_SERVICE_URL}/api/v1/admin/vehicles/${vehicleId}/documents/${documentType}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

/**
 * ==================== RIDE APIs ====================
 */

// Matches actual backend API response (not using RideResponseDto mapper)
export interface Ride {
  rideId: string | null;
  readableId?: string | null; // T00001, T00002 - Trip ID for display
  riderId: string | null;
  riderReadableId?: string | null; // R00001 - Rider ID for display
  driverId: string | null;
  driverReadableId?: string | null; // D00001 - Driver ID for display
  status: string;
  rideType: string;
  pickupLatitude: number | null;
  pickupLongitude: number | null;
  pickupAddress: string | null;
  pickupLandmark: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  destinationLandmark: string | null;
  estimatedDistanceKm: number | null;
  actualDistanceKm: number | null;
  estimatedDurationMinutes: number | null;
  actualDurationMinutes: number | null;
  estimatedFare: number | null;
  finalFare: number | null;
  baseFare: number | null;
  distanceFare: number | null;
  timeFare: number | null;
  surgeMultiplier: number | null;
  paymentMethod: string | null;
  paymentStatus: string | null;
  paymentTransactionId: string | null;
  requestedAt: string | null;
  scheduledPickupTime: string | null;
  acceptedAt: string | null;
  pickupAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  riderNotes: string | null;
  driverNotes: string | null;
  cancellationReason: string | null;
  cancelledBy: string | null;
  riderRating: number | null;
  driverRating: number | null;
  riderFeedback: string | null;
  driverFeedback: string | null;
  isWomenOnly: boolean | null;
  isShared: boolean | null;
  maxPassengers: number | null;
  specialInstructions: string | null;
  rideOtp: string | null;
  otpVerified: boolean | null;
  startTripOtp: string | null;
  tripStarted: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  riderName: string | null;
  riderEmail: string | null;
  riderPhone: string | null;
  driverName: string | null;
  driverEmail: string | null;
  driverPhone: string | null;
  vehicleRegistration: string | null;
  vehicleModel: string | null;
  durationMinutes: number | null;
}

export interface RideStatistics {
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  activeRides: number;
  totalRevenue: number;
  averageRideDistance: number;
  averageRideDuration: number;
  averageRating: number;
}

/**
 * Get all rides through admin service
 */
export async function getAllRides(): Promise<ApiResponse<Ride[]>> {
  return apiFetch<Ride[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides`);
}

/**
 * Get ride by ID
 */
export async function getRideById(rideId: string): Promise<ApiResponse<Ride>> {
  return apiFetch<Ride>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/${rideId}`);
}

/**
 * Get rides by status
 */
export async function getRidesByStatus(status: string): Promise<ApiResponse<Ride[]>> {
  return apiFetch<Ride[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/status/${status}`);
}

/**
 * Get active rides (IN_PROGRESS, ACCEPTED, DRIVER_ARRIVED, PENDING)
 */
export async function getActiveRides(): Promise<ApiResponse<Ride[]>> {
  return apiFetch<Ride[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/active`);
}

/**
 * Get completed rides
 */
export async function getCompletedRides(): Promise<ApiResponse<Ride[]>> {
  return apiFetch<Ride[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/completed`);
}

/**
 * Get cancelled rides
 */
export async function getCancelledRides(): Promise<ApiResponse<Ride[]>> {
  return apiFetch<Ride[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/cancelled`);
}

/**
 * Get rides by driver ID
 */
export async function getRidesByDriver(driverId: string): Promise<ApiResponse<Ride[]>> {
  return apiFetch<Ride[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/driver/${driverId}`);
}

/**
 * Get rides by rider ID
 */
export async function getRidesByRider(riderId: string): Promise<ApiResponse<Ride[]>> {
  return apiFetch<Ride[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/rider/${riderId}`);
}

/**
 * Get ride statistics
 */
export async function getRideStatistics(): Promise<ApiResponse<RideStatistics>> {
  return apiFetch<RideStatistics>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/statistics`);
}

/**
 * Cancel a ride
 */
export async function cancelRide(
  rideId: string,
  reason?: string
): Promise<ApiResponse<Ride>> {
  return apiFetch<Ride>(`${ADMIN_SERVICE_URL}/api/v1/admin/rides/${rideId}/cancel`, {
    method: 'PUT',
    body: JSON.stringify({ cancellationReason: reason }),
  });
}

/**
 * ==================== PAYMENT APIs ====================
 */

export interface Payment {
  paymentId: string;
  readableId?: string; // P00001, P00002 - Payment ID for display
  rideId: string;
  rideReadableId?: string; // T00001 - Trip ID for display
  riderId: string;
  riderReadableId?: string; // R00001 - Rider ID for display
  driverId: string;
  driverReadableId?: string; // D00001 - Driver ID for display
  amount: number;
  paymentMethod: 'CASH' | 'CARD' | 'DIGITAL_WALLET';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionId?: string;
  gatewayResponse?: Record<string, unknown>;
  initiatedAt?: string;
  completedAt?: string;
  failedAt?: string;
  platformFee?: number;
  driverEarnings?: number;
  createdAt: string;
}

/**
 * Get all payments (all statuses) - through AdminService
 */
export async function getAllPayments(): Promise<ApiResponse<Payment[]>> {
  return apiFetch<Payment[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/payments`);
}

/**
 * Get payment by ride ID - through AdminService
 */
export async function getPaymentByRideId(rideId: string): Promise<ApiResponse<Payment>> {
  return apiFetch<Payment>(`${ADMIN_SERVICE_URL}/api/v1/admin/payments/ride/${rideId}`);
}

/**
 * Get payments by status - through AdminService
 */
export async function getPaymentsByStatus(status: string): Promise<ApiResponse<Payment[]>> {
  return apiFetch<Payment[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/payments/status/${status}`);
}

/**
 * Get payments by payment method (CASH, CARD, DIGITAL_WALLET) - through AdminService
 */
export async function getPaymentsByMethod(method: 'CASH' | 'CARD' | 'DIGITAL_WALLET'): Promise<ApiResponse<Payment[]>> {
  return apiFetch<Payment[]>(`${ADMIN_SERVICE_URL}/api/v1/admin/payments/method/${method}`);
}

/**
 * ==================== STATISTICS APIs ====================
 */

export interface DashboardStats {
  totalDrivers: number;
  activeDrivers: number;
  totalRiders: number;
  activeRiders: number;
  totalRevenue: number;
  todayRevenue: number;
  totalTrips: number;
  todayTrips: number;
}

/**
 * Get dashboard statistics (you can implement this endpoint in backend)
 */
export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  // For now, return mock data until backend endpoint is created
  return {
    data: {
      totalDrivers: 0,
      activeDrivers: 0,
      totalRiders: 0,
      activeRiders: 0,
      totalRevenue: 0,
      todayRevenue: 0,
      totalTrips: 0,
      todayTrips: 0,
    },
  };
}

/**
 * ==================== HELPER FUNCTIONS ====================
 */

/**
 * Helper function to build full document URL from filename
 */
function buildDocumentUrl(filename: string | null | undefined): string | undefined {
  if (!filename) return undefined;
  // If already a full URL, return as is
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  // Otherwise, prepend the base URL with context path and URL encode the filename
  const encodedFilename = encodeURIComponent(filename);
  return `http://localhost:8081/user-service/uploads/${encodedFilename}`;
}

/**
 * Map backend driver to frontend format
 */
export function mapDriverToFrontend(driver: Driver) {
  return {
    id: driver.driverId || '',
    name: `${driver.firstName} ${driver.lastName}`,
    firstName: driver.firstName,
    lastName: driver.lastName,
    city: 'N/A', // You can extract from address if available
    email: driver.email,
    phoneNumber: driver.phoneNumber,
    gender: 'N/A', // Add to backend if needed
    vehicleType: driver.vehicleType || 'N/A',
    workExperience: 'N/A', // Add to backend if needed
    status: getDriverStatus(driver),
    createdTime: new Date(driver.createdAt).toLocaleString(),
    avatar: getVehicleEmoji(driver.vehicleType),
    rating: driver.rating,
    totalRides: driver.totalRidesCompleted,
    totalEarnings: driver.totalEarnings,
    isVerified: driver.isVerified,
    isAvailable: driver.isAvailable,
    verificationProgress: driver.verificationProgress,
    licenseNumber: driver.licenseNumber,
    licenseExpiry: driver.licenseExpiry,
    vehicleRegistration: driver.vehicleRegistration,
    // Document URLs - build full URLs from filenames
    selfieUrl: buildDocumentUrl(driver.selfieUrl),
    drivingLicenseUrl: buildDocumentUrl(driver.drivingLicenseUrl),
    revenueLicenseUrl: buildDocumentUrl(driver.revenueLicenseUrl),
    vehicleRegistrationUrl: buildDocumentUrl(driver.vehicleRegistrationUrl),
    vehicleInsuranceUrl: buildDocumentUrl(driver.vehicleInsuranceUrl),
  };
}

/**
 * Determine driver status based on backend data
 */
function getDriverStatus(driver: Driver): string {
  if (driver.isAvailable && driver.isVerified) {
    return 'Online';
  }
  if (driver.isVerified && !driver.isAvailable) {
    return 'Offline';
  }
  if (!driver.isVerified && driver.isDocumentsUploaded) {
    return 'Pending';
  }
  if (!driver.isDocumentsUploaded) {
    return 'Pending Documents';
  }
  if (!driver.isActive) {
    return 'Deactivated';
  }
  return 'Active';
}

/**
 * Get emoji based on vehicle type
 */
function getVehicleEmoji(vehicleType?: string): string {
  switch (vehicleType?.toUpperCase()) {
    case 'TUK':
      return '🛺';
    case 'RIDE':
    case 'PRIME_RIDE':
      return '🚗';
    case 'SQUAD':
      return '🚐';
    case 'RUSH':
      return '🏍️';
    default:
      return '🚗';
  }
}

/**
 * Map backend rider to frontend format
 */
export function mapRiderToFrontend(rider: Rider) {
  return {
    id: rider.riderId,
    name: `${rider.firstName} ${rider.lastName}`,
    firstName: rider.firstName,
    lastName: rider.lastName,
    email: rider.email,
    phoneNumber: rider.phoneNumber,
    gender: rider.gender,
    rating: rider.rating,
    totalRides: rider.totalRides,
    womenOnlyAccess: rider.womenOnlyAccess,
    genderVerified: rider.genderVerified,
    preferredPaymentMethod: rider.preferredPaymentMethod,
    isActive: rider.isActive,
    createdTime: new Date(rider.createdAt).toLocaleString(),
    avatar: rider.gender === 'FEMALE' ? '👩' : rider.gender === 'MALE' ? '👨' : '👤',
  };
}

// Admin Registration Types
export interface AdminRegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  adminRole: 'ADMIN' | 'USER_HANDLER' | 'FINANCE_HANDLER' | 'MARKETING_HANDLER' | 'TRIP_SUPPORT';
}

export interface AdminRegistrationResponse {
  adminId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  adminRole: string;
  status: string;
  message: string;
  createdAt: string;
  emailVerified?: boolean;
  lastLoginAt?: string;
}

export interface AdminListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  adminRole: string;
  status: 'Active' | 'Pending Approval' | 'Inactive' | 'Suspended' | 'PENDING_ACTIVATION' | 'ACTIVATED' | 'DEACTIVATED';
  joinedDate: string;
  lastLogin: string;
  avatar: string;
  emailVerified: boolean;
}

/**
 * Register a new admin user
 */
export async function registerAdmin(adminData: AdminRegistrationRequest): Promise<AdminRegistrationResponse> {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/api/v1/auth/admin/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register admin');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw error;
  }
}

/**
 * Get all admins from the database
 */
export async function getAllAdmins(): Promise<ApiResponse<AdminRegistrationResponse[]>> {
  return apiFetch<AdminRegistrationResponse[]>(`${USER_SERVICE_URL}/api/v1/auth/admin/users`);
}

/**
 * Map backend admin to frontend format
 */
export function mapAdminToFrontend(admin: AdminRegistrationResponse): AdminListItem {
  const roleMapping: Record<string, string> = {
    'ADMIN': 'Admin',
    'ADMIN_ADMIN': 'Admin',
    'USER_HANDLER': 'User Handler',
    'FINANCE_HANDLER': 'Finance Handler',
    'MARKETING_HANDLER': 'Marketing Handler',
    'TRIP_SUPPORT': 'Trip Support'
  };

  const statusMapping: Record<string, 'Active' | 'Pending Approval' | 'Inactive' | 'Suspended'> = {
    'ACTIVATED': 'Active',
    'PENDING_ACTIVATION': 'Pending Approval',
    'DEACTIVATED': 'Inactive',
    'SUSPENDED': 'Suspended'
  };

  const roleEmojiMapping: Record<string, string> = {
    'Admin': '👨‍💼',
    'User Handler': '👨‍💻',
    'Finance Handler': '👩‍💼',
    'Marketing Handler': '🎯',
    'Trip Support': '🎧'
  };

  const displayRole = roleMapping[admin.adminRole] || admin.adminRole;

  return {
    id: admin.adminId,
    name: `${admin.firstName} ${admin.lastName}`,
    email: admin.email,
    phone: admin.phoneNumber,
    adminRole: displayRole,
    status: statusMapping[admin.status] || 'Inactive',
    joinedDate: new Date(admin.createdAt).toISOString().split('T')[0],
    lastLogin: admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString() : 'Never',
    avatar: roleEmojiMapping[displayRole] || '👤',
    emailVerified: admin.emailVerified || false
  };
}
