'use client';

import {
  Card,
  Badge,
  Text,
  Flex,
  Icon,
  Stack,
  RatingGroup,
  Box,
} from '@chakra-ui/react';
import { CheckCircleIcon } from 'lucide-react';
import { ResponsiveImage } from '../../media/ResponsiveImage';
import { Adventure } from '@zagotours/types';
import Button from '../button/Button';
import { AppLink } from '../link/AppLink';

const AdventureCard = ({
  adventure,
  href,
}: {
  adventure: Adventure;
  href?: string;
}) => {
  const nights = adventure.days > 1 ? adventure.days - 1 : 0;

  return (
    <AppLink href={`/adventures/${adventure.id}`}>
      <Card.Root
        w={{ base: 'full', md: '280px' }}
        h='350px'
        overflow='hidden'
        _hover={{ boxShadow: 'md' }}
        transition='all 0.2s'
        borderRadius='3xl'
      >
        {/* TOP LAYER: IMAGE SECTION - 50% height */}
        <Box position='relative' h='50%' flexShrink={0}>
          <ResponsiveImage
            src={adventure.mediaUrl || ''}
            alt={adventure.title}
            width='100%'
            height='100%'
            borderRadius='none'
          />

          {/* Verified Badge */}
          {adventure.isVerified && (
            <Badge
              position='absolute'
              top='3'
              left='3'
              px='2'
              py='0.5'
              borderRadius='full'
              colorPalette='green'
              display='flex'
              alignItems='center'
              bg='rgba(255, 255, 255, 0.95)'
              backdropFilter='blur(4px)'
              fontSize='xs'
            >
              <Icon as={CheckCircleIcon} mr='1' boxSize='3' />
              Verified
            </Badge>
          )}

          {/* Rating Bridge */}
          <Flex
            position='absolute'
            bottom='0'
            left='4'
            transform='translateY(50%)'
            bg='white'
            px='2'
            py='1'
            borderRadius='full'
            boxShadow='md'
            alignItems='center'
            zIndex='2'
          >
            <RatingGroup.Root
              count={5}
              value={adventure.rating}
              readOnly
              size='xs'
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>

            <Text fontWeight='bold' fontSize='xs' ml='1.5' color='gray.600'>
              {adventure.rating.toFixed(1)}
            </Text>
          </Flex>
        </Box>

        {/* BOTTOM LAYER: DETAILS SECTION - 50% height */}
        <Card.Body p='4' pt='6' h='50%' display='flex' flexDirection='column'>
          <Stack gap={1.5}>
            {/* Title */}
            <Card.Title
              fontWeight='semibold'
              fontSize='md'
              lineHeight='tight'
              lineClamp={2}
              minH='40px'
            >
              {adventure.title}
            </Card.Title>

            {/* Days / Nights */}
            <Card.Description
              color='gray.500'
              fontSize='xs'
              fontWeight='medium'
            >
              {adventure.days} Days / {nights}{' '}
              {nights === 1 ? 'Night' : 'Nights'}
            </Card.Description>
          </Stack>

          <Flex
            justifyContent='space-between'
            alignItems='center'
            pt='3'
            mt='auto'
            borderTop='1px solid'
            borderColor='gray.100'
          >
            <Box>
              <Text as='span' fontSize='lg' fontWeight='bold' color='dark'>
                ${adventure.price}
              </Text>
              <Text as='span' color='gray.500' fontSize='xs'>
                {' '}
                / person
              </Text>
            </Box>

            <Button
              bg='surface'
              color='dark'
              size='xs'
              px='2'
              fontSize='xs'
              _hover={{ transform: 'translateY(-1px)', boxShadow: 'sm' }}
              transition='all 0.2s'
            >
              Book Now
            </Button>
          </Flex>
        </Card.Body>
      </Card.Root>
    </AppLink>
  );
};

export default AdventureCard;
