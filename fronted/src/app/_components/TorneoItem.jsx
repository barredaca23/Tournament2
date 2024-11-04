import Image from 'next/image'
import React from 'react'
import { CalendarIcon, Users2Icon } from 'lucide-react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function TorneoItem({ torneo }) {
    const { Name_Torneo, Cover_Torneo, Date_Torneo, Description_Torneo} = torneo;
    const imageUrl = Cover_Torneo?.url;


    return (
      <Card className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="p-0 relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl ? `http://localhost:1337${imageUrl}` : '/placeholder.svg'}
            alt={Name_Torneo}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold mb-2 truncate">{Name_Torneo}</CardTitle>
          <div className="text-sm text-muted-foreground mb-4 line-clamp-2">
            <BlocksRenderer content={Description_Torneo} />
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            {Date_Torneo && (
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>
                  {new Date(Date_Torneo).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-2">
          <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">Ver detalles</Button>
        </CardFooter>
      </Card>
    );
}

export default TorneoItem;
