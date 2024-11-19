'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';

type Tournament = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_players: number;
  game_name: string;
  cover_image_url: string;
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get('/tournaments')
      .then(response => setTournaments(response.data))
      .catch(error => console.error('Error al obtener torneos:', error));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este torneo?')) {
      axiosInstance.delete(`/tournaments/${id}`)
        .then(() => {
          setTournaments(tournaments.filter(tournament => tournament.id !== id)); // Elimina el torneo de la lista local
          alert('Torneo eliminado');
        })
        .catch(error => console.error('Error al eliminar torneo:', error));
    }
  };

  return (
    <div>
      <h2>Lista de Torneos</h2>
      <a href="/admin/tournaments/create">Crear Torneo</a>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            <h3>{tournament.name}</h3>
            <p>{tournament.description}</p>
            <a href={`/admin/tournaments/${tournament.id}/edit`}>Editar</a>
            <button onClick={() => handleDelete(tournament.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
