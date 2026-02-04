'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBookingStore } from '@/stores/bookingStore';
import { getAuthToken, fetchUser, getCachedUser } from '@/lib/api';
import {
  StepIndicator,
  ServiceStep,
  DateStep,
  PetStep,
  ContactStep,
  ReviewStep,
} from '@/components/booking';
import { SITE_CONFIG } from '@/lib/constants';

const STEPS = ['Service', 'Dates', 'Pets', 'Contact', 'Review'];

export default function BookPage() {
  const { currentStep, setAuth, reset } = useBookingStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for logged-in user
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      const cachedUser = getCachedUser();

      if (token) {
        try {
          const data = await fetchUser();
          console.log('fetchUser response:', data);
          setAuth(token, data.client, data.pets || []);
        } catch (error) {
          console.error('fetchUser error:', error);
          // Not logged in or error, continue as guest
          setAuth(null, null, []);
        }
      } else if (cachedUser) {
        // Use cached data
        setAuth(token, cachedUser, []);
      } else {
        setAuth(null, null, []);
      }

      setIsLoading(false);
    };

    checkAuth();

    // Reset booking state when leaving
    return () => {
      // Don't reset if we're showing success
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleBookAnother = () => {
    reset();
    setIsSuccess(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return <SuccessScreen onBookAnother={handleBookAnother} />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo-expanded.svg" alt="Snuggles" width={40} height={40} />
            <span className="text-lg font-bold text-primary-700 hidden sm:block">Book Your Stay</span>
          </Link>
          <Link href="/" className="text-stone-600 hover:text-stone-800 text-sm">
            Cancel
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} totalSteps={5} steps={STEPS} />

        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8">
          {currentStep === 1 && <ServiceStep />}
          {currentStep === 2 && <DateStep />}
          {currentStep === 3 && <PetStep />}
          {currentStep === 4 && <ContactStep />}
          {currentStep === 5 && <ReviewStep onSuccess={handleSuccess} />}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-stone-500 text-sm">
            Questions?{' '}
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}`}
              className="text-primary-600 hover:text-primary-700"
            >
              Call {SITE_CONFIG.phone}
            </a>{' '}
            or{' '}
            <a
              href={SITE_CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              schedule a meet & greet
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

function SuccessScreen({ onBookAnother }: { onBookAnother: () => void }) {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-stone-800 mb-2">Booking Request Submitted!</h1>
        <p className="text-stone-600 mb-6">
          Thank you for choosing Snuggles Pet Boarding. We&apos;ve received your request and will be in
          touch within 24 hours to confirm your booking.
        </p>

        <div className="bg-primary-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-primary-800 mb-2">What&apos;s Next?</h3>
          <ul className="text-left text-sm text-primary-700 space-y-2">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              We&apos;ll review your request and check availability
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You&apos;ll receive a confirmation email with final pricing
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              If a meet & greet is required, we&apos;ll schedule it with you
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/my-account"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Back to My Account
          </Link>
          <button
            onClick={onBookAnother}
            className="inline-block border-2 border-stone-300 text-stone-700 px-6 py-3 rounded-full font-medium hover:border-primary-400 transition-colors"
          >
            Book Another Stay
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            Questions? Call us at{' '}
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}`}
              className="text-primary-600 hover:text-primary-700"
            >
              {SITE_CONFIG.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
