'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAuthToken,
  getCachedUser,
  fetchUser,
  fetchUserBookings,
  addPet,
} from '@/lib/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/Badge';
import { Header } from '@/components/layout/Header';
import type { User, Pet, Booking } from '@/types';

export default function MyAccountPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [cachedUser, setCachedUserState] = useState<User | null>(null);

  // Check auth on mount
  useEffect(() => {
    const token = getAuthToken();
    const cached = getCachedUser();

    if (!token && !cached) {
      router.push('/login');
      return;
    }

    setCachedUserState(cached);
    setIsAuthenticated(true);
  }, [router]);

  // Fetch user data
  const { data: userData, error: userError } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: isAuthenticated === true,
    staleTime: 60000, // 1 minute
  });

  // Fetch bookings
  const { data: bookingsData } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchUserBookings,
    enabled: isAuthenticated === true,
    staleTime: 60000,
  });

  // Add pet mutation
  const addPetMutation = useMutation({
    mutationFn: addPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setShowAddPetModal(false);
    },
  });

  const handleAddPet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await addPetMutation.mutateAsync({
      name: formData.get('name') as string,
      type: formData.get('type') as Pet['type'],
      breed: formData.get('breed') as string || undefined,
      weight: formData.get('weight') ? parseFloat(formData.get('weight') as string) : undefined,
      age_years: formData.get('age_years') ? parseFloat(formData.get('age_years') as string) : undefined,
      special_needs: formData.get('special_needs') as string || undefined,
    });
  };

  // Show loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Handle auth errors
  if (userError) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <p className="text-stone-600 mb-4">Session expired. Please log in again.</p>
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const user = userData?.client || cachedUser;
  const pets = userData?.pets || [];
  const bookings = bookingsData?.bookings || [];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Shared Header with navigation */}
      <Header showBookButton={true} />

      {/* Add padding-top to account for fixed header */}
      <main className="max-w-5xl mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-stone-600">Manage your pets and bookings all in one place.</p>
        </div>

        {/* Status Badge */}
        {user?.status === 'new' && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-800">New Account</h3>
                <p className="text-sm text-amber-700">
                  Your first booking will require a Meet & Greet so we can get to know your pet.
                </p>
              </div>
            </div>
          </div>
        )}

        {user?.status === 'approved' && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Approved Client</h3>
                <p className="text-sm text-green-700">
                  You can book stays without a Meet & Greet. Welcome back!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/book"
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl p-6 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">New Booking</h3>
                <p className="text-sm text-white/80">Schedule a stay</p>
              </div>
            </div>
          </Link>

          <button
            onClick={() => setShowAddPetModal(true)}
            className="bg-white hover:bg-stone-50 border-2 border-stone-200 hover:border-primary-300 rounded-xl p-6 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800">Add Pet</h3>
                <p className="text-sm text-stone-500">Register a new pet</p>
              </div>
            </div>
          </button>

          <Link
            href="/#contact"
            className="bg-white hover:bg-stone-50 border-2 border-stone-200 hover:border-primary-300 rounded-xl p-6 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800">Contact Us</h3>
                <p className="text-sm text-stone-500">Questions? Reach out</p>
              </div>
            </div>
          </Link>
        </div>

        {/* My Pets Section */}
        <div className="bg-white rounded-xl border border-stone-200 mb-8">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h2 className="font-bold text-stone-800">My Pets</h2>
          </div>
          <div className="p-4">
            {pets.length === 0 ? (
              <p className="text-stone-500 text-center py-4">
                No pets registered yet. Add your first pet above!
              </p>
            ) : (
              <div className="space-y-3">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-bold">
                          {pet.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">{pet.name}</h3>
                        <p className="text-sm text-stone-500">
                          {pet.breed || pet.type}
                          {pet.weight && `, ${pet.weight} lbs`}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={pet.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="bg-white rounded-xl border border-stone-200">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h2 className="font-bold text-stone-800">Recent Bookings</h2>
          </div>
          <div className="p-4">
            {bookings.length === 0 ? (
              <p className="text-stone-500 text-center py-4">
                No bookings yet.{' '}
                <Link href="/book" className="text-primary-600 hover:underline">
                  Book your first stay!
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Pet Modal */}
      <Modal
        isOpen={showAddPetModal}
        onClose={() => setShowAddPetModal(false)}
        title="Add New Pet"
      >
        <form onSubmit={handleAddPet} className="p-4 space-y-4">
          <Input
            label="Pet Name *"
            name="name"
            required
            placeholder="Buddy"
          />

          <Select label="Type *" name="type" required>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </Select>

          <Input
            label="Breed"
            name="breed"
            placeholder="Golden Retriever"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Weight (lbs)"
              name="weight"
              type="number"
              placeholder="50"
            />
            <Input
              label="Age (years)"
              name="age_years"
              type="number"
              step="0.5"
              placeholder="3"
            />
          </div>

          <Textarea
            label="Special Needs"
            name="special_needs"
            rows={2}
            placeholder="Any medical conditions, dietary needs, etc."
          />

          <Button
            type="submit"
            className="w-full"
            loading={addPetMutation.isPending}
          >
            Add Pet
          </Button>

          {addPetMutation.isError && (
            <p className="text-red-600 text-sm text-center">
              {addPetMutation.error?.message || 'Failed to add pet'}
            </p>
          )}
        </form>
      </Modal>
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const checkIn = new Date(booking.check_in).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const checkOut = new Date(booking.check_out).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const petNames = booking.pets.map((p) => p.name).join(', ') || 'No pets';
  const price = booking.final_price || booking.estimated_price;

  return (
    <div className="py-4 border-b border-stone-100 last:border-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="font-medium text-stone-800">{booking.id}</span>
          <span className="ml-2">
            <StatusBadge status={booking.status} />
          </span>
        </div>
        <span className="text-sm font-medium text-stone-700">${price}</span>
      </div>
      <div className="text-sm text-stone-600 space-y-1">
        <p>
          <strong>Service:</strong>{' '}
          {booking.service === 'boarding' ? 'Overnight Boarding' : 'Daycare'}
        </p>
        <p>
          <strong>Dates:</strong> {checkIn} - {checkOut}
        </p>
        <p>
          <strong>Pets:</strong> {petNames}
        </p>
        {booking.meet_greet_date && (
          <p>
            <strong>Meet & Greet:</strong>{' '}
            {new Date(booking.meet_greet_date).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        )}
      </div>
    </div>
  );
}
