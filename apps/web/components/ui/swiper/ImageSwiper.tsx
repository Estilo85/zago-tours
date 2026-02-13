'use client';

import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { AspectRatio, Box } from '@chakra-ui/react';
import Slider from 'react-slick';

interface ImageSwiperProps {
  images: string[];
  autoplaySpeed?: number;
}

export const ImageSwiper = ({
  images,
  autoplaySpeed = 3000,
}: ImageSwiperProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
  };

  const SliderComponent = Slider as any;

  return (
    <Box maxW='100%' mx='auto'>
      <SliderComponent {...settings}>
        {images.map((image, index) => (
          <Box key={index} position='relative'>
            <AspectRatio ratio={16 / 9}>
              <ResponsiveImage
                src={image}
                alt={`Slide ${index + 1}`}
                width='100%'
                height='100%'
                borderRadius='2xl'
                boxShadow='2xl'
              />
            </AspectRatio>
          </Box>
        ))}
      </SliderComponent>
    </Box>
  );
};
