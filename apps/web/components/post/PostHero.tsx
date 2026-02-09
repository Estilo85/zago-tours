import { AvatarImage } from '@/components/media/AvatarImage';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { useUserProfile } from '@/hooks';
import { Box, Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { Heart, ImagePlay, Share } from 'lucide-react';
import React from 'react';
import Button from '../ui/button/Button';

export default function PostHero() {
  const { data } = useUserProfile();
  const profileImage = data?.data?.image;

  return (
    <Box position='relative' w='full' bg='white'>
      {/* Cover Image */}
      <Box
        w='full'
        h={{ base: '220px', md: '320px' }}
        overflow='hidden'
        position='relative'
      >
        <ResponsiveImage
          src='/images/community/community-post-banner.webp'
          alt='community banner'
          sizes='100vw'
          loading='eager'
          borderRadius='none'
        />

        {/* Button on top of cover image - bottom right */}
        <Button
          position='absolute'
          bottom={4}
          right={4}
          variant='solid'
          bg='primary'
          color='white'
          borderRadius='xl'
          size={{ base: 'sm', md: 'md' }}
          boxShadow='md'
          display={{ base: 'none', md: 'flex' }}
        >
          <Icon as={ImagePlay} mr={1} /> Edit cover
        </Button>
      </Box>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='center'
        align={{ base: 'center', md: 'flex-end' }}
        px={{ base: 4, md: 8 }}
        pb={6}
        position='relative'
        gap={6}
        borderBottom='1px solid'
        borderColor='gray.200'
      >
        <Box
          bg='white'
          borderRadius='full'
          mt={{ base: '-50px', md: '-150px' }}
          p={1}
          boxShadow='sm'
        >
          <AvatarImage src={profileImage} name={data?.data?.name} size='2xl' />
        </Box>

        <VStack align={{ base: 'center', md: 'flex-start' }} gap={1} pb={2}>
          <Heading
            fontSize={{ base: 'xl', md: '3xl' }}
            fontWeight='bold'
            display='flex'
            alignItems='center'
            gap={2}
          >
            Welcome to Zago Voice{' '}
            <Box display={{ base: 'none', md: 'block' }}>
              <Heart size={32} fill='green.500' />
            </Box>
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight='medium'
            color='gray.600'
            display={{ base: 'none', md: 'block' }}
          >
            Where trips and shared experiences shape better standards in
            adventure tourism.
          </Text>
        </VStack>
        <Button
          variant='ghost'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='xl'
          size={{ base: 'sm', md: 'md' }}
          w={{ base: 'full', md: 'auto' }}
          display={{ base: 'none', md: 'flex' }}
          alignSelf='flex-end'
        >
          <Icon as={Share} mr={1} /> Share
        </Button>
      </Flex>
    </Box>
  );
}
