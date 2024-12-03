// src/app/components/TournamentCard.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { CalendarIcon, GamepadIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation' // Importa useRouter

interface TournamentCardProps {
  id: number
  name: string
  description: string
  game_name: string
  start_date: string
  cover_image_url: string
}

export default function TournamentCard({
  id,
  name,
  description,
  game_name,
  start_date,
  cover_image_url
}: TournamentCardProps) {
  const router = useRouter(); // Inicializa el router
  const BASE_URL = 'http://localhost:5000/api';
  const handleRegister = async () => {
    try {
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('userId');

      if (!role || !userId) {
        alert('Por favor, inicia sesión para registrarte en un torneo.');
        return;
      }

      const response = await fetch(`${BASE_URL}/tournaments/${id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role }),
      });

      console.log('Respuesta del servidor:', response);

      if (!response.ok) {
        const errorText = await response.text(); // Lee el texto completo de la respuesta
        console.error('Error en la respuesta:', errorText);
        throw new Error('Error al registrarse en el torneo.');
      }

      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error('Error en la solicitud:', err);
      //alert(err.message || 'Error al intentar registrarse en el torneo.');
    }
  };



  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={cover_image_url}
            alt={`Portada del torneo ${name}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold mb-2 truncate">{name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <GamepadIcon className="w-4 h-4 mr-1" />
            <span>{game_name}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{new Date(start_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleRegister}>registrarse</Button> {/* Agregar la lógica de redirección aquí */}
      </CardFooter>
    </Card>
  )
}
