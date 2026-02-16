'use client';

import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ResponsiveImage } from '../media/ResponsiveImage';
import Button from '../ui/button/Button';
import { ArrowRight } from 'lucide-react';
import { useAuthSession } from '@/hooks';
import { AppLink } from '../ui/link/AppLink';
import { ImageSwiper } from '../ui/swiper/ImageSwiper';

const swiper_image = [
  '/images/home/swipper/kayaking.webp',
  '/images/home/swipper/Mountain climbing.webp',
  '/images/home/swipper/Skiing.webp',
  '/images/home/swipper/Skydiving.webp',
  '/images/home/swipper/snowboarding.webp',
];

export const HomeHero = () => {
  const { isAuthenticated } = useAuthSession();

  return (
    <Box
      bg='primary'
      color='textPrimary'
      borderRadius={{ base: 'none', md: '3xl' }}
      p={{ base: 5, md: 10 }}
      pb={{ base: '100px', md: '200px' }}
      mb={{ base: '100px', md: '350px' }}
      position='relative'
    >
      <Stack
        textAlign='center'
        gap={5}
        align='center'
        pb={{ base: '20px', md: '30px' }}
      >
        <Center>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            px={4}
            py={1}
            border='1px solid white'
            borderRadius='full'
            letterSpacing='widest'
          >
            SAFE | SPONTANEOUS | SUSTAINABLE
          </Text>
        </Center>

        <Heading size={{ base: '2xl', md: '4xl' }} lineHeight='1.2'>
          Show Up Excited, Return <br /> Home Your Best Self.
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
          You take adventure seriously. <br /> We take your safety even more
          seriously.
        </Text>

        {!isAuthenticated && (
          <AppLink href='/register'>
            <Button bg='secondary' color='dark' fontWeight='bold'>
              Join Us
              <Icon as={ArrowRight} ml={2} />
            </Button>
          </AppLink>
        )}
      </Stack>

      <Box
        width={{ base: '100%', md: '75%', lg: '65%' }}
        position='absolute'
        bottom={{ base: '-80px', md: '-250px' }}
        left='50%'
        transform='translateX(-50%)'
        zIndex={10}
      >
        {swiper_image.length > 0 ? (
          <ImageSwiper images={swiper_image} autoplaySpeed={3000} />
        ) : (
          <AspectRatio ratio={{ base: 21 / 9, md: 21 / 9 }}>
            <ResponsiveImage
              src='/images/home/banner.webp'
              alt='home page banner image'
              width='100%'
              priority={true}
              loading='eager'
              height='100%'
              borderRadius='2xl'
              boxShadow='2xl'
            />
          </AspectRatio>
        )}
      </Box>
    </Box>
  );
};
