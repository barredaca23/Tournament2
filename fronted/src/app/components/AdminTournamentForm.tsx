// src/app/components/AdminTournamentForm.tsx
"use client" 
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const AdminTournamentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [gameName, setGameName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTournament = { name, game_name: gameName, start_date: startDate, end_date: endDate };

    try {
      await axiosInstance.post('/', newTournament);
      alert('Torneo creado con éxito!');
      // Opcional: Redirigir o limpiar el formulario
    } catch (error) {
      console.error('Error al crear torneo:', error);
      alert('Error al crear torneo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">Crear Torneo</h2>
      <div className="mb-2">
        <label htmlFor="name" className="block">Nombre del Torneo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="gameName" className="block">Nombre del Juego</label>
        <input
          type="text"
          id="gameName"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="startDate" className="block">Fecha de Inicio</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block">Fecha de Fin</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Crear Torneo</button>
    </form>
  );
};

export default AdminTournamentForm;
