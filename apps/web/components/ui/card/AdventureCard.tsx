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
  IconButton,
} from '@chakra-ui/react';
import { CheckCircleIcon, Heart } from 'lucide-react';
import { ResponsiveImage } from '../../media/ResponsiveImage';
import { AdventureDetailResponseDto } from '@zagotours/types';
import Button from '../button/Button';
import { AppLink } from '../link/AppLink';
import { useToggleLikeAdventure } from '@/hooks';

const AdventureCard = ({
  adventure,
  href,
}: {
  adventure: AdventureDetailResponseDto;
  href?: string;
}) => {
  const nights = adventure.days > 1 ? adventure.days - 1 : 0;
  const { mutate: toggleLike } = useToggleLikeAdventure();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(adventure.id);
  };

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

          {/* Top badges container */}
          {/* Top badges container */}
          <Flex
            position='absolute'
            top='3'
            left='3'
            right='3'
            justifyContent='flex-start'
            alignItems='flex-start'
          >
            {/* Verified Badge */}
            {adventure.isVerified && (
              <Badge
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
                Verified
                <Icon as={CheckCircleIcon} mr='1' boxSize='3' />
              </Badge>
            )}
          </Flex>

          <IconButton
            aria-label='Like adventure'
            size='sm'
            variant='ghost'
            onClick={handleLikeClick}
            bg='rgba(255, 255, 255, 0.95)'
            backdropFilter='blur(4px)'
            borderRadius='full'
            _hover={{ bg: 'rgba(255, 255, 255, 1)' }}
            position='absolute'
            top='3'
            right='3'
            zIndex='2'
          >
            <Icon
              as={Heart}
              boxSize='4'
              color={adventure?.isLiked ? 'red.500' : 'gray.600'}
              fill={adventure?.isLiked ? 'red.500' : 'none'}
              transition='all 0.2s'
            />
          </IconButton>

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
