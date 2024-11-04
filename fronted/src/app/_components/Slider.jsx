"use client";
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';

function Slider({ sliderList }) {
  console.log("Datos en Slider:", sliderList); // Aquí ves los datos en el componente Slider
  
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((item, index) => {   
          // Accede a la URL de la imagen correctamente
          const imageUrl = item.Image?.url ? `http://localhost:1337${item.Image.url}` : '/default-image.jpg';
          
          return (
            <CarouselItem key={index}>
              <Image
                src={imageUrl}
                alt="slider"
                width={2560}
                height={1600}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;