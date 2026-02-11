'use client';

import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Box } from '@chakra-ui/react';
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
    arrows: true,
  };

  const SliderComponent = Slider as any;

  return (
    <Box maxW='100%' mx='auto'>
      <SliderComponent {...settings}>
        {images.map((image, index) => (
          <Box key={index} position='relative' aspectRatio={16 / 9}>
            <ResponsiveImage
              src={image}
              alt={`Slide ${index + 1}`}
              width='100%'
              height={{ base: '250px', md: '400px' }}
              borderRadius='2xl'
              boxShadow='2xl'
            />
          </Box>
        ))}
      </SliderComponent>
    </Box>
  );
};
