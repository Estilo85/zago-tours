import { AvatarImage } from '@/components/media/AvatarImage';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { useUserProfile } from '@/hooks';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Heart } from 'lucide-react';
import React from 'react';

export default function PostHero() {
  const { data } = useUserProfile();
  const profileImage = data?.data?.image;

  return (
    <Box position='relative' w='full'>
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
      </Box>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='center'
        align='flex-end'
        px={{ base: 4, md: 8 }}
        position='relative'
        // mt='-64px'
        gap={6}
        border='2px solid red'
      >
        <Box
          border='4px solid white'
          borderRadius='full'
          alignSelf='flex-start'
          mt='-50px'
        >
          <AvatarImage src={profileImage} name={data?.data?.name} size='2xl' />
        </Box>

        <VStack align='flex-start' spaceY={1} pb={2}>
          <Heading
            color='primary'
            fontSize={{ base: 'md', md: 'xl' }}
            display='flex'
            alignItems='center'
            gap={2}
          >
            Welcome to Zago Voice <Heart size={32} fill='full' />
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight='medium'>
            Where trips and shared experiences shape better standards in
            adventure tourism.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
