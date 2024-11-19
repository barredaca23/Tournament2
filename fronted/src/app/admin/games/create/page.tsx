'use client';

import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useRouter } from 'next/navigation';

export default function CreateGamePage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    cover_image_url: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance
      .post('/games', form)
      .then(() => {
        alert('Juego creado exitosamente');
        router.push('/admin/games'); // Redirige a la lista de juegos
      })
      .catch((error) => {
        console.error('Error al crear el juego:', error);
        alert('Error al crear el juego');
      });
  };

  return (
    <div>
      <h2>Crear Juego</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre del Juego" onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" onChange={handleChange} />
        <input name="cover_image_url" placeholder="URL de la imagen" onChange={handleChange} />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
