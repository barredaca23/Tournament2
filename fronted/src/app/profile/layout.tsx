'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { TrophyIcon, GamepadIcon } from 'lucide-react'
import {useUser} from "@/context/usercontext";
import {useRouter} from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const { user, setUser } = useUser();
  const router = useRouter();


  // Obtener el username desde localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername); // Guarda el username en el estado
  }, []);

  const handleLogout = () => {
    setUser(null); // Elimina el usuario del contexto
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    localStorage.removeItem("userId"); // Elimina el ID del usuario
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    router.push("/login"); // Redirige al usuario al login
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800 border-b border-purple-600">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link href="/profile" className="text-2xl sm:text-3xl font-bold text-purple-400 mb-4 sm:mb-0">
              Bienvenido{username && ` ${username}`} {/* Mostrar username si está disponible */}
            </Link>
            <nav className="flex space-x-4">
              <Link
                  href="/profile/tournaments"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                <TrophyIcon className="w-5 h-5 mr-1"/>
                Torneos
              </Link>
              <button onClick={handleLogout} style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}>
                Cerrar Sesión
              </button>

            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
