// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/router for navigation

const HomePage = () => {
  const router = useRouter(); // Use Next.js router

  const navigateToLogin = () => {
    router.push('pages/login'); // Navigate to login page
  };

  const navigateToRegister = () => {
    router.push('/register'); // Navigate to register page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a la App</h1>
      <p>Por favor, elige una opción para continuar:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button
          onClick={navigateToLogin}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={navigateToRegister}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default HomePage;


