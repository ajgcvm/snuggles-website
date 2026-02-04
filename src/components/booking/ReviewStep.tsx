'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '@/stores/bookingStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getEstimate, submitBooking, updateUserProfile } from '@/lib/api';
import { getBreedWarnings } from '@/lib/breedValidation';

interface ReviewStepProps {
  onSuccess: () => void;
}

export function ReviewStep({ onSuccess }: ReviewStepProps) {
  const {
    service,
    checkIn,
    checkOut,
    pets,
    selectedRegisteredPets,
    registeredPets,
    client,
    estimate,
    setEstimate,
    setStep,
    loggedInUser,
    authToken,
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedRegPets = registeredPets.filter((p) => selectedRegisteredPets.includes(p.id));
  const allPets = [...pets, ...selectedRegPets.map(p => ({
    name: p.name,
    type: p.type,
    breed: p.breed || '',
    weight: p.weight || 0,
    ageYears: p.age_years || 0,
    isPuppy: p.is_puppy || false,
    needsMedication: p.needs_medication || false,
    medicationNotes: p.medication_notes || '',
    getsAlongDogs: p.gets_along_dogs || 'yes',
    getsAlongCats: p.gets_along_cats || 'unknown',
    specialNeeds: p.special_needs || '',
  }))];

  const requiresMeetGreet = allPets.some((pet) => {
    const warning = getBreedWarnings(pet.breed, pet.weight);
    return warning.meetGreetRequired;
  }) || (loggedInUser?.status === 'new');

  const nights = service === 'boarding'
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 1;

  // Fetch estimate
  useEffect(() => {
    const fetchEstimate = async () => {
      setEstimateLoading(true);
      try {
        const petsData = allPets.map((pet) => ({
          type: pet.type,
          isPuppy: pet.isPuppy,
          needsMedication: pet.needsMedication,
        }));

        const result = await getEstimate({
          service: service || 'boarding',
          pets: petsData,
          checkIn,
          checkOut: service === 'daycare' ? checkIn : checkOut,
        });

        setEstimate(result);
      } catch (err) {
        console.error('Failed to get estimate:', err);
      } finally {
        setEstimateLoading(false);
      }
    };

    if (checkIn && (service === 'daycare' || checkOut)) {
      fetchEstimate();
    }
  }, [checkIn, checkOut, service, allPets.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    setStep(4);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const petsForSubmission = pets.map((pet) => ({
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        weight: pet.weight,
        ageYears: pet.ageYears,
        isPuppy: pet.isPuppy,
        needsMedication: pet.needsMedication,
        medicationNotes: pet.medicationNotes,
        getsAlongDogs: pet.getsAlongDogs,
        getsAlongCats: pet.getsAlongCats,
        specialNeeds: pet.specialNeeds,
      }));

      const result = await submitBooking({
        service: service || 'boarding',
        checkIn,
        checkOut: service === 'daycare' ? checkIn : checkOut,
        client,
        pets: petsForSubmission,
        source: 'website',
        clientId: loggedInUser?.id,
        registeredPetIds: selectedRegisteredPets.length > 0 ? selectedRegisteredPets : undefined,
      });

      if (result.status === 'success' || result.bookingId) {
        // Update user profile if phone changed
        if (loggedInUser && client.phone && client.phone !== loggedInUser.phone) {
          try {
            await updateUserProfile({ phone: client.phone });
          } catch (e) {
            console.error('Failed to update phone:', e);
            // Don't block booking success
          }
        }
        onSuccess();
      } else {
        setError(result.message || 'Failed to submit booking');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setError('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
        Review Your Booking
      </h2>
      <p className="text-stone-600 text-center mb-8">
        Please review the details before submitting
      </p>

      {requiresMeetGreet && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium text-amber-800">Meet & Greet Required</h3>
              <p className="text-sm text-amber-700">
                {loggedInUser?.status === 'new'
                  ? 'As a new client, we require a meet & greet before your first stay. We\'ll reach out to schedule.'
                  : 'Based on your pet\'s breed or size, a meet & greet is required. We\'ll reach out to schedule.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-6">
        {/* Service Details */}
        <div className="p-4 border-b border-stone-200">
          <h3 className="font-medium text-stone-800 mb-2">Service</h3>
          <p className="text-stone-600">
            {service === 'boarding' ? 'Overnight Boarding' : 'Daycare'}
          </p>
        </div>

        {/* Dates */}
        <div className="p-4 border-b border-stone-200">
          <h3 className="font-medium text-stone-800 mb-2">Dates</h3>
          <p className="text-stone-600">
            {new Date(checkIn).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            {service === 'boarding' && (
              <>
                {' '}to{' '}
                {new Date(checkOut).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </>
            )}
          </p>
          <p className="text-sm text-stone-500">
            {service === 'boarding' ? `${nights} night(s)` : '1 day'}
          </p>
        </div>

        {/* Pets */}
        <div className="p-4 border-b border-stone-200">
          <h3 className="font-medium text-stone-800 mb-2">Pets ({allPets.length})</h3>
          <div className="space-y-2">
            {allPets.map((pet, index) => {
              const warning = getBreedWarnings(pet.breed, pet.weight);
              return (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="text-stone-700">{pet.name}</span>
                    <span className="text-stone-500 text-sm ml-2">
                      {pet.type}
                      {pet.breed && ` - ${pet.breed}`}
                      {pet.weight > 0 && `, ${pet.weight} lbs`}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {pet.isPuppy && <Badge variant="info">Puppy</Badge>}
                    {pet.needsMedication && <Badge variant="warning">Medication</Badge>}
                    {warning.meetGreetRequired && <Badge variant="warning">M&G</Badge>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="p-4 border-b border-stone-200">
          <h3 className="font-medium text-stone-800 mb-2">Contact Information</h3>
          <p className="text-stone-700">{client.name}</p>
          <p className="text-stone-500 text-sm">{client.email}</p>
          <p className="text-stone-500 text-sm">{client.phone}</p>
        </div>

        {/* Estimate */}
        <div className="p-4 bg-primary-50">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-stone-800">Estimated Total</h3>
            {estimateLoading ? (
              <div className="animate-pulse bg-stone-200 h-8 w-24 rounded"></div>
            ) : (
              <span className="text-2xl font-bold text-primary-700">
                ${estimate?.total != null ? estimate.total : '—'}
              </span>
            )}
          </div>
          <p className="text-sm text-stone-500 mt-1">
            Final price may vary. We&apos;ll confirm the total before your stay.
          </p>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
        <h3 className="font-medium text-stone-800 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Cancellation Policy
        </h3>
        <ul className="text-sm text-stone-600 space-y-1">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span><strong>100% refund</strong> if cancelled 3+ days before check-in</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span><strong>50% refund</strong> if cancelled within 3 days of check-in</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span><strong>No refund</strong> if cancelled on the day of check-in</span>
          </li>
        </ul>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </Button>

        <Button onClick={handleSubmit} loading={loading}>
          Submit Booking
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
