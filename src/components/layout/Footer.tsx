import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-stone-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-sm">
              Where pets roam free. Family-owned pet boarding in Melbourne, Florida.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/#services" className="block text-sm hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/#about" className="block text-sm hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/#contact" className="block text-sm hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/prepare" className="block text-sm hover:text-white transition-colors">
                What to Bring
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Location</h3>
            <p className="text-sm">
              {SITE_CONFIG.address.split(',')[0]}
              <br />
              {SITE_CONFIG.address.split(',')[1]}
              <br />
              <a href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white">
                {SITE_CONFIG.phone}
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-stone-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
