import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'See our happy guests enjoying farm life at Snuggles Pet Boarding in Melbourne, FL. Dogs running, playing, and living their best lives.',
};

const galleryImages = [
  { src: '/images/dogs-running-trail.jpg', alt: 'Two happy dogs running on farm trail' },
  { src: '/images/poodle-puppy.jpg', alt: 'Cute poodle puppy on the grass' },
  { src: '/images/pointers-running.jpg', alt: 'Two pointer dogs running together' },
  { src: '/images/pomeranian-black.jpg', alt: 'Black pomeranian enjoying the outdoors' },
  { src: '/images/labrador-ball.jpg', alt: 'Labrador playing with ball at sunset' },
  { src: '/images/bulldog-smiling.jpg', alt: 'Happy bulldog smiling by the pond' },
  { src: '/images/bulldog-sitting.jpg', alt: 'Bulldog sitting peacefully' },
  { src: '/images/chihuahua-bed.jpg', alt: 'Chihuahua relaxing in bed' },
  { src: '/images/yorkie-indoor.jpg', alt: 'Yorkshire terrier indoors' },
  { src: '/images/poodle-garden.jpg', alt: 'Poodle in the garden' },
  { src: '/images/shepherd-frisbee.jpg', alt: 'German shepherd catching frisbee' },
  { src: '/images/shepherd-water.jpg', alt: 'German shepherd playing in water' },
  { src: '/images/shih-tzu-grass.jpg', alt: 'Shih Tzu on the grass' },
  { src: '/images/golden-water-collage.jpg', alt: 'Golden retriever enjoying water' },
  { src: '/images/dog-porch.jpg', alt: 'Dog relaxing on the porch' },
  { src: '/images/two-dogs-sitting.jpg', alt: 'Two dogs sitting together' },
  { src: '/images/dog-06.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-07.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-08.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-09.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-10.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-11.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-12.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-13.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-14.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-15.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-16.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-17.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-18.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-19.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-20.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-21.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-22.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-23.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-24.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-25.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-26.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-27.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-28.jpg', alt: 'Happy guest at Snuggles' },
  { src: '/images/dog-29.jpg', alt: 'Happy guest at Snuggles' },
];

export default function GalleryPage() {
  return (
    <>
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="bg-primary-50 py-12 mb-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">Photo Gallery</h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              See what a stay at Snuggles looks like. Our guests enjoy open fields, trail walks, water play, and plenty of new friends.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-xl bg-stone-100 relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={index < 8 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 mt-16 text-center">
          <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Ready for Your Pet&apos;s Farm Vacation?
            </h2>
            <p className="text-primary-100 mb-8">
              Your furry friend could be our next happy guest. Book a stay or schedule a meet & greet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-white text-primary-700 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Book Now
              </Link>
              <a
                href={SITE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-primary-500"
              >
                Schedule Meet & Greet
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
