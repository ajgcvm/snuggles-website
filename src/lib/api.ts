import { API_URL } from './constants';
import type { User, Pet, Booking, AdminStats, AdminClient, AdminPet } from '@/types';

// Client-side auth token management
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('snuggles_auth');
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('snuggles_auth', token);
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('snuggles_auth');
  localStorage.removeItem('snuggles_user');
}

export function getCachedUser(): User | null {
  if (typeof window === 'undefined') return null;
  const cached = localStorage.getItem('snuggles_user');
  if (!cached) return null;
  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

export function setCachedUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('snuggles_user', JSON.stringify(user));
}

// API calls
export async function fetchUser(): Promise<{ client: User; pets: Pet[] }> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuth();
      throw new Error('Session expired');
    }
    throw new Error('Failed to fetch user');
  }

  return response.json();
}

export async function fetchUserBookings(): Promise<{ bookings: Booking[] }> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/api/me/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
}

export async function addPet(petData: Partial<Pet>): Promise<{ pet: Pet }> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/api/me/pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add pet');
  }

  return response.json();
}

export async function updatePet(petId: string, petData: Partial<Pet>): Promise<{ pet: Pet }> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/api/me/pets/${petId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update pet');
  }

  return response.json();
}

export async function getGoogleAuthUrl(): Promise<string> {
  const callbackUrl = `${window.location.origin}/auth/callback`;
  const response = await fetch(`${API_URL}/api/auth/google?redirect_uri=${encodeURIComponent(callbackUrl)}`);
  const data = await response.json();
  if (!data.url) throw new Error('Failed to get auth URL');
  return data.url;
}

export async function exchangeCodeForToken(code: string): Promise<{ token: string; client: User; user?: User }> {
  const response = await fetch(`${API_URL}/api/auth/google/callback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Authentication failed');
  }

  if (!data.token) {
    throw new Error('No token received from API');
  }

  return data;
}

export async function getEstimate(data: {
  service: string;
  pets: Array<{ type: string; isPuppy: boolean; needsMedication: boolean }>;
  checkIn: string;
  checkOut: string;
}): Promise<{ total: number }> {
  const response = await fetch(`${API_URL}/api/estimate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to get estimate');
  return response.json();
}

export async function submitBooking(data: {
  service: string;
  checkIn: string;
  checkOut: string;
  client: { name: string; email: string; phone: string };
  pets: Array<Record<string, unknown>>;
  source: string;
  clientId?: string;
  registeredPetIds?: string[];
}): Promise<{ status: string; bookingId: string; message: string }> {
  const token = getAuthToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  return response.json();
}

// Admin API calls
export async function adminFetchStats(authHeader: string): Promise<AdminStats> {
  const response = await fetch(`${API_URL}/api/admin/stats`, {
    headers: { Authorization: authHeader },
  });

  if (!response.ok) throw new Error('Unauthorized');
  return response.json();
}

export async function adminFetchBookings(
  authHeader: string,
  status?: string
): Promise<{ bookings: Booking[] }> {
  const url = status
    ? `${API_URL}/api/admin/bookings?status=${status}`
    : `${API_URL}/api/admin/bookings`;

  const response = await fetch(url, {
    headers: { Authorization: authHeader },
  });

  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
}

export async function adminUpdateBooking(
  authHeader: string,
  bookingId: string,
  data: Partial<Booking>
): Promise<void> {
  const response = await fetch(`${API_URL}/api/admin/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to update booking');
}

// Admin - Clients
export async function adminFetchClients(
  authHeader: string,
  options?: { status?: string; search?: string }
): Promise<{ clients: AdminClient[] }> {
  const params = new URLSearchParams();
  if (options?.status) params.append('status', options.status);
  if (options?.search) params.append('search', options.search);

  const url = params.toString()
    ? `${API_URL}/api/admin/clients?${params.toString()}`
    : `${API_URL}/api/admin/clients`;

  const response = await fetch(url, {
    headers: { Authorization: authHeader },
  });

  if (!response.ok) throw new Error('Failed to fetch clients');
  return response.json();
}

export async function adminUpdateClient(
  authHeader: string,
  clientId: string,
  data: { status?: 'new' | 'approved' | 'blocked'; internal_notes?: string }
): Promise<{ client: AdminClient }> {
  const response = await fetch(`${API_URL}/api/admin/clients/${clientId}`, {
    method: 'PUT',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to update client');
  return response.json();
}

// Admin - Pets
export async function adminFetchPets(
  authHeader: string,
  options?: { status?: string; clientId?: string; search?: string }
): Promise<{ pets: AdminPet[] }> {
  const params = new URLSearchParams();
  if (options?.status) params.append('status', options.status);
  if (options?.clientId) params.append('client_id', options.clientId);
  if (options?.search) params.append('search', options.search);

  const url = params.toString()
    ? `${API_URL}/api/admin/pets?${params.toString()}`
    : `${API_URL}/api/admin/pets`;

  const response = await fetch(url, {
    headers: { Authorization: authHeader },
  });

  if (!response.ok) throw new Error('Failed to fetch pets');
  return response.json();
}

export async function adminUpdatePet(
  authHeader: string,
  petId: string,
  data: { status?: 'pending' | 'approved' | 'blocked'; suggested_size?: string; internal_notes?: string }
): Promise<{ pet: AdminPet }> {
  const response = await fetch(`${API_URL}/api/admin/pets/${petId}`, {
    method: 'PUT',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to update pet');
  return response.json();
}
