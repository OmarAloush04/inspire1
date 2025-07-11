import React, { useState } from 'react';
import { Dumbbell, User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'trainer' | 'client'>('trainer');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, userType);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img 
              src="/inspire-gym-logo.png" 
              alt="Inspire Gym Logo" 
              className="h-16 w-auto"
              onError={(e) => {
                // Fallback to dumbbell icon if logo fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <Dumbbell className="h-12 w-12 text-yellow-500 hidden" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Inspire Gym
          </h2>
          <p className="mt-2 text-lg font-semibold text-yellow-600">
            YOU ONLY LIVE ONCE
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Gym Program Builder & Tracker
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login as
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setUserType('trainer')}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                    userType === 'trainer'
                      ? 'bg-yellow-500 text-black border-yellow-500 font-medium'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Trainer
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('client')}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                    userType === 'client'
                      ? 'bg-yellow-500 text-black border-yellow-500 font-medium'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Client
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Demo login: trainer@gym.com / client@gym.com (password: demo)
          </p>
        </div>
      </div>
    </div>
  );
}