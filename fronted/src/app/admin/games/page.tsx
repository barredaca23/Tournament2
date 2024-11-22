'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, Trash2Icon, EditIcon, GamepadIcon } from 'lucide-react'

type Game = {
  id: number;
  name: string;
  description: string;
  cover_image_url: string;
};

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get('/games')
      .then(response => setGames(response.data))
      .catch(error => {
        console.error('Error al obtener juegos:', error);
        alert('No se pudieron cargar los juegos. Por favor, intenta de nuevo.');
      });
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      axiosInstance.delete(`/games/${id}`)
        .then(() => {
          setGames(games.filter(game => game.id !== id));
          alert('Juego eliminado');
        })
        .catch(error => {
          console.error('Error al eliminar juego:', error);
          alert('No se pudo eliminar el juego. Por favor, intenta de nuevo.');
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600">Lista de Juegos</h2>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/admin/games/create">
            <PlusIcon className="w-4 h-4 mr-2" />
            Crear Juego
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={game.cover_image_url || '/placeholder.svg'}
                  alt={game.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-bold mb-2 flex items-center">
                <GamepadIcon className="w-5 h-5 mr-2 text-purple-500" />
                {game.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{game.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4 bg-muted">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/games/${game.id}/edit`}>
                  <EditIcon className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(game.id)}
              >
                <Trash2Icon className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}