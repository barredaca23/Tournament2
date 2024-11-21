'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '../../../../axiosInstance';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { UploadIcon, Loader2 } from 'lucide-react'

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

export default function EditTournamentPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get(`/tournaments/${id}`)
      .then(response => {
        setTournament(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el torneo:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    </div>
  );
  if (!tournament) return <p className="text-center text-red-500">No se encontró el torneo</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTournament((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setTournament((prev) => 
        prev ? { ...prev, cover_image_url: response.data.url } : null
      );
    } catch (error) {
      console.error('Error al subir imagen:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!tournament) return;

    axiosInstance.put(`/tournaments/${id}`, tournament)
      .then(() => {
        alert('Torneo actualizado exitosamente');
        router.push('/admin/tournaments');
      })
      .catch(error => console.error('Error al actualizar el torneo:', error));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-400">Editar Torneo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={tournament.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={tournament.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Fecha de Inicio</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={tournament.start_date.split('T')[0]}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Fecha de Fin</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={tournament.end_date.split('T')[0]}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="game_name">Juego</Label>
            <Input
              id="game_name"
              name="game_name"
              value={tournament.game_name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Imagen de Portada</Label>
            <div className="flex items-center space-x-2">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              <Button type="button" onClick={handleImageUpload} disabled={uploading}>
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadIcon className="w-4 h-4 mr-2" />}
                {uploading ? 'Subiendo...' : 'Subir'}
              </Button>
            </div>
          </div>

          {tournament.cover_image_url && (
            <div className="space-y-2">
              <Label>Vista previa:</Label>
              <div className="relative w-full h-40">
                <Image src={tournament.cover_image_url} alt="Imagen de portada" layout="fill" objectFit="cover" className="rounded-md" />
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
            Guardar Cambios
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}