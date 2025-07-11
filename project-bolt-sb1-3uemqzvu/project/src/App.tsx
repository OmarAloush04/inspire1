import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { ExerciseDatabase } from './components/ExerciseDatabase';
import { ClientPortal } from './components/ClientPortal';
import { Calendar } from './components/Calendar';
import { PrintView } from './components/PrintView';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { LoginForm } from './components/LoginForm';

function AppContent() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  if (!user) {
    return <LoginForm />;
  }

  if (activeView === 'print' && selectedProgram) {
    return <PrintView programId={selectedProgram} clientId={selectedClient} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        activeView={activeView} 
        setActiveView={setActiveView}
      />
      
      <main className="container mx-auto px-4 py-8">
        {activeView === 'dashboard' && (
          <Dashboard 
            setActiveView={setActiveView}
            setSelectedClient={setSelectedClient}
            setSelectedProgram={setSelectedProgram}
          />
        )}
        
        {activeView === 'workout-builder' && (
          <WorkoutBuilder 
            clientId={selectedClient}
            setActiveView={setActiveView}
          />
        )}
        
        {activeView === 'exercise-database' && (
          <ExerciseDatabase />
        )}
        
        {activeView === 'client-portal' && (
          <ClientPortal clientId={selectedClient} />
        )}
        
        {activeView === 'calendar' && (
          <Calendar 
            clientId={selectedClient}
            setActiveView={setActiveView}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;