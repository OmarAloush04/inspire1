import React, { useState, useEffect } from 'react';
import { Plus, Save, ArrowLeft, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface WorkoutBuilderProps {
  clientId: string | null;
  setActiveView: (view: string) => void;
}

export function WorkoutBuilder({ clientId, setActiveView }: WorkoutBuilderProps) {
  const { clients, exercises, addProgram, updateProgram, programs } = useData();
  const [programName, setProgramName] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(clientId || '');
  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: 'Day 1', type: 'Push', exercises: [] },
    { day: 'Day 2', type: 'Cardio', exercises: [] },
    { day: 'Day 3', type: 'Pull', exercises: [] },
    { day: 'Day 4', type: 'Rest', exercises: [] },
    { day: 'Day 5', type: 'Core', exercises: [] },
    { day: 'Day 6', type: 'Rest', exercises: [] },
    { day: 'Day 7', type: 'Lower', exercises: [] },
  ]);

  const workoutTypes = ['Push', 'Pull', 'Core', 'Lower', 'Cardio', 'Dynamic', 'Stretch', 'Rest'];

  const handleAddExercise = (dayIndex: number) => {
    const newExercise = {
      id: Date.now().toString(),
      name: '',
      intensity: 70,
      sets: 3,
      reps: 12,
      rest: 60,
      trainingSystem: 'Single',
      notes: ''
    };
    
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].exercises.push(newExercise);
    setWeeklySchedule(newSchedule);
  };

  const handleRemoveExercise = (dayIndex: number, exerciseIndex: number) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].exercises.splice(exerciseIndex, 1);
    setWeeklySchedule(newSchedule);
  };

  const handleExerciseChange = (dayIndex: number, exerciseIndex: number, field: string, value: any) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].exercises[exerciseIndex][field] = value;
    setWeeklySchedule(newSchedule);
  };

  const handleDayTypeChange = (dayIndex: number, type: string) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].type = type;
    setWeeklySchedule(newSchedule);
  };

  const handleSave = () => {
    if (!programName || !selectedClientId) return;

    const program = {
      id: Date.now().toString(),
      name: programName,
      clientId: selectedClientId,
      weeklySchedule,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addProgram(program);
    setActiveView('dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Workout Program Builder</h2>
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Name
            </label>
            <input
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter program name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Client
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">Choose a client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {weeklySchedule.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{day.day}</h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={day.type}
                    onChange={(e) => handleDayTypeChange(dayIndex, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    {workoutTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAddExercise(dayIndex)}
                    className="flex items-center space-x-2 bg-yellow-500 text-black px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Exercise</span>
                  </button>
                </div>
              </div>

              {day.type !== 'Rest' && (
                <div className="space-y-4">
                  {day.exercises.map((exercise, exerciseIndex) => (
                    <div key={exercise.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-3 mb-2">
                            {exercises.find(ex => ex.name === exercise.name)?.imageUrl && (
                              <img 
                                src={exercises.find(ex => ex.name === exercise.name)?.imageUrl} 
                                alt={exercise.name}
                                className="w-12 h-12 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                            <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Exercise Name
                          </label>
                          <select
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                          >
                            <option value="">Select exercise</option>
                            {exercises.map(ex => (
                              <option key={ex.id} value={ex.name}>{ex.name}</option>
                            ))}
                          </select>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Intensity %
                          </label>
                          <input
                            type="number"
                            value={exercise.intensity}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'intensity', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            min="0"
                            max="100"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sets
                          </label>
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            min="1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reps
                          </label>
                          <input
                            type="number"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'reps', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            min="1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rest (sec)
                          </label>
                          <input
                            type="number"
                            value={exercise.rest}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'rest', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            min="0"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Training System
                          </label>
                          <select
                            value={exercise.trainingSystem}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'trainingSystem', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                          >
                            <option value="Single">Single</option>
                            <option value="Superset">Superset</option>
                            <option value="Circuit">Circuit</option>
                            <option value="Drop Set">Drop Set</option>
                          </select>
                        </div>
                        
                        <div className="flex items-end">
                          <button
                            onClick={() => handleRemoveExercise(dayIndex, exerciseIndex)}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {day.exercises.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No exercises added yet. Click "Add Exercise" to get started.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSave}
            disabled={!programName || !selectedClientId}
            className="flex items-center space-x-2 bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Save className="h-5 w-5" />
            <span>Save Program</span>
          </button>
        </div>
      </div>
    </div>
  );
}