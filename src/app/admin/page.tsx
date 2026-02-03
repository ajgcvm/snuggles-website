'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  adminFetchStats,
  adminFetchBookings,
  adminUpdateBooking,
  adminFetchClients,
  adminUpdateClient,
  adminFetchPets,
  adminUpdatePet,
  adminFetchStripeProducts,
  adminSendPaymentRequest,
  getAuthToken,
  getCachedUser,
  clearAuth,
} from '@/lib/api';
import type { StripeProduct, PaymentLineItem } from '@/lib/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import type { Booking, AdminStats, AdminClient, AdminPet, User } from '@/types';

type Section = 'dashboard' | 'bookings' | 'clients' | 'pets';

export default function AdminPage() {
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialBookingFilter, setInitialBookingFilter] = useState<string>('');
  const [initialPetFilter, setInitialPetFilter] = useState<string>('');
  const [initialClientFilter, setInitialClientFilter] = useState<string>('');

  const navigateToBookings = (filter: string) => {
    setInitialBookingFilter(filter);
    setActiveSection('bookings');
  };

  const navigateToPets = (filter: string) => {
    setInitialPetFilter(filter);
    setActiveSection('pets');
  };

  const navigateToClients = (filter: string) => {
    setInitialClientFilter(filter);
    setActiveSection('clients');
  };

  // Check for JWT auth (logged in user with admin role)
  useEffect(() => {
    const token = getAuthToken();
    const user = getCachedUser();

    if (token && user) {
      const hasAdminAccess = user.role === 'owner' || user.role === 'employee' || user.isPlatformAdmin;
      if (hasAdminAccess) {
        setAuthHeader(`Bearer ${token}`);
        setCurrentUser(user);
      }
    }

    setIsCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setAuthHeader(null);
    setCurrentUser(null);
    window.location.href = '/';
  };

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Login required - redirect to Google sign-in
  if (!authHeader) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
          <div className="text-center mb-6">
            <Image
              src="/images/logo-expanded.svg"
              alt="Snuggles"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h1 className="text-xl font-bold text-stone-800">Admin Access</h1>
            <p className="text-stone-500 text-sm mt-2">Sign in with your Google account to access the admin panel</p>
          </div>

          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-3 bg-white border border-stone-300 text-stone-700 px-4 py-3 rounded-lg hover:bg-stone-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Sign in with Google</span>
          </Link>

          <p className="text-xs text-stone-500 text-center mt-4">
            Only owner and employee accounts can access this area
          </p>

          <div className="mt-6 pt-4 border-t border-stone-200 text-center">
            <Link href="/" className="text-sm text-stone-600 hover:text-primary-600">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'pets',
      label: 'Pets',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L12 12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-stone-200 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-200">
            <Image src="/images/logo-expanded.svg" alt="Snuggles" width={40} height={40} />
            <div>
              <p className="font-bold text-stone-800">Snuggles</p>
              <p className="text-xs text-stone-500">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-stone-200">
            {/* User Info (when logged in with JWT) */}
            {currentUser && (
              <div className="px-4 py-3 mb-2 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {currentUser.avatar || currentUser.avatar_url ? (
                    <Image
                      src={currentUser.avatar || currentUser.avatar_url || ''}
                      alt={currentUser.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-700 font-medium text-sm">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800 truncate">{currentUser.name}</p>
                    <p className="text-xs text-stone-500 truncate">
                      {currentUser.role === 'owner' ? 'Owner' : currentUser.role === 'employee' ? 'Employee' : 'Admin'}
                      {currentUser.isPlatformAdmin && ' • Platform Admin'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-stone-600 hover:text-stone-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-stone-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-medium text-stone-800">
            {navItems.find((n) => n.id === activeSection)?.label}
          </span>
          <div className="w-10" />
        </header>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {activeSection === 'dashboard' && (
            <DashboardSection
              authHeader={authHeader}
              onNavigateToBookings={navigateToBookings}
              onNavigateToPets={navigateToPets}
              onNavigateToClients={navigateToClients}
            />
          )}
          {activeSection === 'bookings' && (
            <BookingsSection
              authHeader={authHeader}
              initialFilter={initialBookingFilter}
              onFilterApplied={() => setInitialBookingFilter('')}
            />
          )}
          {activeSection === 'clients' && (
            <ClientsSection
              authHeader={authHeader}
              initialFilter={initialClientFilter}
              onFilterApplied={() => setInitialClientFilter('')}
            />
          )}
          {activeSection === 'pets' && (
            <PetsSection
              authHeader={authHeader}
              initialFilter={initialPetFilter}
              onFilterApplied={() => setInitialPetFilter('')}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ===================
// DASHBOARD SECTION
// ===================

interface DashboardStats extends AdminStats {
  pendingPets?: number;
  newClients?: number;
  pendingMeetGreet?: number;
}

function DashboardSection({
  authHeader,
  onNavigateToBookings,
  onNavigateToPets,
  onNavigateToClients,
}: {
  authHeader: string;
  onNavigateToBookings: (filter: string) => void;
  onNavigateToPets: (filter: string) => void;
  onNavigateToClients: (filter: string) => void;
}) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [authHeader]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadStats = async () => {
    try {
      const [bookingStats, petsData, clientsData, meetGreetBookings] = await Promise.all([
        adminFetchStats(authHeader),
        adminFetchPets(authHeader, { status: 'pending' }),
        adminFetchClients(authHeader, { status: 'new' }),
        adminFetchBookings(authHeader, 'pending_meetgreet'),
      ]);
      setStats({
        ...bookingStats,
        pendingPets: petsData.pets.length,
        newClients: clientsData.clients.length,
        pendingMeetGreet: meetGreetBookings.bookings.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse text-stone-500">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Dashboard</h1>

      {/* Bookings Stats */}
      <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-3">Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => onNavigateToBookings('pending')}
          className="bg-white rounded-xl p-6 border border-stone-200 text-left hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <p className="text-sm text-stone-500 mb-1">Pending Review</p>
          <p className="text-3xl font-bold text-amber-600 group-hover:text-amber-700">
            {stats?.pending ?? 0}
          </p>
          <p className="text-xs text-stone-400 mt-2 group-hover:text-amber-600">Click to view →</p>
        </button>
        <button
          onClick={() => onNavigateToBookings('confirmed')}
          className="bg-white rounded-xl p-6 border border-stone-200 text-left hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <p className="text-sm text-stone-500 mb-1">Confirmed</p>
          <p className="text-3xl font-bold text-primary-600 group-hover:text-primary-700">
            {stats?.confirmed ?? 0}
          </p>
          <p className="text-xs text-stone-400 mt-2 group-hover:text-primary-600">Click to view →</p>
        </button>
        <button
          onClick={() => onNavigateToBookings('completed')}
          className="bg-white rounded-xl p-6 border border-stone-200 text-left hover:border-stone-300 hover:shadow-md transition-all group"
        >
          <p className="text-sm text-stone-500 mb-1">Completed</p>
          <p className="text-3xl font-bold text-stone-600 group-hover:text-stone-700">
            {stats?.completed ?? 0}
          </p>
          <p className="text-xs text-stone-400 mt-2 group-hover:text-stone-600">Click to view →</p>
        </button>
        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <p className="text-sm text-stone-500 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">
            ${(stats?.totalRevenue ?? 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pending Actions */}
      <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-3">Pending Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateToPets('pending')}
          className="bg-white rounded-xl p-6 border border-stone-200 text-left hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500 mb-1">Pets Awaiting Approval</p>
              <p className="text-3xl font-bold text-amber-600 group-hover:text-amber-700">
                {stats?.pendingPets ?? 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl">
              🐾
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-2 group-hover:text-amber-600">Click to review →</p>
        </button>
        <button
          onClick={() => onNavigateToClients('new')}
          className="bg-white rounded-xl p-6 border border-stone-200 text-left hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500 mb-1">New Clients</p>
              <p className="text-3xl font-bold text-blue-600 group-hover:text-blue-700">
                {stats?.newClients ?? 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              👤
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-2 group-hover:text-blue-600">Click to review →</p>
        </button>
        <button
          onClick={() => onNavigateToBookings('pending_meetgreet')}
          className="bg-white rounded-xl p-6 border border-stone-200 text-left hover:border-purple-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500 mb-1">Needs Meet & Greet</p>
              <p className="text-3xl font-bold text-purple-600 group-hover:text-purple-700">
                {stats?.pendingMeetGreet ?? 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              🤝
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-2 group-hover:text-purple-600">Click to schedule →</p>
        </button>
      </div>
    </div>
  );
}

// ===================
// BOOKINGS SECTION
// ===================

function BookingsSection({
  authHeader,
  initialFilter,
  onFilterApplied,
}: {
  authHeader: string;
  initialFilter?: string;
  onFilterApplied?: () => void;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState(initialFilter || '');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  // Apply initial filter when it changes from parent
  useEffect(() => {
    if (initialFilter) {
      setStatusFilter(initialFilter);
      onFilterApplied?.();
    }
  }, [initialFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadBookings();
  }, [authHeader, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await adminFetchBookings(authHeader, statusFilter || undefined);
      setBookings(data.bookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await adminUpdateBooking(authHeader, bookingId, { status } as Partial<Booking>);
      loadBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Bookings</h1>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="pending_meetgreet">Needs Meet & Greet</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button variant="secondary" size="sm" onClick={loadBookings}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-stone-500">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-stone-500">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Pets</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Dates</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {bookings.map((booking) => {
                  const pets = booking.pets || [];
                  const petsStr = pets.map((p) => p.name).join(', ') || '-';

                  return (
                    <tr key={booking.id} className="hover:bg-stone-50">
                      <td className="px-4 py-3 text-sm font-mono">{booking.id}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-stone-800">{booking.client_name}</div>
                        <div className="text-xs text-stone-500">{booking.client_email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-stone-600">{petsStr}</td>
                      <td className="px-4 py-3 text-sm text-stone-600">
                        {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        ${booking.final_price || booking.estimated_price}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title="Booking Details"
        maxWidth="2xl"
      >
        {selectedBooking && (
          <BookingDetail
            booking={selectedBooking}
            onUpdateStatus={handleUpdateStatus}
            onClose={() => setSelectedBooking(null)}
            authHeader={authHeader}
            onRefresh={loadBookings}
          />
        )}
      </Modal>
    </div>
  );
}

// ===================
// CLIENTS SECTION
// ===================

function ClientsSection({
  authHeader,
  initialFilter,
  onFilterApplied,
}: {
  authHeader: string;
  initialFilter?: string;
  onFilterApplied?: () => void;
}) {
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [statusFilter, setStatusFilter] = useState(initialFilter || '');
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);
  const [loading, setLoading] = useState(true);

  // Apply initial filter when it changes from parent
  useEffect(() => {
    if (initialFilter) {
      setStatusFilter(initialFilter);
      onFilterApplied?.();
    }
  }, [initialFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadClients();
  }, [authHeader, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await adminFetchClients(authHeader, {
        status: statusFilter || undefined,
        search: search || undefined,
      });
      setClients(data.clients);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadClients();
  };

  const handleUpdateStatus = async (clientId: string, status: 'new' | 'approved' | 'blocked') => {
    try {
      await adminUpdateClient(authHeader, clientId, { status });
      loadClients();
      setSelectedClient(null);
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'blocked':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Clients</h1>
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 border border-stone-300 rounded-lg text-sm w-40"
            />
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
          </form>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-stone-500">Loading...</div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center text-stone-500">No clients found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Pets</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Bookings</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {client.avatar_url ? (
                          <img
                            src={client.avatar_url}
                            alt={client.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 text-sm font-medium">
                            {client.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <span className="font-medium text-stone-800">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600">{client.email}</td>
                    <td className="px-4 py-3 text-sm text-stone-600">{client.pet_count || 0}</td>
                    <td className="px-4 py-3 text-sm text-stone-600">{client.booking_count || 0}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Client Detail Modal */}
      <Modal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title="Client Details"
        maxWidth="2xl"
      >
        {selectedClient && (
          <ClientDetail
            client={selectedClient}
            onUpdateStatus={handleUpdateStatus}
            onClose={() => setSelectedClient(null)}
            authHeader={authHeader}
          />
        )}
      </Modal>
    </div>
  );
}

function ClientDetail({
  client,
  onUpdateStatus,
  onClose,
  authHeader,
}: {
  client: AdminClient;
  onUpdateStatus: (clientId: string, status: 'new' | 'approved' | 'blocked') => Promise<void>;
  onClose: () => void;
  authHeader: string;
}) {
  const [updating, setUpdating] = useState(false);
  const [pets, setPets] = useState<AdminPet[]>([]);
  const [petsLoading, setPetsLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<AdminPet | null>(null);

  useEffect(() => {
    loadClientPets();
  }, [client.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadClientPets = async () => {
    setPetsLoading(true);
    try {
      const data = await adminFetchPets(authHeader, { clientId: client.id });
      setPets(data.pets);
    } catch (error) {
      console.error('Error loading pets:', error);
    } finally {
      setPetsLoading(false);
    }
  };

  const handleAction = async (status: 'approved' | 'blocked') => {
    setUpdating(true);
    await onUpdateStatus(client.id, status);
    setUpdating(false);
  };

  const handlePetStatusUpdate = async (petId: string, status: 'pending' | 'approved' | 'blocked') => {
    try {
      await adminUpdatePet(authHeader, petId, { status });
      loadClientPets();
      setSelectedPet(null);
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'blocked':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {client.avatar_url ? (
            <img src={client.avatar_url} alt={client.name} className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 text-2xl font-medium">
              {client.name?.charAt(0) || '?'}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-stone-800">{client.name}</h2>
            <p className="text-stone-500">{client.email}</p>
          </div>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(client.status)}`}>
          {client.status}
        </span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Phone</p>
          <p className="text-stone-800">{client.phone || 'Not provided'}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Last Login</p>
          <p className="text-stone-800">
            {client.last_login
              ? new Date(client.last_login).toLocaleDateString()
              : 'Never'}
          </p>
        </div>
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Pets</p>
          <p className="text-stone-800">{client.pet_count || 0}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Bookings</p>
          <p className="text-stone-800">{client.booking_count || 0}</p>
        </div>
      </div>

      {/* Client Pets */}
      <div>
        <h3 className="font-medium text-stone-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L12 12" />
          </svg>
          Client&apos;s Pets
        </h3>
        {petsLoading ? (
          <div className="text-stone-500 text-sm">Loading pets...</div>
        ) : pets.length === 0 ? (
          <div className="bg-stone-50 rounded-lg p-4 text-stone-500 text-sm text-center">
            No pets registered
          </div>
        ) : (
          <div className="space-y-2">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-stone-50 rounded-lg p-4 flex items-center justify-between hover:bg-stone-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-lg">
                    {pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐈' : '🐾'}
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{pet.name}</p>
                    <p className="text-xs text-stone-500">
                      {pet.type}
                      {pet.breed && ` • ${pet.breed}`}
                      {pet.weight && ` • ${pet.weight} lbs`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(pet.status)}`}>
                    {pet.status}
                  </span>
                  <button
                    onClick={() => setSelectedPet(pet)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View
                  </button>
                  {pet.status === 'pending' && (
                    <button
                      onClick={() => handlePetStatusUpdate(pet.id, 'approved')}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-stone-200">
        {client.status !== 'approved' && (
          <Button onClick={() => handleAction('approved')} disabled={updating}>
            Approve Client
          </Button>
        )}
        {client.status !== 'blocked' && (
          <Button variant="danger" onClick={() => handleAction('blocked')} disabled={updating}>
            Block Client
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Metadata */}
      <div className="text-xs text-stone-400">
        <p>ID: {client.id}</p>
        <p>Created: {new Date(client.created_at).toLocaleString()}</p>
      </div>

      {/* Pet Detail Modal (nested) */}
      <Modal
        isOpen={!!selectedPet}
        onClose={() => setSelectedPet(null)}
        title="Pet Details"
        maxWidth="lg"
      >
        {selectedPet && (
          <PetDetail
            pet={selectedPet}
            onUpdateStatus={handlePetStatusUpdate}
            onClose={() => setSelectedPet(null)}
          />
        )}
      </Modal>
    </div>
  );
}

// ===================
// PETS SECTION
// ===================

function PetsSection({
  authHeader,
  initialFilter,
  onFilterApplied,
}: {
  authHeader: string;
  initialFilter?: string;
  onFilterApplied?: () => void;
}) {
  const [pets, setPets] = useState<AdminPet[]>([]);
  const [statusFilter, setStatusFilter] = useState(initialFilter || '');
  const [search, setSearch] = useState('');
  const [selectedPet, setSelectedPet] = useState<AdminPet | null>(null);
  const [loading, setLoading] = useState(true);

  // Apply initial filter when it changes from parent
  useEffect(() => {
    if (initialFilter) {
      setStatusFilter(initialFilter);
      onFilterApplied?.();
    }
  }, [initialFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadPets();
  }, [authHeader, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPets = async () => {
    setLoading(true);
    try {
      const data = await adminFetchPets(authHeader, {
        status: statusFilter || undefined,
        search: search || undefined,
      });
      setPets(data.pets);
    } catch (error) {
      console.error('Error loading pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadPets();
  };

  const handleUpdateStatus = async (petId: string, status: 'pending' | 'approved' | 'blocked') => {
    try {
      await adminUpdatePet(authHeader, petId, { status });
      loadPets();
      setSelectedPet(null);
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'blocked':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Pets</h1>
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 border border-stone-300 rounded-lg text-sm w-40"
            />
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
          </form>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-stone-500">Loading...</div>
        ) : pets.length === 0 ? (
          <div className="p-8 text-center text-stone-500">No pets found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Pet</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {pets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-stone-800">{pet.name}</div>
                      {pet.breed && <div className="text-xs text-stone-500">{pet.breed}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 capitalize">{pet.type}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-stone-800">{pet.client_name}</div>
                      <div className="text-xs text-stone-500">{pet.client_email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600">
                      {pet.suggested_size || '-'}
                      {pet.weight && <span className="text-xs text-stone-400 ml-1">({pet.weight} lbs)</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(pet.status)}`}>
                        {pet.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedPet(pet)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pet Detail Modal */}
      <Modal
        isOpen={!!selectedPet}
        onClose={() => setSelectedPet(null)}
        title="Pet Details"
        maxWidth="lg"
      >
        {selectedPet && (
          <PetDetail
            pet={selectedPet}
            onUpdateStatus={handleUpdateStatus}
            onClose={() => setSelectedPet(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function PetDetail({
  pet,
  onUpdateStatus,
  onClose,
}: {
  pet: AdminPet;
  onUpdateStatus: (petId: string, status: 'pending' | 'approved' | 'blocked') => Promise<void>;
  onClose: () => void;
}) {
  const [updating, setUpdating] = useState(false);

  const handleAction = async (status: 'approved' | 'blocked') => {
    setUpdating(true);
    await onUpdateStatus(pet.id, status);
    setUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'blocked':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-800">{pet.name}</h2>
          <p className="text-stone-500 capitalize">
            {pet.type}
            {pet.breed && ` - ${pet.breed}`}
          </p>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(pet.status)}`}>
          {pet.status}
        </span>
      </div>

      {/* Owner Info */}
      <div className="bg-stone-50 rounded-lg p-4">
        <p className="text-xs text-stone-500 mb-1">Owner</p>
        <p className="text-stone-800 font-medium">{pet.client_name}</p>
        <p className="text-stone-600 text-sm">{pet.client_email}</p>
      </div>

      {/* Pet Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Weight</p>
          <p className="text-stone-800">{pet.weight ? `${pet.weight} lbs` : 'Not provided'}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Age</p>
          <p className="text-stone-800">{pet.age_years ? `${pet.age_years} years` : 'Not provided'}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Suggested Size</p>
          <p className="text-stone-800 capitalize">{pet.suggested_size || 'Not set'}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-xs text-stone-500 mb-1">Gets Along With</p>
          <p className="text-stone-800">
            Dogs: {pet.gets_along_dogs || 'unknown'} | Cats: {pet.gets_along_cats || 'unknown'}
          </p>
        </div>
      </div>

      {pet.special_needs && (
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-xs text-amber-600 mb-1">Special Needs</p>
          <p className="text-amber-800">{pet.special_needs}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-stone-200">
        {pet.status !== 'approved' && (
          <Button onClick={() => handleAction('approved')} disabled={updating}>
            Approve Pet
          </Button>
        )}
        {pet.status !== 'blocked' && (
          <Button variant="danger" onClick={() => handleAction('blocked')} disabled={updating}>
            Block Pet
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Metadata */}
      <div className="text-xs text-stone-400">
        <p>ID: {pet.id}</p>
        <p>Created: {new Date(pet.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}

// ===================
// BOOKING DETAIL (moved from original)
// ===================

interface BookingDetailProps {
  booking: Booking;
  onUpdateStatus: (bookingId: string, status: string) => Promise<void>;
  onClose: () => void;
  authHeader: string;
  onRefresh: () => void;
}

function BookingDetail({ booking, onUpdateStatus, authHeader, onRefresh }: BookingDetailProps) {
  const pets = booking.pets || [];
  const [finalPrice, setFinalPrice] = useState(booking.final_price || booking.estimated_price);
  const [meetGreetDate, setMeetGreetDate] = useState(
    booking.meet_greet_scheduled ? booking.meet_greet_scheduled.slice(0, 16) : ''
  );
  const [meetGreetScheduled, setMeetGreetScheduled] = useState(booking.meet_greet_scheduled || '');
  const [meetGreetCompleted, setMeetGreetCompleted] = useState(booking.meet_greet_completed || false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Payment state
  const [stripeProducts, setStripeProducts] = useState<StripeProduct[]>([]);
  const [lineItems, setLineItems] = useState<Array<{ priceId: string; quantity: number; productName: string; unitAmount: number }>>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [sendingPayment, setSendingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const showSuccess = (message: string) => {
    setSaveSuccess(message);
    setTimeout(() => setSaveSuccess(null), 2000);
  };

  // Load Stripe products when payment section is shown
  const loadStripeProducts = async () => {
    if (stripeProducts.length > 0) return; // Already loaded
    setLoadingProducts(true);
    try {
      const data = await adminFetchStripeProducts(authHeader);
      // Filter out products without valid prices (supports both flat and array format)
      const validProducts = (data.products || []).filter(
        (p) => (p.price_id && p.unit_amount != null) || (p.prices && p.prices.length > 0 && p.prices[0]?.unit_amount != null)
      );
      setStripeProducts(validProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Helper to get price info from product (supports both flat and array format)
  const getProductPrice = (product: StripeProduct) => {
    if (product.price_id && product.unit_amount != null) {
      return { id: product.price_id, unit_amount: product.unit_amount };
    }
    if (product.prices && product.prices[0]) {
      return { id: product.prices[0].id, unit_amount: product.prices[0].unit_amount };
    }
    return null;
  };

  const addLineItem = (product: StripeProduct) => {
    const price = getProductPrice(product);
    if (!price) return;

    const existing = lineItems.find(item => item.priceId === price.id);
    if (existing) {
      setLineItems(lineItems.map(item =>
        item.priceId === price.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setLineItems([...lineItems, {
        priceId: price.id,
        quantity: 1,
        productName: product.name,
        unitAmount: price.unit_amount,
      }]);
    }
  };

  const updateLineItemQuantity = (priceId: string, quantity: number) => {
    if (quantity <= 0) {
      setLineItems(lineItems.filter(item => item.priceId !== priceId));
    } else {
      setLineItems(lineItems.map(item =>
        item.priceId === priceId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const removeLineItem = (priceId: string) => {
    setLineItems(lineItems.filter(item => item.priceId !== priceId));
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.unitAmount * item.quantity), 0);
  };

  const handleSendPaymentRequest = async () => {
    if (lineItems.length === 0) {
      setPaymentError('Please add at least one item');
      return;
    }

    setSendingPayment(true);
    setPaymentError(null);

    try {
      const items: PaymentLineItem[] = lineItems.map(item => ({
        price: item.priceId,
        quantity: item.quantity,
      }));

      await adminSendPaymentRequest(authHeader, booking.id, items);
      showSuccess('Payment request sent!');
      setLineItems([]);
      onRefresh();
    } catch (error) {
      console.error('Error sending payment:', error);
      setPaymentError(error instanceof Error ? error.message : 'Failed to send payment request');
    } finally {
      setSendingPayment(false);
    }
  };

  const handleSaveFinalPrice = async () => {
    setSaving(true);
    try {
      await fetch(`https://denboard-booking-api.felhen.workers.dev/api/admin/bookings/${booking.id}`, {
        method: 'PUT',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ final_price: finalPrice }),
      });
      showSuccess('Price saved!');
      onRefresh();
    } catch (error) {
      console.error('Error saving price:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveMeetGreetDate = async () => {
    if (!meetGreetDate) {
      alert('Please select a date and time');
      return;
    }
    setSaving(true);
    try {
      await fetch(`https://denboard-booking-api.felhen.workers.dev/api/admin/bookings/${booking.id}`, {
        method: 'PUT',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meet_greet_scheduled: meetGreetDate }),
      });
      setMeetGreetScheduled(meetGreetDate);
      showSuccess('Meet & Greet scheduled!');
      onRefresh();
    } catch (error) {
      console.error('Error saving date:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleMarkMeetGreetComplete = async () => {
    setSaving(true);
    try {
      await fetch(`https://denboard-booking-api.felhen.workers.dev/api/admin/bookings/${booking.id}`, {
        method: 'PUT',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meet_greet_completed: true }),
      });
      setMeetGreetCompleted(true);
      showSuccess('Meet & Greet completed!');
      onRefresh();
    } catch (error) {
      console.error('Error marking complete:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {saveSuccess}
        </div>
      )}

      {/* Meet & Greet Section - Show first if required */}
      {booking.requires_meet_greet && (
        <div className={`rounded-lg p-4 border ${meetGreetCompleted ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-medium ${meetGreetCompleted ? 'text-green-800' : 'text-amber-800'}`}>
              Meet & Greet {meetGreetCompleted ? '(Completed)' : 'Required'}
            </h3>
            {meetGreetCompleted && (
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Done</span>
            )}
          </div>

          {!meetGreetCompleted && (
            <div className="space-y-3">
              {/* Schedule M&G */}
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="text-xs text-amber-700 block mb-1">Schedule Date & Time</label>
                  <input
                    type="datetime-local"
                    value={meetGreetDate}
                    onChange={(e) => setMeetGreetDate(e.target.value)}
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  onClick={handleSaveMeetGreetDate}
                  disabled={saving || !meetGreetDate}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Schedule'}
                </button>
              </div>

              {/* Show scheduled date and mark complete button */}
              {meetGreetScheduled && (
                <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                  <div>
                    <p className="text-xs text-amber-600">Scheduled for:</p>
                    <p className="text-sm font-medium text-amber-800">
                      {new Date(meetGreetScheduled).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={handleMarkMeetGreetComplete}
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Mark as Completed'}
                  </button>
                </div>
              )}

              {!meetGreetScheduled && (
                <p className="text-xs text-amber-600 italic">
                  Select a date and click &quot;Schedule&quot; to book the Meet & Greet
                </p>
              )}
            </div>
          )}

          {meetGreetCompleted && meetGreetScheduled && (
            <p className="text-sm text-green-700">
              Completed on {new Date(meetGreetScheduled).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      )}

      {/* Status & Actions */}
      <div className="flex items-center justify-between bg-stone-100 rounded-lg p-4">
        <div>
          <p className="text-xs text-stone-500 mb-1">Booking Status</p>
          <StatusBadge status={booking.status} />
        </div>
        <div className="flex gap-2">
          {(booking.status === 'pending' || booking.status === 'pending_meetgreet') && (
            <>
              <Button
                size="sm"
                onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                disabled={booking.requires_meet_greet && !meetGreetCompleted}
              >
                Confirm Booking
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onUpdateStatus(booking.id, 'cancelled')}
              >
                Cancel
              </Button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onUpdateStatus(booking.id, 'completed')}
            >
              Mark Completed
            </Button>
          )}
        </div>
      </div>

      {/* Hint for M&G required bookings */}
      {booking.requires_meet_greet && !meetGreetCompleted && booking.status === 'pending_meetgreet' && (
        <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
          Complete the Meet & Greet before confirming this booking
        </p>
      )}

      {/* Service Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-stone-50 rounded-lg p-4">
          <h3 className="font-medium text-stone-800 mb-2">Service</h3>
          <p className="text-stone-600">
            {booking.service === 'boarding' ? 'Boarding' : 'Daycare'}
          </p>
          <p className="text-sm text-stone-500">
            {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
          </p>
        </div>
        <div className="bg-stone-50 rounded-lg p-4">
          <h3 className="font-medium text-stone-800 mb-2">Pricing</h3>
          <p className="text-stone-600">Estimated: ${booking.estimated_price}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-stone-500">Final:</span>
            <input
              type="number"
              value={finalPrice}
              onChange={(e) => setFinalPrice(parseFloat(e.target.value))}
              className="w-24 px-2 py-1 border border-stone-300 rounded text-sm"
            />
            <button
              onClick={handleSaveFinalPrice}
              disabled={saving}
              className="text-primary-600 hover:text-primary-700 text-sm disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {(booking.status === 'confirmed' || booking.status === 'pending' || booking.status === 'pending_meetgreet') && (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <button
            onClick={loadStripeProducts}
            className="w-full px-4 py-3 flex items-center justify-between bg-stone-50 hover:bg-stone-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="font-medium text-stone-800">Payment</span>
              {booking.payment_status && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                  booking.payment_status === 'payment_expired' ? 'bg-red-100 text-red-700' :
                  booking.payment_status === 'refunded' ? 'bg-stone-100 text-stone-600' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {booking.payment_status === 'paid' ? 'Paid' :
                   booking.payment_status === 'payment_expired' ? 'Expired' :
                   booking.payment_status === 'refunded' ? 'Refunded' :
                   booking.payment_status === 'partially_refunded' ? 'Partial Refund' :
                   'Awaiting Payment'}
                </span>
              )}
            </div>
            <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Payment Details - Show if products loaded */}
          {stripeProducts.length > 0 && (
            <div className="p-4 border-t border-stone-200">
              {/* Payment Status Info */}
              {booking.payment_status === 'paid' && booking.paid_at && (
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Paid:</span> ${((booking.payment_amount || 0) / 100).toFixed(2)} on{' '}
                    {new Date(booking.paid_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )}

              {booking.payment_status === 'payment_expired' && (
                <div className="bg-red-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-800">
                    Payment link expired. You can send a new payment request below.
                  </p>
                </div>
              )}

              {booking.payment_link && booking.payment_status === 'pending_payment' && (
                <div className="bg-amber-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-amber-800 mb-2">
                    <span className="font-medium">Payment link sent.</span> Waiting for client to pay.
                  </p>
                  <a
                    href={booking.payment_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-600 hover:underline break-all"
                  >
                    {booking.payment_link}
                  </a>
                </div>
              )}

              {/* Product Selector */}
              {(!booking.payment_status || booking.payment_status === 'pending_payment' && !booking.payment_link || booking.payment_status === 'payment_expired') && (
                <>
                  <h4 className="text-sm font-medium text-stone-700 mb-2">Add Items to Invoice</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {stripeProducts.map((product) => {
                      const price = getProductPrice(product);
                      return (
                        <button
                          key={product.id}
                          onClick={() => addLineItem(product)}
                          className="text-left p-2 rounded-lg border border-stone-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                        >
                          <span className="block font-medium text-stone-800 truncate">{product.name}</span>
                          <span className="text-stone-500">
                            ${((price?.unit_amount || 0) / 100).toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Line Items */}
                  {lineItems.length > 0 && (
                    <div className="bg-stone-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-stone-700 mb-2">Invoice Items</h4>
                      <div className="space-y-2">
                        {lineItems.map((item) => (
                          <div key={item.priceId} className="flex items-center justify-between">
                            <span className="text-sm text-stone-700">{item.productName}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateLineItemQuantity(item.priceId, item.quantity - 1)}
                                className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateLineItemQuantity(item.priceId, item.quantity + 1)}
                                className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600"
                              >
                                +
                              </button>
                              <span className="w-16 text-right text-sm font-medium">
                                ${((item.unitAmount * item.quantity) / 100).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeLineItem(item.priceId)}
                                className="text-red-500 hover:text-red-700 ml-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between">
                        <span className="font-medium text-stone-800">Total</span>
                        <span className="text-lg font-bold text-primary-700">
                          ${(calculateTotal() / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  {paymentError && (
                    <div className="bg-red-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-red-700">{paymentError}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleSendPaymentRequest}
                    disabled={sendingPayment || lineItems.length === 0}
                    size="sm"
                    className="w-full"
                  >
                    {sendingPayment ? (
                      <>
                        <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Payment Request
                      </>
                    )}
                  </Button>
                </>
              )}

              {loadingProducts && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full"></div>
                  <span className="ml-2 text-sm text-stone-500">Loading products...</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Client Info */}
      <div className="bg-stone-50 rounded-lg p-4">
        <h3 className="font-medium text-stone-800 mb-2">Client</h3>
        <p className="text-stone-800">{booking.client_name}</p>
        <p className="text-stone-600">
          <a href={`mailto:${booking.client_email}`} className="text-primary-600 hover:underline">
            {booking.client_email}
          </a>
        </p>
        <p className="text-stone-600">
          <a href={`tel:${booking.client_phone}`} className="text-primary-600 hover:underline">
            {booking.client_phone}
          </a>
        </p>
      </div>

      {/* Pets */}
      <div>
        <h3 className="font-medium text-stone-800 mb-3">Pets</h3>
        <div className="space-y-3">
          {pets.map((pet, index) => (
            <div key={index} className="bg-stone-50 rounded-lg p-4">
              <p className="font-medium text-stone-800">{pet.name}</p>
              <p className="text-sm text-stone-600">
                {pet.type === 'dog' ? `${pet.breed}, ${pet.weight} lbs` : pet.type}
              </p>
              <div className="flex gap-1 mt-1">
                {pet.is_puppy && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Puppy</span>
                )}
                {pet.needs_medication && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Medication</span>
                )}
                {pet.suggested_size && (
                  <span className="text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded">{pet.suggested_size}</span>
                )}
              </div>
              {pet.special_needs && (
                <p className="text-sm text-stone-500 mt-2">Notes: {pet.special_needs}</p>
              )}
              {pet.medication_notes && (
                <p className="text-sm text-blue-600 mt-1">Medication: {pet.medication_notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="text-xs text-stone-400 border-t border-stone-200 pt-4">
        <p>Created: {new Date(booking.created_at).toLocaleString()}</p>
        <p>Source: {booking.source}</p>
      </div>
    </div>
  );
}
