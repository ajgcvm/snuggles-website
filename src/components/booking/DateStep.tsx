'use client';

import { useBookingStore } from '@/stores/bookingStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function DateStep() {
  const { service, checkIn, checkOut, setDates, setStep } = useBookingStore();

  const isBoarding = service === 'boarding';
  const today = new Date().toISOString().split('T')[0];

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setDates(newCheckIn, checkOut);

    // If boarding and check-out is before or equal to check-in, auto-update
    if (isBoarding && checkOut && newCheckIn >= checkOut) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setDates(newCheckIn, nextDay.toISOString().split('T')[0]);
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDates(checkIn, e.target.value);
  };

  const isValid = () => {
    if (!checkIn) return false;
    if (isBoarding && !checkOut) return false;
    if (isBoarding && checkIn >= checkOut) return false;
    return true;
  };

  const handleContinue = () => {
    if (isValid()) {
      // For daycare, set check-out same as check-in
      if (!isBoarding) {
        setDates(checkIn, checkIn);
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
        When do you need care?
      </h2>
      <p className="text-stone-600 text-center mb-8">
        {isBoarding ? 'Select your check-in and check-out dates' : 'Select the date for daycare'}
      </p>

      <div className={`grid ${isBoarding ? 'md:grid-cols-2' : ''} gap-6 mb-8`}>
        <div>
          <Input
            type="date"
            label={isBoarding ? 'Check-in Date' : 'Daycare Date'}
            value={checkIn}
            onChange={handleCheckInChange}
            min={today}
          />
        </div>

        {isBoarding && (
          <div>
            <Input
              type="date"
              label="Check-out Date"
              value={checkOut}
              onChange={handleCheckOutChange}
              min={checkIn || today}
            />
          </div>
        )}
      </div>

      {/* Stay Summary */}
      {checkIn && (isBoarding ? checkOut : true) && (
        <div className="bg-primary-50 rounded-xl p-4 mb-8">
          <h3 className="font-medium text-primary-800 mb-2">
            {isBoarding ? 'Stay Summary' : 'Visit Summary'}
          </h3>
          <p className="text-primary-700">
            {isBoarding ? (
              <>
                <strong>
                  {Math.ceil(
                    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  night(s)
                </strong>{' '}
                from{' '}
                {new Date(checkIn).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                to{' '}
                {new Date(checkOut).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </>
            ) : (
              <>
                <strong>Daycare</strong> on{' '}
                {new Date(checkIn).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </Button>

        <Button onClick={handleContinue} disabled={!isValid()}>
          Continue
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
