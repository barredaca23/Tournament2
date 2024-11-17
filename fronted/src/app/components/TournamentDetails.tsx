import React from 'react'
import Link from 'next/link'
import { CalendarIcon, GamepadIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TournamentCardProps {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  gameName: string
}

export default function TournamentCard({
  id,
  name,
  description,
  startDate,
  endDate,
  gameName,
}: TournamentCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Badge variant="secondary">{gameName}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <GamepadIcon className="w-4 h-4 mr-2" />
          <span>{gameName}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>
            {new Date(startDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })} - 
            {new Date(endDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tournaments/${id}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}