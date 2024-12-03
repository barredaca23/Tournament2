"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrophyIcon, GamepadIcon } from 'lucide-react'
import axios from "axios";

import axiosInstance from '../axiosInstance';
import {useUser} from "@/context/usercontext";
import {useRouter} from "next/navigation";
import GameList from "@/app/components/GameList";
import TournamentListRegister from "@/app/components/TournamentListRegister"; // Asegúrate de que este archivo esté configurado correctamente

export default function AdminPage() {
  const [tournamentsCount, setTournamentsCount] = useState<number | null>(null);
  const [gamesCount, setGamesCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useUser(); // Obtén el usuario del contexto
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user || !user.token) {
          const token = localStorage.getItem("token");

          if (!token) {
            router.push("/login"); // Redirige al login si no hay token
            return;
          }

          const response = await axios.get("http://localhost:5000/api/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser({ ...response.data, token });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el perfil", error);
        router.push("/login");
      }
    };

    fetchProfile();
  }, [user, setUser, router]);
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

        <div>
          <GameList />
          <TournamentListRegister />
        </div>
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

  );
}