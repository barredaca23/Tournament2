'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '../../../../axiosInstance';

type Game = {
  id: number;
  name: string;
  description: string;
  cover_image_url: string;
};

export default function EditGamePage() {
  const { id } = useParams(); // Obtenemos el ID desde la URL
  const [game, setGame] = useState<Game | null>(null); // Inicializa como null
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`/games/${id}`)
      .then((response) => {
        setGame(response.data); // Establece el juego recibido
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener el juego:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!game) return <p>No se encontró el juego</p>; // Si no existe el juego

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value }); // Actualiza dinámicamente
  };

  const handleSave = () => {
    axiosInstance
      .put(`/games/${id}`, game)
      .then(() => {
        alert('Juego actualizado exitosamente');
        router.push('/admin/games'); // Redirige a la lista de juegos
      })
      .catch((error) => {
        console.error('Error al actualizar el juego:', error);
        alert('Error al actualizar el juego');
      });
  };

  return (
    <div>
      <h2>Editar Juego</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={game.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={game.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          URL de la Imagen:
          <input
            type="text"
            name="cover_image_url"
            value={game.cover_image_url}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={handleSave}>Guardar Cambios</button>
      </form>
    </div>
  );
}
