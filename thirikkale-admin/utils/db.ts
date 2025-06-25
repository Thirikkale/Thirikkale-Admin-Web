import axios from 'axios';

/**
 * Fetches authentication details from the auth server.
 * @param authServerUrl The URL of the authentication server.
 * @param credentials The user credentials (e.g., username and password).
 * @returns The authentication details, such as tokens or user info.
 */
export async function getAuthDetails(authServerUrl: string, credentials: { email: string; password: string }): Promise<any> {
    try {
        const response = await axios.post(`${authServerUrl}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error fetching authentication details:', error);
        throw new Error('Failed to fetch authentication details');
    }
}