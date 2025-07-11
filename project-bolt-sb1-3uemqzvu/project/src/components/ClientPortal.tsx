import React, { useState } from 'react';
import { CheckCircle, Circle, Printer, ArrowLeft } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface ClientPortalProps {
  clientId: string | null;
}

export function ClientPortal({ clientId }: ClientPortalProps) {
  const { clients, programs, exercises } = useData();
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  
  const client = clients.find(c => c.id === clientId);
  const clientPrograms = programs.filter(p => p.clientId === clientId);

  const getExerciseImage = (exerciseName: string) => {
    const exercise = exercises.find(ex => ex.name === exerciseName);
    return exercise?.imageUrl;
  };
  const toggleExerciseCompletion = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const printWorkout = () => {
    window.print();
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
            Client Portal - {client.name}
          </h2>
          <div className="flex space-x-3">
            <button
              onClick={printWorkout}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Print Workout</span>
            </button>
          </div>
        </div>

        {clientPrograms.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No active programs assigned</p>
          </div>
        ) : (
          <div className="space-y-8">
            {clientPrograms.map(program => (
              <div key={program.id} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{program.name}</h3>
                
                <div className="space-y-6">
                  {program.weeklySchedule.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {day.day} - {day.type}
                        </h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          day.type === 'Rest' 
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {day.type}
                        </div>
                      </div>
                      
                      {day.type !== 'Rest' && day.exercises.length > 0 && (
                        <div className="space-y-3">
                          {day.exercises.map((exercise, exerciseIndex) => {
                            const exerciseKey = `${program.id}-${dayIndex}-${exerciseIndex}`;
                            const isCompleted = completedExercises.has(exerciseKey);
                            
                            return (
                              <div
                                key={exerciseIndex}
                                className={`flex items-center space-x-4 p-3 rounded-lg border transition-colors ${
                                  isCompleted 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-white border-gray-200'
                                }`}
                              >
                                <button
                                  onClick={() => toggleExerciseCompletion(exerciseKey)}
                                  className="flex-shrink-0"
                                >
                                  {isCompleted ? (
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                  ) : (
                                    <Circle className="h-6 w-6 text-gray-400" />
                                  )}
                                </button>
                                
                                {getExerciseImage(exercise.name) && (
                                  <img 
                                    src={getExerciseImage(exercise.name)} 
                                    alt={exercise.name}
                                    className="w-12 h-12 object-cover rounded flex-shrink-0"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                )}
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h5 className={`font-medium ${
                                      isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                                    }`}>
                                      {exercise.name || 'Exercise'}
                                    </h5>
                                    <span className={`text-sm ${
                                      isCompleted ? 'text-green-600' : 'text-gray-500'
                                    }`}>
                                      {exercise.trainingSystem}
                                    </span>
                                  </div>
                                  
                                  <div className="mt-1 text-sm text-gray-600">
                                    <span className="mr-4">
                                      {exercise.sets} sets × {exercise.reps} reps
                                    </span>
                                    <span className="mr-4">
                                      {exercise.intensity}% intensity
                                    </span>
                                    <span>
                                      {exercise.rest}s rest
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {day.type !== 'Rest' && day.exercises.length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                          No exercises scheduled for this day
                        </p>
                      )}
                      
                      {day.type === 'Rest' && (
                        <div className="text-center py-8">
                          <p className="text-lg text-gray-600">Rest Day</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Take this day to recover and prepare for your next workout
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}