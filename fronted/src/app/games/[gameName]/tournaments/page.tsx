// src/app/games/[gameName]/tournaments/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../axiosInstance';
import TournamentCard from '../../../components/TournamentCard';
import { useParams } from 'next/navigation';

const TournamentsByGame: React.FC = () => {
  const { gameName } = useParams();
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`/games/${gameName}/tournaments`);
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments by game', error);
      }
    };

    fetchTournaments();
  }, [gameName]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Torneos de {gameName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default TournamentsByGame;
