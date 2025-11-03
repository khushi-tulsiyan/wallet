'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function TestAuth() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-900 border border-red-700 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-300 mb-4">Auth0 Error</h2>
          <pre className="text-red-200 text-sm overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
          <a
            href="/api/auth/login"
            className="block mt-4 text-yellow hover:underline"
          >
            Try logging in again
          </a>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-yellow mb-8">Auth0 Test - Success ✅</h1>
          
          <div className="bg-black-light p-6 rounded-lg border border-gray-800 mb-6">
            <h2 className="text-xl font-semibold mb-4">User Session Data</h2>
            <pre className="bg-black p-4 rounded text-sm overflow-auto border border-gray-700">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>

          <div className="bg-black-light p-6 rounded-lg border border-gray-800 mb-6">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Auth0 ID:</span> <span className="text-white">{user.sub}</span></p>
              <p><span className="text-gray-400">Email Verified:</span> <span className="text-white">{user.email_verified ? 'Yes' : 'No'}</span></p>
            </div>
          </div>

          <div className="flex space-x-4">
            <a
              href="/dashboard"
              className="bg-yellow text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-dark transition-colors"
            >
              Go to Dashboard
            </a>
            <a
              href="/api/auth/logout"
              className="border border-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-yellow mb-4">Not Authenticated</h1>
        <p className="text-gray-300 mb-6">Please sign in to test Auth0 flow</p>
        <a
          href="/api/auth/login"
          className="bg-yellow text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-dark transition-colors inline-block"
        >
          Sign In with Auth0
        </a>
      </div>
    </div>
  );
}

