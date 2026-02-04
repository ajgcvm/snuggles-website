'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PaymentCancelledPage() {
  const params = useParams();
  const bookingId = params.id as string;

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-stone-800 mb-2">Payment Cancelled</h1>
        <p className="text-stone-600 mb-6">
          Your payment was not completed. Don&apos;t worry - your booking request is still pending.
        </p>

        <div className="bg-amber-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            <span className="font-medium">Booking ID:</span> {bookingId}
          </p>
          <p className="text-sm text-amber-700 mt-2">
            You can complete the payment later from your account or wait for a new payment link.
          </p>
        </div>

        <div className="bg-stone-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-stone-800 mb-2">What Now?</h3>
          <ul className="text-left text-sm text-stone-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-stone-400">•</span>
              Check your email for the original payment link (valid for 24 hours)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-stone-400">•</span>
              Contact us if you need a new payment link
            </li>
            <li className="flex items-start gap-2">
              <span className="text-stone-400">•</span>
              Your booking will be held until the payment link expires
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/my-account"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Go to My Account
          </Link>
          <Link
            href="/"
            className="inline-block border-2 border-stone-300 text-stone-700 px-6 py-3 rounded-full font-medium hover:border-primary-400 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            Need help?{' '}
            <a href="mailto:snugglespetboarding@gmail.com" className="text-primary-600 hover:text-primary-700">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
