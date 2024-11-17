// src/app/components/GameCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  id: number;
  name: string;
  description: string;
  cover_image_url: string;
}

const GameCard: React.FC<GameCardProps> = ({ id, name, description, cover_image_url }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/games/${name}/tournaments`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={cover_image_url}
            alt={`Portada del juego ${name}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold mb-2 truncate">{name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleClick}>
          Ver torneos
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
