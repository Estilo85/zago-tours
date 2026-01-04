'use client';

import {
  Carousel,
  IconButton,
  Container,
  Heading,
  Text,
  Stack,
  Box,
} from '@chakra-ui/react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { TestimonialCard } from '../ui/cards/testimonial-card';
import { ResponsiveImage } from '../media/ResponsiveImage';

const testimonials = [
  {
    qoute:
      'Even during uncertain times, they delivered a seamless experience. Their knowledge of destinations and attention to detail made my trip unforgettable. Truly a travel partner you can trust.',
    author: 'Ola',
    avatarUrl: '/images/home/home-how-it-work-hero-3.webp',
    rating: 5,
  },
  {
    qoute:
      "They offer an incredible way to explore Namibia's breathtaking wildlife and landscapes. With expert guides and personalized service, they ensure a safe, thrilling, and unforgettable adventure.",
    author: 'Ola',
    avatarUrl: '/images/home/home-how-it-work-hero-1.webp',
    rating: 5,
  },
  {
    qoute:
      "They offer an incredible way to explore Namibia's breathtaking wildlife and landscapes. With expert guides and personalized service, they ensure a safe, thrilling, and unforgettable adventure.",
    author: 'Ola',
    avatarUrl: '/images/home/home-how-it-work-hero-1.webp',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <Container bg='surface' py={6} my={6}>
      <Stack mb={10}>
        <Heading
          size={{ base: '2xl', md: '4xl' }}
          lineHeight='1.2'
          color='primary'
          fontWeight='bolder'
        >
          They Love Zago
        </Heading>
        <Text>  What travelers are saying about our partners  </Text>
      </Stack>
      <Carousel.Root
        slideCount={testimonials.length}
        mx='auto'
        gap='6'
        allowMouseDrag
        slidesPerPage={3}
        position='relative'
      >
        <Carousel.Control mb={6} justifyContent='flex-end' gap='3'>
          <Carousel.PrevTrigger asChild>
            <IconButton
              variant='subtle'
              borderRadius='full'
              aria-label='Previous slide'
              _hover={{ bg: 'blue.50', color: 'blue.600' }}
            >
              <LuArrowLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Box
            as='span'
            width='fit-content'
            position='absolute'
            top='-15%'
            right='30%'
          >
            <ResponsiveImage
              src='/images/home/testimonial-icon.webp'
              width='100px'
              height='50px'
              alt='testimonial-icon'
            />
          </Box>
          <Carousel.ItemGroup>
            {testimonials.map((item, index) => (
              <Carousel.Item key={index} index={index}>
                <TestimonialCard
                  quote={item.qoute}
                  author={item.author}
                  avatarUrl={item.avatarUrl}
                  rating={item.rating}
                />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
          <Carousel.NextTrigger asChild>
            <IconButton
              variant='subtle'
              borderRadius='full'
              aria-label='Next slide'
              _hover={{ bg: 'blue.50', color: 'blue.600' }}
            >
              <LuArrowRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>

        <Carousel.Indicators mt={8} />
      </Carousel.Root>
    </Container>
  );
};
