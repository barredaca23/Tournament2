'use client';
import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useRouter } from 'next/navigation';

export default function CreateTournamentPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    max_players: '',
    game_name: '',
    cover_image_url: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance.post('/tournaments', form)
      .then(() => router.push('/admin/tournaments'))
      .catch(error => console.error('Error al crear torneo:', error));
  };

  return (
    <div>
      <h2>Crear Torneo</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" onChange={handleChange} />
        <input name="start_date" placeholder="Fecha inicio" type="datetime-local" onChange={handleChange} />
        <input name="end_date" placeholder="Fecha fin" type="datetime-local" onChange={handleChange} />
        <input name="max_players" placeholder="Máx. jugadores" type="number" onChange={handleChange} />
        <input name="game_name" placeholder="Nombre del juego" onChange={handleChange} />
        <input name="cover_image_url" placeholder="URL imagen" onChange={handleChange} />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
