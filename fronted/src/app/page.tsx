// src/app/page.tsx
import React from 'react';
import TournamentList from './components/TournamentList';

const Page: React.FC = () => {
  return (
    <div className="p-6">
      <TournamentList />
    </div>
  );
};

export default Page;
