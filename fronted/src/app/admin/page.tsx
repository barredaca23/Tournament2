'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrophyIcon, GamepadIcon } from 'lucide-react'

import axiosInstance from '../axiosInstance';
import {useUser} from "@/context/usercontext";
import {useRouter} from "next/navigation"; // Asegúrate de que este archivo esté configurado correctamente

export default function AdminPage() {
  const [tournamentsCount, setTournamentsCount] = useState<number | null>(null);
  const [gamesCount, setGamesCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useUser(); // Obtén el usuario del contexto
  const router = useRouter();

  useEffect(() => {
    // Obtener el conteo de torneos
    axiosInstance.get('/tournaments/count')
        .then(({ data }) => setTournamentsCount(parseInt(data.count, 10)))
        .catch(error => {
          console.error('Error al obtener el conteo de torneos:', error);
          setError('Error al obtener el conteo de torneos');
        });

    // Obtener el conteo de juegos
    axiosInstance.get('/games/count')
        .then(({ data }) => setGamesCount(parseInt(data.count, 10)))
        .catch(error => {
          console.error('Error al obtener el conteo de juegos:', error);
          setError('Error al obtener el conteo de juegos');
        });
  }, []);
  const handleLogout = () => {
    setUser(null); // Elimina el usuario del contexto
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    localStorage.removeItem("userId"); // Elimina el ID del usuario
    router.push("/login"); // Redirige al usuario al login
  };

  return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Torneos Activos</CardTitle>
              <TrophyIcon className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tournamentsCount !== null ? tournamentsCount : 'Cargando...'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Juegos Registrados</CardTitle>
              <GamepadIcon className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gamesCount !== null ? gamesCount : 'Cargando...'}</div>
            </CardContent>
          </Card>
          {/* Agrega más cards si es necesario */}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Torneos</CardTitle>
              <CardDescription>Administra los torneos activos y crea nuevos eventos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/admin/tournaments">
                  <TrophyIcon className="mr-2 h-4 w-4"/> Ver Torneos
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Juegos</CardTitle>
              <CardDescription>Administra los juegos disponibles y añade nuevos títulos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/admin/games">
                  <GamepadIcon className="mr-2 h-4 w-4"/> Ver Juegos
                </Link>
              </Button>
            </CardContent>
          </Card>
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
        </div>
      </div>
  );
}