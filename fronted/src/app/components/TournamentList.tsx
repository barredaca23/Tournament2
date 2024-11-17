// src/app/components/TournamentList.tsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import TournamentCard from './TournamentCard';

const TournamentList: React.FC = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('/tournaments');
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments', error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Torneos Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default TournamentList;
