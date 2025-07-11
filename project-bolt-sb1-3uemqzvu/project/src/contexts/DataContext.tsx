import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl?: string;
}

interface ProgramExercise {
  id: string;
  name: string;
  intensity: number;
  sets: number;
  reps: number;
  rest: number;
  trainingSystem: string;
  notes: string;
}

interface DaySchedule {
  day: string;
  type: string;
  exercises: ProgramExercise[];
}

interface Program {
  id: string;
  name: string;
  clientId: string;
  weeklySchedule: DaySchedule[];
  createdAt: string;
  updatedAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  medicalHistory?: string;
  notes?: string;
}

interface DataContextType {
  exercises: Exercise[];
  programs: Program[];
  clients: Client[];
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Exercise) => void;
  deleteExercise: (id: string) => void;
  addProgram: (program: Program) => void;
  updateProgram: (id: string, program: Program) => void;
  deleteProgram: (id: string) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Client) => void;
  deleteClient: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [exercises, setExercises] = useState<Exercise[]>([
    // Push exercises
    { id: '1', name: 'Push-ups', muscleGroup: 'Chest', equipment: 'Bodyweight', description: 'Classic push-up exercise', difficulty: 'Beginner' },
    { id: '2', name: 'Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', description: 'Barbell bench press', difficulty: 'Intermediate' },
    { id: '3', name: 'Dumbbell Press', muscleGroup: 'Chest', equipment: 'Dumbbells', description: 'Dumbbell chest press', difficulty: 'Intermediate' },
    { id: '4', name: 'Shoulder Press', muscleGroup: 'Shoulders', equipment: 'Dumbbells', description: 'Overhead shoulder press', difficulty: 'Intermediate' },
    { id: '5', name: 'Tricep Dips', muscleGroup: 'Arms', equipment: 'Bodyweight', description: 'Tricep dips on bench', difficulty: 'Beginner' },
    { id: '6', name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: 'Barbell', description: 'Standing overhead press', difficulty: 'Intermediate' },
    
    // Pull exercises
    { id: '7', name: 'Pull-ups', muscleGroup: 'Back', equipment: 'Pull-up Bar', description: 'Classic pull-up exercise', difficulty: 'Intermediate' },
    { id: '8', name: 'Lat Pulldown', muscleGroup: 'Back', equipment: 'Cable Machine', description: 'Lat pulldown exercise', difficulty: 'Beginner' },
    { id: '9', name: 'Bent-over Row', muscleGroup: 'Back', equipment: 'Barbell', description: 'Bent-over barbell row', difficulty: 'Intermediate' },
    { id: '10', name: 'Dumbbell Row', muscleGroup: 'Back', equipment: 'Dumbbells', description: 'Single-arm dumbbell row', difficulty: 'Beginner' },
    { id: '11', name: 'Bicep Curls', muscleGroup: 'Arms', equipment: 'Dumbbells', description: 'Basic bicep curls', difficulty: 'Beginner' },
    { id: '12', name: 'Face Pulls', muscleGroup: 'Shoulders', equipment: 'Cable Machine', description: 'Rear delt face pulls', difficulty: 'Intermediate' },
    
    // Lower body exercises
    { id: '13', name: 'Squats', muscleGroup: 'Legs', equipment: 'Bodyweight', description: 'Bodyweight squats', difficulty: 'Beginner' },
    { id: '14', name: 'Deadlifts', muscleGroup: 'Legs', equipment: 'Barbell', description: 'Conventional deadlift', difficulty: 'Advanced' },
    { id: '15', name: 'Lunges', muscleGroup: 'Legs', equipment: 'Bodyweight', description: 'Walking lunges', difficulty: 'Beginner' },
    { id: '16', name: 'Hip Thrusts', muscleGroup: 'Glutes', equipment: 'Barbell', description: 'Barbell hip thrusts', difficulty: 'Intermediate' },
    { id: '17', name: 'Calf Raises', muscleGroup: 'Legs', equipment: 'Bodyweight', description: 'Standing calf raises', difficulty: 'Beginner' },
    
    // Core exercises
    { id: '18', name: 'Plank', muscleGroup: 'Core', equipment: 'Bodyweight', description: 'Standard plank hold', difficulty: 'Beginner' },
    { id: '19', name: 'Crunches', muscleGroup: 'Core', equipment: 'Bodyweight', description: 'Basic crunches', difficulty: 'Beginner' },
    { id: '20', name: 'Russian Twists', muscleGroup: 'Core', equipment: 'Bodyweight', description: 'Russian twist exercise', difficulty: 'Intermediate' },
    { id: '21', name: 'Mountain Climbers', muscleGroup: 'Core', equipment: 'Bodyweight', description: 'Mountain climber exercise', difficulty: 'Intermediate' },
    { id: '22', name: 'Dead Bug', muscleGroup: 'Core', equipment: 'Bodyweight', description: 'Dead bug core exercise', difficulty: 'Beginner' },
    
    // Cardio exercises
    { id: '23', name: 'Treadmill', muscleGroup: 'Cardio', equipment: 'Treadmill', description: 'Treadmill cardio', difficulty: 'Beginner' },
    { id: '24', name: 'Burpees', muscleGroup: 'Cardio', equipment: 'Bodyweight', description: 'Full body burpees', difficulty: 'Intermediate' },
    { id: '25', name: 'Jumping Jacks', muscleGroup: 'Cardio', equipment: 'Bodyweight', description: 'Jumping jacks', difficulty: 'Beginner' },
    { id: '26', name: 'High Knees', muscleGroup: 'Cardio', equipment: 'Bodyweight', description: 'High knee running', difficulty: 'Beginner' },
    
    // Dynamic/Stretch exercises
    { id: '27', name: 'Arm Circles', muscleGroup: 'Shoulders', equipment: 'Bodyweight', description: 'Arm circle warm-up', difficulty: 'Beginner' },
    { id: '28', name: 'Leg Swings', muscleGroup: 'Legs', equipment: 'Bodyweight', description: 'Dynamic leg swings', difficulty: 'Beginner' },
    { id: '29', name: 'Hip Circles', muscleGroup: 'Legs', equipment: 'Bodyweight', description: 'Hip circle mobility', difficulty: 'Beginner' },
    { id: '30', name: 'Cat-Cow Stretch', muscleGroup: 'Back', equipment: 'Bodyweight', description: 'Cat-cow spine mobility', difficulty: 'Beginner' },
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed@email.com',
      phone: '+20 123 456 7890',
      medicalHistory: 'No significant medical history',
      notes: 'Beginner client, focus on form'
    },
    {
      id: '2',
      name: 'Sara Mohamed',
      email: 'sara@email.com',
      phone: '+20 123 456 7891',
      medicalHistory: 'Previous knee injury - avoid high impact',
      notes: 'Advanced client, can handle complex movements'
    },
    {
      id: '3',
      name: 'Omar Ali',
      email: 'omar@email.com',
      phone: '+20 123 456 7892',
      medicalHistory: 'None',
      notes: 'Intermediate client, goal is weight loss'
    },
    {
      id: '4',
      name: 'Fatima Nasser',
      email: 'fatima@email.com',
      phone: '+20 123 456 7893',
      medicalHistory: 'Lower back pain - careful with deadlifts',
      notes: 'Focus on core strengthening'
    },
    {
      id: '5',
      name: 'Khaled Ibrahim',
      email: 'khaled@email.com',
      phone: '+20 123 456 7894',
      medicalHistory: 'None',
      notes: 'Bodybuilding goals, advanced training'
    }
  ]);

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'Beginner Full Body',
      clientId: '1',
      weeklySchedule: [
        {
          day: 'Day 1',
          type: 'Push',
          exercises: [
            { id: '1', name: 'Push-ups', intensity: 60, sets: 3, reps: 12, rest: 60, trainingSystem: 'Single', notes: '' },
            { id: '2', name: 'Shoulder Press', intensity: 65, sets: 3, reps: 10, rest: 60, trainingSystem: 'Single', notes: '' },
            { id: '3', name: 'Tricep Dips', intensity: 70, sets: 3, reps: 8, rest: 60, trainingSystem: 'Single', notes: '' },
          ]
        },
        {
          day: 'Day 2',
          type: 'Cardio',
          exercises: [
            { id: '4', name: 'Treadmill', intensity: 60, sets: 1, reps: 30, rest: 0, trainingSystem: 'Single', notes: '30 minutes steady state' },
            { id: '5', name: 'Jumping Jacks', intensity: 65, sets: 3, reps: 20, rest: 30, trainingSystem: 'Circuit', notes: '' },
          ]
        },
        {
          day: 'Day 3',
          type: 'Pull',
          exercises: [
            { id: '6', name: 'Lat Pulldown', intensity: 65, sets: 3, reps: 12, rest: 60, trainingSystem: 'Single', notes: '' },
            { id: '7', name: 'Dumbbell Row', intensity: 70, sets: 3, reps: 10, rest: 60, trainingSystem: 'Single', notes: '' },
            { id: '8', name: 'Bicep Curls', intensity: 65, sets: 3, reps: 12, rest: 45, trainingSystem: 'Single', notes: '' },
          ]
        },
        {
          day: 'Day 4',
          type: 'Rest',
          exercises: []
        },
        {
          day: 'Day 5',
          type: 'Core',
          exercises: [
            { id: '9', name: 'Plank', intensity: 70, sets: 3, reps: 30, rest: 45, trainingSystem: 'Single', notes: '30 second holds' },
            { id: '10', name: 'Crunches', intensity: 65, sets: 3, reps: 15, rest: 30, trainingSystem: 'Circuit', notes: '' },
            { id: '11', name: 'Russian Twists', intensity: 60, sets: 3, reps: 20, rest: 30, trainingSystem: 'Circuit', notes: '' },
          ]
        },
        {
          day: 'Day 6',
          type: 'Rest',
          exercises: []
        },
        {
          day: 'Day 7',
          type: 'Lower',
          exercises: [
            { id: '12', name: 'Squats', intensity: 65, sets: 3, reps: 15, rest: 60, trainingSystem: 'Single', notes: '' },
            { id: '13', name: 'Lunges', intensity: 60, sets: 3, reps: 12, rest: 45, trainingSystem: 'Single', notes: 'Each leg' },
            { id: '14', name: 'Calf Raises', intensity: 70, sets: 3, reps: 20, rest: 30, trainingSystem: 'Single', notes: '' },
          ]
        },
      ],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Advanced Strength',
      clientId: '5',
      weeklySchedule: [
        {
          day: 'Day 1',
          type: 'Push',
          exercises: [
            { id: '15', name: 'Bench Press', intensity: 85, sets: 4, reps: 6, rest: 120, trainingSystem: 'Single', notes: '' },
            { id: '16', name: 'Overhead Press', intensity: 80, sets: 4, reps: 8, rest: 90, trainingSystem: 'Single', notes: '' },
            { id: '17', name: 'Dumbbell Press', intensity: 75, sets: 3, reps: 10, rest: 60, trainingSystem: 'Superset', notes: '' },
          ]
        },
        {
          day: 'Day 2',
          type: 'Cardio',
          exercises: [
            { id: '18', name: 'Burpees', intensity: 80, sets: 4, reps: 10, rest: 60, trainingSystem: 'Circuit', notes: '' },
            { id: '19', name: 'High Knees', intensity: 75, sets: 3, reps: 30, rest: 45, trainingSystem: 'Circuit', notes: '' },
          ]
        },
        {
          day: 'Day 3',
          type: 'Pull',
          exercises: [
            { id: '20', name: 'Pull-ups', intensity: 85, sets: 4, reps: 8, rest: 90, trainingSystem: 'Single', notes: '' },
            { id: '21', name: 'Bent-over Row', intensity: 80, sets: 4, reps: 6, rest: 120, trainingSystem: 'Single', notes: '' },
            { id: '22', name: 'Face Pulls', intensity: 70, sets: 3, reps: 15, rest: 45, trainingSystem: 'Superset', notes: '' },
          ]
        },
        {
          day: 'Day 4',
          type: 'Rest',
          exercises: []
        },
        {
          day: 'Day 5',
          type: 'Core',
          exercises: [
            { id: '23', name: 'Plank', intensity: 85, sets: 4, reps: 45, rest: 60, trainingSystem: 'Single', notes: '45 second holds' },
            { id: '24', name: 'Mountain Climbers', intensity: 80, sets: 4, reps: 20, rest: 45, trainingSystem: 'Circuit', notes: '' },
            { id: '25', name: 'Dead Bug', intensity: 75, sets: 3, reps: 12, rest: 30, trainingSystem: 'Circuit', notes: 'Each side' },
          ]
        },
        {
          day: 'Day 6',
          type: 'Rest',
          exercises: []
        },
        {
          day: 'Day 7',
          type: 'Lower',
          exercises: [
            { id: '26', name: 'Deadlifts', intensity: 85, sets: 4, reps: 5, rest: 150, trainingSystem: 'Single', notes: '' },
            { id: '27', name: 'Squats', intensity: 80, sets: 4, reps: 8, rest: 120, trainingSystem: 'Single', notes: '' },
            { id: '28', name: 'Hip Thrusts', intensity: 75, sets: 3, reps: 12, rest: 60, trainingSystem: 'Single', notes: '' },
          ]
        },
      ],
      createdAt: '2024-01-20T14:30:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    }
  ]);

  const addExercise = (exercise: Exercise) => {
    setExercises(prev => [...prev, exercise]);
  };

  const updateExercise = (id: string, updatedExercise: Exercise) => {
    setExercises(prev => prev.map(ex => ex.id === id ? updatedExercise : ex));
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const addProgram = (program: Program) => {
    setPrograms(prev => [...prev, program]);
  };

  const updateProgram = (id: string, updatedProgram: Program) => {
    setPrograms(prev => prev.map(prog => prog.id === id ? updatedProgram : prog));
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(prog => prog.id !== id));
  };

  const addClient = (client: Client) => {
    setClients(prev => [...prev, client]);
  };

  const updateClient = (id: string, updatedClient: Client) => {
    setClients(prev => prev.map(cli => cli.id === id ? updatedClient : cli));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(cli => cli.id !== id));
  };

  return (
    <DataContext.Provider value={{
      exercises,
      programs,
      clients,
      addExercise,
      updateExercise,
      deleteExercise,
      addProgram,
      updateProgram,
      deleteProgram,
      addClient,
      updateClient,
      deleteClient,
    }}>
      {children}
    </DataContext.Provider>
  );
}