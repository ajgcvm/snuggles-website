import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { SITE_CONFIG } from '@/lib/constants';

// Star icon component for reviews
function StarIcon() {
  return (
    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function FiveStars() {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

const testimonials = [
  {
    text: "I had a health issue and needed help immediately. With short notice and no knowledge of who I or Ranger were, she offered up her home. Anna sent pictures of Ranger playing with other dogs, relaxing in the sun, always with a smile on his face. This brought me joy and comfort as I recovered in the hospital.",
    name: "Michael J.",
    detail: "Ranger's dad · Boarding",
  },
  {
    text: "We have two young, energetic dogs and needed to board them for 2+ weeks. We hated the thought of them being in a cage at a kennel for that long. They had THE BEST time at her place! They loved roaming her 5 acre property and playing with other dogs and were never in a crate the whole time.",
    name: "Laura D.",
    detail: "2-week stay · Boarding",
  },
  {
    text: "Anna was absolutely wonderful with my cat, Smokey. She boarded her for two full weeks during a pretty stressful moving process. She was kind, communicative, and clearly cared about Smokey's comfort and well-being. When I picked her up, she was relaxed and clearly had been treated with care.",
    name: "Nathan H.",
    detail: "Smokey's dad · Cat Boarding",
  },
  {
    text: "My very nervous Cockapoo had his first time away from his family and they were patient with him while he was a challenge. Now when he goes back, he's in a routine and happily playful. The property is every dog's dream. Anna sends updates and pictures as she takes care of my boy.",
    name: "Candace J.",
    detail: "Cockapoo parent · Boarding",
  },
  {
    text: "My dogs had the opportunity to stay on a farm, where they could run and play and enjoy water, and sniff every leaf out on the farm. I have never seen my dogs so happy. Thank you Anna for everything!",
    name: "Angela G.",
    detail: "Multi-dog family · Boarding",
  },
  {
    text: "Anna was a fantastic sitter for our young dachshund! He appeared to be treated extremely well, and got plenty of walks and snuggles while we were away. She was extremely responsive and sent us plenty of updates throughout his stay. We will definitely use Anna again!",
    name: "Ciara F.",
    detail: "Dachshund parent · Boarding",
  },
];

const galleryImages = [
  { src: '/images/dogs-running-trail.jpg', alt: 'Two happy dogs running on farm trail' },
  { src: '/images/poodle-puppy.jpg', alt: 'Cute poodle puppy on the grass' },
  { src: '/images/pointers-running.jpg', alt: 'Two dogs running and playing together' },
  { src: '/images/pomeranian-black.jpg', alt: 'Black pomeranian enjoying the outdoors' },
  { src: '/images/labrador-ball.jpg', alt: 'Labrador playing with ball at sunset' },
  { src: '/images/bulldog-smiling.jpg', alt: 'Happy bulldog smiling by the pond' },
];

export default function HomePage() {
  return (
    <>
      <Header transparent />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/images/dogs-running-trail.jpg"
            alt="Happy dogs running on the farm at Snuggles Pet Boarding"
            fill
            className="object-cover object-[center_60%] md:object-[center_70%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Where Pets Roam Free
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
              Not a kennel. A farm vacation for your furry family. Dogs, cats, and birds welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Book Now
              </Link>
              <a
                href={SITE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/30"
              >
                Schedule Meet & Greet
              </a>
            </div>
            {/* Rover Rating Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-white/90">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold">5.0</span>
              <span className="text-white/70">·</span>
              <a
                href={SITE_CONFIG.roverUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                210+ reviews on Rover
              </a>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* By Appointment Only Banner */}
        <section className="bg-amber-500 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-bold text-amber-900 text-lg">By Appointment Only</span>
              </div>
              <span className="text-amber-800">
                Please schedule your visit in advance.{' '}
                <a
                  href={SITE_CONFIG.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-amber-900"
                >
                  Book a Meet & Greet
                </a>
              </span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Services</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Whether you&apos;re traveling for a week or just need a day of fun for your pet, we&apos;ve got you covered.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Dogs */}
              <ServiceCard
                icon={<DogIcon />}
                title="Dogs"
                items={[
                  { service: 'Boarding', price: '$40-50/night' },
                  { service: 'Daycare', price: '$30-35/day' },
                ]}
                features={['Daily photo updates', 'Outdoor farm experience']}
              />

              {/* Cats */}
              <ServiceCard
                icon={<CatIcon />}
                title="Cats"
                items={[{ service: 'Boarding', price: '$30-35/night' }]}
                features={['Quiet, safe environment', 'Daily updates']}
              />

              {/* Other Pets */}
              <ServiceCard
                icon={<HeartIcon />}
                title="Other Pets"
                items={[{ service: 'All services', price: '$25/day' }]}
                features={['Birds, chinchillas, fish', 'Specialized care']}
              />
            </div>

            {/* Executive Boarding - Premium Card */}
            <div className="mt-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 md:p-8 border-2 border-amber-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                PREMIUM
              </div>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900">Executive Boarding</h3>
                  </div>
                  <p className="text-amber-800 mb-4">
                    An exclusive experience where your dog has the entire farm and home all to themselves.
                    Perfect for pets who deserve the ultimate in privacy and personalized care.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-amber-200 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                      Private farm access
                    </span>
                    <span className="bg-amber-200 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                      60 days notice
                    </span>
                    <span className="bg-amber-200 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                      Personalized care
                    </span>
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-5">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-amber-900 font-medium">Executive Boarding</span>
                      <span className="font-bold text-amber-700">
                        $300<span className="text-sm font-normal">/day</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-amber-900 font-medium">Holiday Rate</span>
                      <span className="font-bold text-amber-700">
                        $600<span className="text-sm font-normal">/day</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-amber-900 font-medium">Premium Meals</span>
                      <span className="font-bold text-amber-700">
                        +$5<span className="text-sm font-normal">/day</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-amber-900 font-medium">Dog Training</span>
                      <span className="font-bold text-amber-700">
                        $250<span className="text-sm font-normal">/day</span>
                      </span>
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
                  >
                    Inquire About Executive Boarding
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 p-4 bg-stone-100 rounded-xl text-center">
              <p className="text-sm text-stone-600">
                <span className="font-medium">Rates vary</span> for puppies, pets on medication, and
                holidays/high demand periods.
                <br className="hidden sm:block" />
                <a href="#contact" className="text-primary-600 hover:text-primary-700 font-medium">
                  Contact us
                </a>{' '}
                for a personalized quote.
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/prepare"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Booked your stay? See what to bring
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="py-20 md:py-28 bg-primary-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">Why Snuggles?</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                We&apos;re not your typical boarding facility. Here&apos;s what makes us different.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<StarIcon2 />}
                title="Farm Experience"
                description="Open fields, fresh air, and room to run. No cages, no kennels - just nature."
              />
              <FeatureCard
                icon={<HeartIcon />}
                title="All Pets Welcome"
                description="Dogs, cats, birds, and more. Bring the whole family - we'll take care of everyone."
              />
              <FeatureCard
                icon={<CameraIcon />}
                title="Daily Updates"
                description="Photos and updates every day. You'll never wonder how your pet is doing."
              />
              <FeatureCard
                icon={<HomeIcon />}
                title="Family Owned"
                description="Personal attention from people who truly love animals. Your pet becomes part of our family."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <FiveStars />
                <span>5.0 · 210+ Reviews on Rover</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                What Pet Parents Say
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Don&apos;t just take our word for it. Here&apos;s what our happy guests&apos; families have to say.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href={SITE_CONFIG.roverUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Read all 210+ reviews on Rover
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">Happy Guests</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                See what a day at Snuggles looks like.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-xl relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                View More Photos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-28 bg-stone-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-6">About Snuggles</h2>
                <div className="space-y-4 text-stone-600">
                  <p>
                    Located on a beautiful farm in Melbourne, Florida, Snuggles Pet Boarding was born from a
                    simple belief: pets deserve better than traditional kennels.
                  </p>
                  <p>
                    Here, your furry (or feathered!) family members get to experience life on a real farm.
                    They&apos;ll explore open fields, make new friends, and enjoy the kind of freedom that only nature
                    can provide.
                  </p>
                  <p>
                    We&apos;re not just pet sitters - we&apos;re animal lovers who treat every guest like part of our
                    own family. From daily photo updates to personalized care, we go above and beyond to make
                    sure your pet has the time of their life.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/two-dogs-sitting.jpg"
                    alt="Happy dogs at Snuggles Pet Boarding"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">Get In Touch</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Ready to give your pet the farm vacation they deserve? Schedule a meet & greet or send us a
                message.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg text-stone-800 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/19549077750?text=Hi%2C%20I%20was%20on%20Snuggles%20site%2C%20really%20interested%20in%20knowing%20more.%20Can%20we%20talk%20through%20here%3F"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-stone-600 hover:text-primary-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <WhatsAppIcon />
                      </div>
                      <span>WhatsApp: {SITE_CONFIG.phone}</span>
                    </a>
                    <a
                      href="mailto:snugglespetboarding@gmail.com"
                      className="flex items-center gap-3 text-stone-600 hover:text-primary-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <EmailIcon />
                      </div>
                      <span>snugglespetboarding@gmail.com</span>
                    </a>
                    <a
                      href="https://maps.google.com/?q=4253+Pinewood+Rd+Melbourne+FL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-stone-600 hover:text-primary-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <LocationIcon />
                      </div>
                      <span>
                        4253 Pinewood Rd
                        <br />
                        Melbourne, FL
                      </span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-stone-800 mb-4">Hours</h3>
                  <div className="space-y-2 text-stone-600">
                    <div className="flex items-center gap-2">
                      <span>Business Hours:</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <p className="text-sm text-stone-500">
                      Early drop-off or late pick-up available (+$10/hour)
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-stone-800 mb-4">Schedule a Visit</h3>
                  <a
                    href={SITE_CONFIG.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    <CalendarIcon />
                    Book Meet & Greet
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1759.5!2d-80.7073!3d28.1536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88de124b4c8f8e8f%3A0x8c8c8c8c8c8c8c8c!2s4253+Pinewood+Rd%2C+Melbourne%2C+FL!5e1!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Snuggles Pet Boarding - 4253 Pinewood Rd, Melbourne, FL"
                  className="w-full h-full min-h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Helper Components
function ServiceCard({
  icon,
  title,
  items,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  items: { service: string; price: string }[];
  features: string[];
}) {
  return (
    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 hover:border-primary-300 transition-colors">
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-stone-800 mb-4">{title}</h3>

      <div className="space-y-4 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-baseline justify-between">
            <span className="text-stone-600">{item.service}</span>
            <span className="font-bold text-primary-700">{item.price}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-stone-200">
        <ul className="space-y-1 text-sm text-stone-500">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-stone-800 mb-2">{title}</h3>
      <p className="text-stone-600 text-sm">{description}</p>
    </div>
  );
}

function TestimonialCard({ text, name, detail }: { text: string; name: string; detail: string }) {
  return (
    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
      <div className="flex items-center gap-1 mb-4">
        <FiveStars />
      </div>
      <p className="text-stone-600 text-sm mb-4 line-clamp-5">&quot;{text}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-primary-700 font-semibold">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium text-stone-800">{name}</p>
          <p className="text-xs text-stone-500">{detail}</p>
        </div>
      </div>
    </div>
  );
}

// Icons
function DogIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121" />
    </svg>
  );
}

function CatIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function StarIcon2() {
  return (
    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
