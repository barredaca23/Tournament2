// src/app/page.tsx
import React from 'react';
import GameList from './components/GameList';
import TournamentList from './components/TournamentList';

const Page: React.FC = () => {
  return (
    <div className="p-6">
      <GameList />
      <TournamentList />
    </div>
  );
};

export default Page;
