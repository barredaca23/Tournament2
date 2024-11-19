'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '../../../../axiosInstance';

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

export default function EditTournamentPage() {
  const { id } = useParams(); // Obtenemos el ID desde la URL
  const [tournament, setTournament] = useState<Tournament | null>(null); // Inicializa como null
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get(`/tournaments/${id}`)
      .then(response => {
        setTournament(response.data); // Establece el torneo recibido
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el torneo:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!tournament) return <p>No se encontró el torneo</p>; // Si no existe el torneo

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTournament({ ...tournament, [name]: value }); // Actualiza dinámicamente
  };

  const handleSave = () => {
    axiosInstance.put(`/tournaments/${id}`, tournament)
      .then(() => {
        alert('Torneo actualizado exitosamente');
        router.push('/admin/tournaments');
      })
      .catch(error => console.error('Error al actualizar el torneo:', error));
  };

  return (
    <div>
      <h2>Editar Torneo</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={tournament.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={tournament.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Fecha de Inicio:
          <input
            type="date"
            name="start_date"
            value={tournament.start_date.split('T')[0]}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Fecha de Fin:
          <input
            type="date"
            name="end_date"
            value={tournament.end_date.split('T')[0]}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Juego:
          <input
            type="text"
            name="game_name"
            value={tournament.game_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={handleSave}>Guardar Cambios</button>
      </form>
    </div>
  );
}
