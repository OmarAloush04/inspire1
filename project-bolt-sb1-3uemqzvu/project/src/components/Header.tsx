import React from 'react';
import { Dumbbell, User, LogOut, Calendar, Database, Users, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  user: any;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Header({ user, activeView, setActiveView }: HeaderProps) {
  const { logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'workout-builder', label: 'Workout Builder', icon: PlusCircle },
    { id: 'exercise-database', label: 'Exercise Database', icon: Database },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="/inspire-gym-logo.png" 
              alt="Inspire Gym Logo" 
              className="h-10 w-auto"
              onError={(e) => {
                // Fallback to dumbbell icon if logo fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <Dumbbell className="h-8 w-8 text-yellow-500 hidden" />
            <div>
              <h1 className="text-xl font-bold">Inspire Gym</h1>
              <p className="text-xs text-yellow-400 font-medium">YOU ONLY LIVE ONCE</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeView === id 
                    ? 'bg-yellow-500 text-black font-medium' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-center py-2">
        <p className="text-sm text-gray-300">
          <span className="text-yellow-400 font-medium">Inspire Gym</span> - Classes: Saturday to Thursday at 11:00 AM and 6:00 PM
        </p>
      </div>
    </header>
  );
}