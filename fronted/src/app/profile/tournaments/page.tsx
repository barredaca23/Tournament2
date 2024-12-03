'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, GamepadIcon, PlusIcon, Trash2Icon, EditIcon } from 'lucide-react';

type Tournament = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_players: number;
  game_name: string;
  cover_image_url: string;
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tournamentsCount, setTournamentsCount] = useState<number | null>(null);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token
    const role = localStorage.getItem('role');
    if (!token && role != 'admin') {
      router.push('/login');
    }

    axiosInstance.get('/admin/tournaments-count')
        .then(({ data }) => setTournamentsCount(parseInt(data.count, 10)))
        .catch(error => {
          if (error.response?.status === 401) {
            alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            router.push('/login');
          } else {
            console.error('Error al obtener el conteo de torneos:', error);
            //setError('Error al obtener el conteo de torneos');
          }
        });
  }, [router]);
  

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este torneo?')) {
      axiosInstance.delete(`/tournaments/${id}`)
        .then(() => {
          setTournaments(tournaments.filter(tournament => tournament.id !== id));
          alert('Torneo eliminado');
        })
        .catch(error => console.error('Error al eliminar torneo:', error));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600">Lista de Torneos</h2>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/admin/tournaments/create">
            <PlusIcon className="w-4 h-4 mr-2" />
            Crear Torneo
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={tournament.cover_image_url || '/placeholder.svg'}
                  alt={`Portada de ${tournament.name}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-bold mb-2">{tournament.name}</CardTitle>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tournament.description}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <GamepadIcon className="w-4 h-4 mr-2" />
                <span>{tournament.game_name}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>
                  {new Date(tournament.start_date).toLocaleDateString()} - 
                  {new Date(tournament.end_date).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 bg-muted">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/tournaments/${tournament.id}/edit`}>
                  <EditIcon className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(tournament.id)}
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
