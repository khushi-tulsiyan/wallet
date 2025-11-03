'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-yellow">EventWallet</Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-300">{user.name}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="bg-yellow text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-dark transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/api/auth/logout"
                    className="text-gray-400 hover:text-yellow transition-colors"
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <Link
                  href="/api/auth/login"
                  className="bg-yellow text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-dark transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to{' '}
            <span className="text-yellow">EventWallet</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your secure digital wallet for managing funds with ease. 
            Recharge, track, and manage your balance with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/api/auth/login"
              className="bg-yellow text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-dark transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="border border-yellow text-yellow px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow hover:text-black transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-black-light p-6 rounded-lg border border-gray-800">
            <div className="w-12 h-12 bg-yellow rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-300">Safe and secure payment processing with Razorpay integration.</p>
          </div>
          
          <div className="bg-black-light p-6 rounded-lg border border-gray-800">
            <div className="w-12 h-12 bg-yellow rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
            <p className="text-gray-300">Track your balance and transaction history with ease.</p>
          </div>
          
          <div className="bg-black-light p-6 rounded-lg border border-gray-800">
            <div className="w-12 h-12 bg-yellow rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Recharge</h3>
            <p className="text-gray-300">Quickly recharge your wallet with just a few clicks.</p>
          </div>
        </div>
      </div>
    </div>
  );
}




