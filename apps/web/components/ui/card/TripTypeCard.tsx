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
import { AppLink } from '../link/AppLink';
interface TripTypeCardProps {
  type: string;
  label: string;
  count?: number;
  imageUrl?: string | null;
}

export const TripTypeCard = ({
  type,
  label,
  count,
  imageUrl,
}: TripTypeCardProps) => {
  return (
    <LinkBox>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap={4}>
          <AvatarImage src={imageUrl || ''} name={label} />

          <VStack align='start' gap={0}>
            <AppLink href={`/adventures/tripType/${type}`}>
              <Text fontWeight='bold' fontSize='lg'>
                {label}
              </Text>
            </AppLink>
            <Text fontSize='sm' color='gray.500'>
              {count} {count === 1 ? 'Tour' : 'Tours'}
            </Text>
          </VStack>
        </Flex>

        <Icon as={LuChevronRight} boxSize={5} color='gray.400' />
      </Flex>
    </LinkBox>
  );
};
