'use client';

import { AvatarImage } from '@/components/media/AvatarImage';
import {
  Flex,
  Text,
  Icon,
  VStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { LuChevronRight } from 'react-icons/lu';

interface TripTypeCardProps {
  type: string;
  count: number;
  imageUrl?: string | null;
}

export const TripTypeCard = ({ type, count, imageUrl }: TripTypeCardProps) => {
  return (
    <LinkBox
      as='article'
      p={4}
      borderWidth='1px'
      borderRadius='xl'
      transition='all 0.2s'
      width='100%'
      maxW={{ base: '100%', md: '200px' }}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
        borderColor: 'primary.500',
      }}
      bg='white'
    >
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap={4}>
          {/* Avatar for the Trip Type Image */}
          <AvatarImage src={imageUrl || ''} name={type} />

          <VStack align='start' gap={0}>
            <LinkOverlay
              as={NextLink}
              href={`/adventures?type=${type.toLowerCase()}`}
            >
              <Text fontWeight='bold' fontSize='lg' textTransform='capitalize'>
                {type}
              </Text>
            </LinkOverlay>
            <Text fontSize='sm' color='gray.500'>
              {count} {count === 1 ? 'Tour' : 'Tours'}
            </Text>
          </VStack>
        </Flex>

        {/* The Leading Arrow Icon */}
        <Icon
          as={LuChevronRight}
          boxSize={5}
          color='gray.400'
          _groupHover={{ color: 'primary.500' }}
        />
      </Flex>
    </LinkBox>
  );
};
