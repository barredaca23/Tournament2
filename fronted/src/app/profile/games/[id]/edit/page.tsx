'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../axiosInstance';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { UploadIcon, Loader2 } from 'lucide-react';

// Define el tipo de los parámetros de la ruta
interface RouteParams {
  id: string;
}

export default function EditGamePage() {
  const params = useParams(); // Deja sin tipar por defecto
  const router = useRouter();

  // Validación explícita para extraer `id`
  const id = params?.id;
  if (!id || Array.isArray(id)) {
    throw new Error("Parámetro 'id' inválido o no proporcionado");
  }

  const [game, setGame] = useState({
    name: '',
    description: '',
    cover_image_url: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/games/${id}`)
          .then(response => {
            setGame(response.data);
          })
          .catch(error => {
            console.error('Error al obtener el juego:', error);
            alert('No se pudo cargar el juego');
          });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGame({ ...game, [e.target.name]: e.target.value });
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
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setGame((prev) => ({ ...prev, cover_image_url: response.data.url }));
      alert('Imagen subida correctamente');
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!game.cover_image_url) {
      alert('Por favor sube una imagen antes de enviar.');
      return;
    }

    try {
      await axiosInstance.put(`/games/${id}`, game);
      alert('Juego actualizado exitosamente');
      router.push('/admin/games');
    } catch (error) {
      console.error('Error al actualizar el juego:', error);
      alert('Error al actualizar el juego');
    }
  };

  return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-600">Editar Juego</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Juego</Label>
              <Input
                  id="name"
                  name="name"
                  placeholder="Nombre del Juego"
                  value={game.name}
                  onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripción"
                  value={game.description}
                  onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Imagen del Juego</Label>
              <div className="flex items-center space-x-2">
                <Input type="file" accept="image/*" onChange={handleFileChange} />
                <Button type="button" onClick={handleImageUpload} disabled={uploading}>
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadIcon className="w-4 h-4 mr-2" />}
                  {uploading ? 'Subiendo...' : 'Subir'}
                </Button>
              </div>
            </div>

            {game.cover_image_url && (
                <div className="space-y-2">
                  <Label>Vista previa:</Label>
                  <div className="relative w-full h-40">
                    <Image src={game.cover_image_url} alt="Imagen del juego" layout="fill" objectFit="cover" className="rounded-md" />
                  </div>
                </div>
            )}

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Actualizar Juego
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}
