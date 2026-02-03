import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What to Bring',
  description:
    'Prepare your pet for their stay at Snuggles Pet Boarding. Checklists for dogs, cats, required vaccines, and daily schedule.',
};

export default function PreparePage() {
  return (
    <>
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-12 bg-primary-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Prepare for Your Pet&apos;s Stay
            </h1>
            <p className="text-lg text-stone-600">
              Everything you need to know before dropping off your furry friend.
            </p>
          </div>
        </section>

        {/* Dog Boarding Checklist */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-800">Dog Boarding Checklist</h2>
            </div>

            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <ul className="space-y-3">
                {[
                  { title: 'Vaccine records', desc: 'Rabies, DHPP, Bordetella (required)' },
                  { title: 'Collar with ID tags', desc: '' },
                  { title: 'Water bowl', desc: 'Something familiar from home' },
                  { title: 'Treats', desc: 'Their favorites for positive reinforcement' },
                  { title: 'Bed or blanket', desc: 'Helps them feel at home' },
                  { title: 'Food', desc: 'Enough for their entire stay (plus a bit extra)' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-stone-700">
                      <strong>{item.title}</strong>
                      {item.desc && ` - ${item.desc}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cat Boarding Checklist */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-800">Cat Boarding Checklist</h2>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <ul className="space-y-3">
                {[
                  { title: 'Carrier or crate', desc: 'For safe transport and a cozy hideaway' },
                  { title: 'Food', desc: 'Dry and/or wet food for the duration of stay (plus extra)' },
                  { title: 'Food and water bowls', desc: 'Familiar items reduce stress' },
                  { title: 'Litter box and litter', desc: 'If they have a preferred type' },
                  { title: 'Bedding or blanket', desc: 'Something that smells like home' },
                  { title: 'Toys', desc: 'Favorite toys help them feel comfortable' },
                  { title: 'Medications', desc: 'With clear dosage instructions' },
                  { title: 'Vet contact information', desc: 'In case of emergency' },
                  { title: 'Any special behavior notes', desc: 'Likes, dislikes, quirks' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-stone-700">
                      <strong>{item.title}</strong>
                      {item.desc && ` - ${item.desc}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Required Vaccines */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-800">Required Vaccines</h2>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <p className="text-stone-700 mb-4">All dogs must be up-to-date on the following vaccines:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {['Rabies', 'DHPP', 'Bordetella', 'Leptospirosis', 'CIV (Canine Influenza)'].map((vaccine, index) => (
                  <div key={index} className={`flex items-center gap-3 bg-white rounded-lg p-3 ${index === 4 ? 'sm:col-span-2' : ''}`}>
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-medium text-stone-800">{vaccine}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-stone-600 mt-4">
                Please bring proof of vaccination to your first visit or email them to us in advance.
              </p>
            </div>
          </div>
        </section>

        {/* Farm Life Essentials */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-800">Farm Life Essentials</h2>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <p className="text-stone-700 mb-4">
                Since your pet will be enjoying farm life, please ensure they&apos;re protected:
              </p>
              <div className="space-y-3">
                {[
                  { title: 'Flea & Tick Prevention', desc: 'Must be current before arrival' },
                  { title: 'Heartworm Prevention', desc: 'Monthly prevention recommended' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-stone-700">
                      <strong>{item.title}</strong> - {item.desc}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-stone-600 mt-4">
                Our farm environment is wonderful but does mean exposure to outdoor elements. Keeping your pet protected ensures a safe and happy stay.
              </p>
            </div>
          </div>
        </section>

        {/* Daily Dog Schedule */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-800">A Day at Snuggles</h2>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <p className="text-stone-700 mb-4">Here&apos;s what a typical day looks like for our dog guests:</p>
              <div className="space-y-4">
                {[
                  { time: '6:00 AM', activity: 'Morning walk and potty break' },
                  { time: '7:00 AM', activity: 'Breakfast time' },
                  { time: '9:00 AM', activity: 'Playtime and outdoor exploration' },
                  { time: '12:00 PM', activity: 'Midday walk' },
                  { time: '1:00 PM', activity: 'Rest and nap time' },
                  { time: '4:00 PM', activity: 'Afternoon playtime' },
                  { time: '6:00 PM', activity: 'Dinner time' },
                  { time: '8:00 PM', activity: 'Evening walk' },
                  { time: '11:00 PM', activity: 'Final potty break and bedtime' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap">
                      {item.time}
                    </div>
                    <span className="text-stone-700">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Payment Policy */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-800">Payment Policy</h2>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <p className="text-stone-700 mb-6">
                To confirm your booking, we require full payment before the stay. This ensures your spot is reserved.
              </p>

              <h3 className="font-semibold text-stone-800 mb-4">Accepted Payment Methods</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { method: 'Zelle', detail: '954-907-7750' },
                  { method: 'Apple Pay', detail: '954-304-3151' },
                  { method: 'Venmo', detail: '@Anna-Canedo' },
                  { method: 'PayPal', detail: '@AnnaCMello' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-stone-50 rounded-lg p-4">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-medium text-stone-800">{item.method}</span>
                      <p className="text-sm text-stone-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>PayPal Note:</strong> Please select &quot;Friends and Family&quot; to avoid fees. If sent as &quot;Goods and Services,&quot; a 10% fee will be added to cover processing costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-stone-200 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-800">Cancellation Policy</h2>
            </div>

            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-green-800">Full Refund</span>
                    <p className="text-sm text-green-700">If canceled 3+ days before boarding</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <span className="font-semibold text-amber-800">50% Refund</span>
                    <p className="text-sm text-amber-700">If canceled within 3 days of boarding</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <span className="font-semibold text-red-800">No Refund</span>
                    <p className="text-sm text-red-700">On the day of boarding or after check-in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Ready to Book?</h2>
            <p className="text-primary-100 mb-8">
              Questions about what to bring? Give us a call or book your stay today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a
                href="/book"
                className="bg-white text-primary-700 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Book Now
              </a>
              <a
                href={SITE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-primary-500"
              >
                Schedule Meet & Greet
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}`}
                className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-primary-500"
              >
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
