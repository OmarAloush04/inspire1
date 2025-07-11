import React from 'react';
import { Users, Plus, Calendar, Printer, Edit, Copy, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface DashboardProps {
  setActiveView: (view: string) => void;
  setSelectedClient: (clientId: string | null) => void;
  setSelectedProgram: (programId: string | null) => void;
}

export function Dashboard({ setActiveView, setSelectedClient, setSelectedProgram }: DashboardProps) {
  const { clients, programs, deleteProgram } = useData();

  const handlePrintProgram = (programId: string, clientId: string) => {
    setSelectedProgram(programId);
    setSelectedClient(clientId);
    setActiveView('print');
  };

  const handleEditProgram = (programId: string, clientId: string) => {
    setSelectedProgram(programId);
    setSelectedClient(clientId);
    setActiveView('workout-builder');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-6 w-6 mr-2 text-yellow-500" />
            Client Dashboard
          </h2>
          <button
            onClick={() => setActiveView('workout-builder')}
            className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            <span>New Program</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedClient(client.id);
                      setActiveView('calendar');
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Calendar"
                  >
                    <Calendar className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClient(client.id);
                      setActiveView('client-portal');
                    }}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Client Portal"
                  >
                    <Users className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {client.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {client.phone}
                </p>
                {client.medicalHistory && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Medical:</span> {client.medicalHistory}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Active Programs:</h4>
                {programs.filter(p => p.clientId === client.id).map(program => (
                  <div key={program.id} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div>
                      <p className="font-medium text-sm">{program.name}</p>
                      <p className="text-xs text-gray-600">{program.weeklySchedule.length} days</p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handlePrintProgram(program.id, client.id)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Print Program"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditProgram(program.id, client.id)}
                        className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Edit Program"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {/* TODO: Implement duplicate */}}
                        className="p-1 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                        title="Duplicate Program"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProgram(program.id)}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Program"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {programs.filter(p => p.clientId === client.id).length === 0 && (
                  <p className="text-sm text-gray-500 italic">No active programs</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}