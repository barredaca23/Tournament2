// src/app/components/GameList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import GameCard from './GameCard';

const GameList: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Juegos Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;

