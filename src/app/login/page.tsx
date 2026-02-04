'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuthToken, getGoogleAuthUrl, fetchUser } from '@/lib/api';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Get redirect URL from query params (e.g., /login?redirect=/book)
  const redirectUrl = searchParams.get('redirect') || '/my-account';

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          await fetchUser();
          router.push(redirectUrl);
          return;
        } catch {
          // Token invalid, continue to login
        }
      }
      setChecking(false);
    };

    checkAuth();
  }, [router, redirectUrl]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Store redirect URL for after OAuth callback
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('login_redirect', redirectUrl);
      }
      const url = await getGoogleAuthUrl();
      window.location.href = url;
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to initiate login');
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Checking login status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/images/logo-expanded.svg"
              alt="Snuggles Pet Boarding"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-2xl font-bold text-stone-800">
            {redirectUrl === '/book' ? 'Sign In to Book' : 'Welcome Back'}
          </h1>
          <p className="text-stone-600 mt-2">
            {redirectUrl === '/book'
              ? 'Please sign in to continue with your booking'
              : 'Sign in to manage your bookings and pets'}
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-stone-300 rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-400 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-500">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 text-center">
          <p className="text-sm text-stone-600">
            Don&apos;t have an account? No problem!
            <br />
            <span className="text-stone-500">Signing in with Google will create one for you.</span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-stone-600">Signing in...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-stone-600">Loading...</p>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
