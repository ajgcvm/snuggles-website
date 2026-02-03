'use client';

import { useBookingStore } from '@/stores/bookingStore';
import { Button } from '@/components/ui/Button';

export function ServiceStep() {
  const { service, setService, setStep } = useBookingStore();

  const handleContinue = () => {
    if (service) {
      setStep(2);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
        What service do you need?
      </h2>
      <p className="text-stone-600 text-center mb-8">
        Select the type of care for your pet
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Boarding */}
        <button
          type="button"
          onClick={() => setService('boarding')}
          className={`p-6 rounded-2xl border-2 text-left transition-all ${
            service === 'boarding'
              ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
              : 'border-stone-200 hover:border-primary-300'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              service === 'boarding' ? 'bg-primary-100' : 'bg-stone-100'
            }`}>
              <svg className={`w-6 h-6 ${service === 'boarding' ? 'text-primary-600' : 'text-stone-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-800">Overnight Boarding</h3>
              <p className="text-sm text-stone-500">Multi-day stays</p>
            </div>
          </div>
          <ul className="text-sm text-stone-600 space-y-1">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Farm experience
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Daily photo updates
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Structured daily routine
            </li>
          </ul>
        </button>

        {/* Daycare */}
        <button
          type="button"
          onClick={() => setService('daycare')}
          className={`p-6 rounded-2xl border-2 text-left transition-all ${
            service === 'daycare'
              ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
              : 'border-stone-200 hover:border-primary-300'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              service === 'daycare' ? 'bg-primary-100' : 'bg-stone-100'
            }`}>
              <svg className={`w-6 h-6 ${service === 'daycare' ? 'text-primary-600' : 'text-stone-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-800">Daycare</h3>
              <p className="text-sm text-stone-500">Day visits</p>
            </div>
          </div>
          <ul className="text-sm text-stone-600 space-y-1">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Full day of play
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Social time with others
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Drop-off & pick-up same day
            </li>
          </ul>
        </button>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleContinue} disabled={!service} size="lg">
          Continue
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
