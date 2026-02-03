'use client';

import { useBookingStore } from '@/stores/bookingStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ContactStep() {
  const { client, setClient, loggedInUser, setStep } = useBookingStore();

  const handleChange = (field: keyof typeof client, value: string) => {
    setClient({ ...client, [field]: value });
  };

  const isValid = client.name && client.email && client.phone;

  const handleContinue = () => {
    if (isValid) {
      setStep(5);
    }
  };

  const handleBack = () => {
    setStep(3);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
        Your Contact Information
      </h2>
      <p className="text-stone-600 text-center mb-8">
        How can we reach you about this booking?
      </p>

      {loggedInUser && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-primary-700">
            Logged in as <strong>{loggedInUser.name}</strong> - info pre-filled
          </span>
        </div>
      )}

      <div className="space-y-4 mb-8">
        <Input
          label="Full Name *"
          value={client.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Doe"
          required
        />

        <Input
          type="email"
          label="Email Address *"
          value={client.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
          required
        />

        <Input
          type="tel"
          label="Phone Number *"
          value={client.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
          required
        />
      </div>

      <div className="bg-stone-50 rounded-xl p-4 mb-8">
        <p className="text-sm text-stone-600">
          We&apos;ll send booking confirmations and photo updates to your email and may call/text for important updates.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </Button>

        <Button onClick={handleContinue} disabled={!isValid}>
          Review Booking
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
