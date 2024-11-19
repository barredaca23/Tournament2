'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';

type Game = {
  id: number;
  name: string;
  description: string;
  cover_image_url: string;
};

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get('/games')
      .then(response => setGames(response.data))
      .catch(error => console.error('Error al obtener juegos:', error));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      axiosInstance.delete(`/games/${id}`)
        .then(() => {
          setGames(games.filter(game => game.id !== id)); // Elimina el juego de la lista local
          alert('Juego eliminado');
        })
        .catch(error => console.error('Error al eliminar juego:', error));
    }
  };

  return (
    <div>
      <h2>Lista de Juegos</h2>
      <a href="/admin/games/create">Crear Juego</a>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            {game.cover_image_url && <img src={game.cover_image_url} alt={game.name} style={{ width: '100px' }} />}
            <div>
              <a href={`/admin/games/${game.id}/edit`}>Editar</a>
              <button onClick={() => handleDelete(game.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
