'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const params = useParams();
  const bookingId = params.id as string;

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-stone-800 mb-2">Payment Successful!</h1>
        <p className="text-stone-600 mb-6">
          Thank you! Your payment has been processed and your booking is now confirmed.
        </p>

        <div className="bg-green-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-green-800">
            <span className="font-medium">Booking ID:</span> {bookingId}
          </p>
          <p className="text-sm text-green-700 mt-2">
            You will receive a confirmation email shortly with all the details.
          </p>
        </div>

        <div className="bg-primary-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-primary-800 mb-2">What&apos;s Next?</h3>
          <ul className="text-left text-sm text-primary-700 space-y-2">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check your email for the confirmation
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Review what to bring on our preparation page
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              We&apos;ll see you on check-in day!
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/my-account"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            View My Bookings
          </Link>
          <Link
            href="/prepare"
            className="inline-block border-2 border-stone-300 text-stone-700 px-6 py-3 rounded-full font-medium hover:border-primary-400 transition-colors"
          >
            What to Bring
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            Questions? Contact us at{' '}
            <a href="mailto:snugglespetboarding@gmail.com" className="text-primary-600 hover:text-primary-700">
              snugglespetboarding@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
