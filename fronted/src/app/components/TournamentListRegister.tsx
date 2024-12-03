
'use client'

import React, { useEffect, useState } from 'react';

import TournamentCardRegister from './TournamentCardRegister';
import axiosInstance from '../axiosInstance';

const TournamentListRegister: React.FC = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.get('/tournaments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setTournaments(response.data);
      })
      .catch(error => {
        if (error.response?.status === 401) {
          // Redirigir al login si el token es inválido o ha expirado
          window.location.href = '/login';
        } else {
          console.error('Error al obtener torneos:', error);
        }
      });
    } else {
      window.location.href = '/login'; // Redirigir al login si no hay token
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Torneos Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <TournamentCardRegister key={tournament.id} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default TournamentListRegister;

