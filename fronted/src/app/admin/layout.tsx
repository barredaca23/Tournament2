import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
        <h1>Panel de Administración</h1>
        <nav>
          <a href="/admin/tournaments" style={{ margin: '0 1rem', color: '#fff' }}>Torneos</a>
          <a href="/admin/games" style={{ margin: '0 1rem', color: '#fff' }}>Juegos</a>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
