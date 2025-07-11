import React, { useEffect } from 'react';
import { useData } from '../contexts/DataContext';

interface PrintViewProps {
  programId: string | null;
  clientId: string | null;
}

export function PrintView({ programId, clientId }: PrintViewProps) {
  const { clients, programs, exercises } = useData();
  
  const client = clients.find(c => c.id === clientId);
  const program = programs.find(p => p.id === programId);

  const getExerciseImage = (exerciseName: string) => {
    const exercise = exercises.find(ex => ex.name === exerciseName);
    return exercise?.imageUrl;
  };
  useEffect(() => {
    // Auto-print when component mounts
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!client || !program) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Program or client not found</p>
      </div>
    );
  }

  return (
    <div className="print-container max-w-4xl mx-auto p-8 bg-white">
      <style>{`
        @media print {
          body { font-size: 12px; }
          .print-container { padding: 0; margin: 0; max-width: none; }
          .no-print { display: none; }
          .page-break { page-break-before: always; }
        }
      `}</style>
      
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold text-black">Inspire Gym</h1>
        <p className="text-lg font-semibold text-yellow-600 mt-1">YOU ONLY LIVE ONCE</p>
        <p className="text-lg text-gray-700 mt-2">Personal Training Program</p>
        <p className="text-sm text-gray-600 mt-1">
          Inspire Gym - Classes: Saturday to Thursday at 11:00 AM and 6:00 PM
        </p>
      </div>

      {/* Client Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-400 pb-2">
          Client Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
          </div>
          <div>
            <p><strong>Program:</strong> {program.name}</p>
            <p><strong>Created:</strong> {new Date(program.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated:</strong> {new Date(program.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
        {client.medicalHistory && (
          <div className="mt-4">
            <p><strong>Medical History:</strong> {client.medicalHistory}</p>
          </div>
        )}
      </div>

      {/* Weekly Schedule */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-400 pb-2">
          Weekly Schedule
        </h2>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {program.weeklySchedule.map((day, index) => (
            <div key={index} className="text-center border border-gray-300 p-2 rounded">
              <div className="font-semibold text-sm">{day.day}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded ${
                day.type === 'Rest' 
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {day.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Daily Programs */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-400 pb-2">
          Detailed Daily Programs
        </h2>
        
        {program.weeklySchedule.map((day, dayIndex) => (
          <div key={dayIndex} className={`${dayIndex > 0 ? 'page-break' : ''}`}>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-black mb-3 bg-gray-100 p-3 rounded">
                {day.day} - {day.type}
              </h3>
              
              {day.type === 'Rest' ? (
                <div className="text-center py-8 bg-gray-50 rounded">
                  <p className="text-lg text-gray-600 font-medium">Rest Day</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Focus on recovery, hydration, and light stretching
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {day.exercises.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Image</th>
                            <th className="border border-gray-300 p-2 text-left">Exercise</th>
                            <th className="border border-gray-300 p-2 text-center">Sets</th>
                            <th className="border border-gray-300 p-2 text-center">Reps</th>
                            <th className="border border-gray-300 p-2 text-center">Intensity</th>
                            <th className="border border-gray-300 p-2 text-center">Rest</th>
                            <th className="border border-gray-300 p-2 text-center">System</th>
                          </tr>
                        </thead>
                        <tbody>
                          {day.exercises.map((exercise, exerciseIndex) => (
                            <tr key={exerciseIndex} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2">
                                {getExerciseImage(exercise.name) ? (
                                  <img 
                                    src={getExerciseImage(exercise.name)} 
                                    alt={exercise.name}
                                    className="w-16 h-16 object-cover rounded"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                    No Image
                                  </div>
                                )}
                              </td>
                              <td className="border border-gray-300 p-2 font-medium">
                                {exercise.name || 'Exercise'}
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                {exercise.sets}
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                {exercise.reps}
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                {exercise.intensity}%
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                {exercise.rest}s
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                {exercise.trainingSystem}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded">
                      <p className="text-gray-500">No exercises scheduled for this day</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-400 text-center text-sm text-gray-600">
        <p>© Inspire Gym - Personal Training Program</p>
        <p className="text-yellow-600 font-medium">YOU ONLY LIVE ONCE</p>
        <p className="mt-1">Always consult with your trainer before making changes to your program</p>
      </div>
    </div>
  );
}