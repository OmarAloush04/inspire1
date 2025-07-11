import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface CalendarProps {
  clientId: string | null;
  setActiveView: (view: string) => void;
}

export function Calendar({ clientId, setActiveView }: CalendarProps) {
  const { clients, programs } = useData();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const client = clients.find(c => c.id === clientId);
  const clientPrograms = programs.filter(p => p.clientId === clientId);

  const getWeekDates = (startDate: Date) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const getWorkoutForDay = (dayIndex: number) => {
    if (clientPrograms.length === 0) return null;
    
    // For now, use the first program
    const program = clientPrograms[0];
    const dayMapping = {
      0: 6, // Sunday -> Day 7
      1: 0, // Monday -> Day 1
      2: 1, // Tuesday -> Day 2
      3: 2, // Wednesday -> Day 3
      4: 3, // Thursday -> Day 4
      5: 4, // Friday -> Day 5
      6: 5, // Saturday -> Day 6
    };
    
    const programDayIndex = dayMapping[dayIndex];
    return program.weeklySchedule[programDayIndex];
  };

  if (!client) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Client not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Calendar - {client.name}
          </h2>
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateWeek('prev')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Week</span>
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900">
            {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {' '}
            {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => navigateWeek('next')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span>Next Week</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDates.map((date, index) => {
            const workout = getWorkoutForDay(index);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`border rounded-lg p-4 min-h-[200px] ${
                  isToday ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-3">
                  <p className="font-semibold text-gray-900">{dayNames[index]}</p>
                  <p className="text-sm text-gray-600">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                
                {workout && (
                  <div className="space-y-2">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      workout.type === 'Rest' 
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {workout.type}
                    </div>
                    
                    {workout.exercises.length > 0 && (
                      <div className="space-y-1">
                        {workout.exercises.slice(0, 3).map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="text-xs text-gray-600">
                            {exercise.name && (
                              <p className="truncate">{exercise.name}</p>
                            )}
                          </div>
                        ))}
                        {workout.exercises.length > 3 && (
                          <p className="text-xs text-gray-500">
                            +{workout.exercises.length - 3} more
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {!workout && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No workout scheduled</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}