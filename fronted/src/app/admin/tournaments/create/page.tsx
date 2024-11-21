'use client';
import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { UploadIcon } from 'lucide-react'

export default function CreateTournamentPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    max_players: '',
    game_name: '',
    cover_image_url: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

      setForm((prev) => ({ ...prev, cover_image_url: response.data.url }));
    } catch (error) {
      console.error('Error al subir imagen:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.cover_image_url) {
      alert('Por favor sube una imagen antes de enviar.');
      return;
    }

    try {
      await axiosInstance.post('/tournaments', form);
      router.push('/admin/tournaments');
    } catch (error) {
      console.error('Error al crear torneo:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-400">Crear Torneo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Torneo</Label>
            <Input id="name" name="name" placeholder="Nombre" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" placeholder="Descripción" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Fecha de Inicio</Label>
              <Input id="start_date" name="start_date" type="datetime-local" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Fecha de Fin</Label>
              <Input id="end_date" name="end_date" type="datetime-local" onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_players">Máximo de Jugadores</Label>
              <Input id="max_players" name="max_players" type="number" placeholder="Máx. jugadores" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="game_name">Nombre del Juego</Label>
              <Input id="game_name" name="game_name" placeholder="Nombre del juego" onChange={handleChange} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Imagen de Portada</Label>
            <div className="flex items-center space-x-2">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              <Button type="button" onClick={handleImageUpload} disabled={uploading}>
                {uploading ? 'Subiendo...' : <UploadIcon className="w-4 h-4 mr-2" />}
                {uploading ? '' : 'Subir'}
              </Button>
            </div>
          </div>

          {form.cover_image_url && (
            <div className="space-y-2">
              <Label>Vista previa:</Label>
              <div className="relative w-full h-40">
                <Image src={form.cover_image_url} alt="Imagen de portada" layout="fill" objectFit="cover" className="rounded-md" />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Crear Torneo</Button>
        </form>
      </CardContent>
    </Card>
  );
}