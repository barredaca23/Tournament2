'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function CategoriesList({ categoryList }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Ranking de Juegos</h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {categoryList.map((category, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <Card className="overflow-hidden group m-1">
                <CardContent className="p-0">
                  <Link 
                    href={`/torneos-category/${category.Name_Game}`} 
                    className="block relative h-48 w-full overflow-hidden"
                  >
                    <Image
                      src={`http://localhost:1337${category.Cover_Game?.url}`}
                      alt={`Portada de ${category.Name_Game}`}
                      layout="fill"
                      objectFit="cover"
                      priority={index < 6}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ease-in-out" />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-center">{category.Name_Game}</h2>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoriesList
