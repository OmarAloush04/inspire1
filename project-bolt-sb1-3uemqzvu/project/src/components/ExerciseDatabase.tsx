import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export function ExerciseDatabase() {
  const { exercises, addExercise, updateExercise, deleteExercise } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [editingExercise, setEditingExercise] = useState<any>(null);
  const [newExercise, setNewExercise] = useState({
    name: '',
    muscleGroup: '',
    equipment: '',
    description: '',
    difficulty: 'Beginner',
    imageUrl: ''
  });

  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Glutes', 'Cardio', 'Full Body'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === '' || exercise.muscleGroup === selectedMuscleGroup;
    return matchesSearch && matchesMuscleGroup;
  });

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.muscleGroup) {
      addExercise({
        id: Date.now().toString(),
        ...newExercise
      });
      setNewExercise({
        name: '',
        muscleGroup: '',
        equipment: '',
        description: '',
        difficulty: 'Beginner'
      });
      setIsAddingExercise(false);
    }
  };

  const handleUpdateExercise = () => {
    if (editingExercise) {
      updateExercise(editingExercise.id, editingExercise);
      setEditingExercise(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Exercise Database</h2>
          <button
            onClick={() => setIsAddingExercise(true)}
            className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            <span>Add Exercise</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <select
              value={selectedMuscleGroup}
              onChange={(e) => setSelectedMuscleGroup(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">All Muscle Groups</option>
              {muscleGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map(exercise => (
            <div key={exercise.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
              {exercise.imageUrl && (
                <div className="mb-3">
                  <img 
                    src={exercise.imageUrl} 
                    alt={exercise.name}
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                  <p className="text-sm text-gray-600">{exercise.muscleGroup}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingExercise(exercise)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteExercise(exercise.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                {exercise.equipment && (
                  <p><span className="font-medium">Equipment:</span> {exercise.equipment}</p>
                )}
                <p><span className="font-medium">Difficulty:</span> {exercise.difficulty}</p>
                {exercise.description && (
                  <p><span className="font-medium">Description:</span> {exercise.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No exercises found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Exercise Modal */}
      {isAddingExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Exercise</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Muscle Group
                </label>
                <select
                  value={newExercise.muscleGroup}
                  onChange={(e) => setNewExercise({...newExercise, muscleGroup: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="">Select muscle group</option>
                  {muscleGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment
                </label>
                <input
                  type="text"
                  value={newExercise.equipment}
                  onChange={(e) => setNewExercise({...newExercise, equipment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={newExercise.difficulty}
                  onChange={(e) => setNewExercise({...newExercise, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Image URL
                </label>
                <input
                  type="url"
                  value={newExercise.imageUrl}
                  onChange={(e) => setNewExercise({...newExercise, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="https://example.com/exercise-image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddingExercise(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExercise}
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Add Exercise
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Exercise Modal */}
      {editingExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Exercise</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  value={editingExercise.name}
                  onChange={(e) => setEditingExercise({...editingExercise, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Muscle Group
                </label>
                <select
                  value={editingExercise.muscleGroup}
                  onChange={(e) => setEditingExercise({...editingExercise, muscleGroup: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  {muscleGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment
                </label>
                <input
                  type="text"
                  value={editingExercise.equipment}
                  onChange={(e) => setEditingExercise({...editingExercise, equipment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={editingExercise.difficulty}
                  onChange={(e) => setEditingExercise({...editingExercise, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Image URL
                </label>
                <input
                  type="url"
                  value={editingExercise.imageUrl || ''}
                  onChange={(e) => setEditingExercise({...editingExercise, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="https://example.com/exercise-image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingExercise.description}
                  onChange={(e) => setEditingExercise({...editingExercise, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingExercise(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateExercise}
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Update Exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}