// src/app/admin/torneos/page.tsx
import React from 'react';
import AdminTournamentList from '../../components/AdminTournamentList';
import AdminTournamentForm from '../../components/AdminTournamentForm';

const AdminTournamentsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración de Torneos</h1>

      {/* Componente de formulario para crear torneos */}
      <AdminTournamentForm />

      <hr className="my-6" />

      {/* Componente de listado de torneos */}
      <AdminTournamentList />
    </div>
  );
};

export default AdminTournamentsPage;
