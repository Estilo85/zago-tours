import { Box, Stack, Text } from '@chakra-ui/react';
import Button from '../ui/button';
import { ResponsiveImage } from '../media/ResponsiveImage';

export default function CommunityFooter() {
  return (
    <Stack spaceY={6} align='center' textAlign='center' px={4} py={16}>
      <Text fontSize='lg' fontWeight='semibold'>
        Adventure is not just a vacation. It’s a mindset.
      </Text>

      <Text maxW='600px'>
        If you care about how you travel, who you travel with, and what happens
        after you arrive, you belong here.
      </Text>

      <Button bg='primary' color='white'>
        Join the community
      </Button>

      {/* Image container */}
      <Box
        w='full'
        h={{ base: '220px', md: '320px' }}
        position='relative'
        borderRadius='lg'
        overflow='hidden'
      >
        <ResponsiveImage
          src='/images/community/community-post-banner.webp'
          alt='community footer image'
        />
      </Box>
    </Stack>
  );
}
