// src/app/components/AdminTournamentList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';  // Asegúrate de que la ruta sea correcta

const AdminTournamentList: React.FC = () => {
  const [tournaments, setTournaments] = useState<any[]>([]); // Estado para almacenar los torneos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  // Llamada a la API para obtener los torneos
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axiosInstance.get('/admin/torneos'); // Esto hará la solicitud al backend
        setTournaments(response.data); // Guardamos los torneos en el estado
        setLoading(false); // Desactivamos el indicador de carga
      } catch (error) {
        setError('Error al obtener torneos'); // Si ocurre un error, lo mostramos
        setLoading(false); // Desactivamos el indicador de carga
        console.error('Error al obtener torneos:', error);
      }
    };

    fetchTournaments();
  }, []); // El array vacío asegura que la llamada se haga solo al montar el componente

  // Mostramos la UI dependiendo del estado
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Lista de Torneos</h2>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id} className="p-4 border-b">
            <h3 className="font-bold">{tournament.name}</h3>
            <p>{tournament.description}</p>
            <p>{tournament.start_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTournamentList;
