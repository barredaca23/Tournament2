'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, GamepadIcon } from 'lucide-react';

type Participant = {
  user_id: number;
  username: string;
  email: string;
};

type Tournament = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_players: number;
  game_name: string;
  cover_image_url: string;
  participants: Participant[];
};

export default function UserTournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('No se encontró el ID del usuario. Por favor, inicia sesión.');
      router.push('/login');
      return;
    }

    axiosInstance.get(`http://localhost:5000/api/users/${userId}`)
        .then(({ data }) => {
          setTournaments(data.tournaments);
        })
        .catch((error) => {
          console.error('Error al obtener torneos:', error);
          setError('Error al cargar los torneos. Por favor, inténtalo nuevamente.');
        })
        .finally(() => {
          setLoading(false);
        });
  }, [router]);

  if (loading) {
    return <div className="text-center mt-10">Cargando torneos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-purple-600 text-center mb-6">Mis Torneos</h2>
        {tournaments.length === 0 ? (
            <p className="text-center text-gray-500">No estás inscrito en ningún torneo.</p>
        ) : (
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
                    <CardFooter className="p-4">
                      <h3 className="font-semibold mb-2">Participantes</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {tournament.participants.map((participant) => (
                            <li key={participant.user_id}>
                              {participant.username} ({participant.email})
                            </li>
                        ))}
                      </ul>
                    </CardFooter>
                  </Card>
              ))}
            </div>
        )}
      </div>
  );
}
