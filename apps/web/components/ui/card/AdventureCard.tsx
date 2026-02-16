'use client';

import {
  Card,
  Badge,
  Text,
  Flex,
  Icon,
  Box,
  IconButton,
  AspectRatio,
  RatingGroup,
} from '@chakra-ui/react';
import { CheckCircleIcon, Heart } from 'lucide-react';
import { ResponsiveImage } from '../../media/ResponsiveImage';
import { AdventureDetailResponseDto } from '@zagotours/types';
import Button from '../button/Button';
import { AppLink } from '../link/AppLink';
import { usePermissions, useToggleLikeAdventure } from '@/hooks';
import { useRouter } from 'next/navigation';

const AdventureCard = ({
  adventure,
}: {
  adventure: AdventureDetailResponseDto;
}) => {
  const nights = adventure.days > 1 ? adventure.days - 1 : 0;
  const router = useRouter();
  const { mutate: toggleLike } = useToggleLikeAdventure();
  const { isAuthenticated } = usePermissions();

  const handleWhatsAppBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const phoneNumber = '447418627748';
    const message = `Hi! I'm interested in booking the "${adventure.title}" adventure for $${adventure.price}. Could you provide more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    toggleLike(adventure.id);
  };

  return (
    <Card.Root
      w={{ base: 'full', md: '280px' }}
      variant='elevated'
      overflow='hidden'
      borderRadius='3xl'
      role='group'
      transition='all 0.3s ease'
      _hover={{
        md: {
          boxShadow: '2xl',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box position='relative' overflow='hidden'>
        <AspectRatio ratio={4 / 3}>
          <ResponsiveImage
            src={adventure.mediaUrl || ''}
            alt={adventure.title}
            width='100%'
            height='100%'
            borderRadius='none'
            objectFit='cover'
            objectPosition='top'
            containerProps={{
              transition: 'transform 0.5s ease',
              _groupHover: { transform: 'scale(1.08)' },
            }}
          />
        </AspectRatio>

        <Flex
          position='absolute'
          top='3'
          left='3'
          right='3'
          justify='flex-end'
          gap='2'
          zIndex='2'
        >
          {adventure.isVerified && (
            <Badge
              px='2'
              py='0.5'
              borderRadius='full'
              variant='solid'
              colorPalette='green'
              bg='whiteAlpha.900'
              color='green.600'
              display='flex'
              alignItems='center'
              fontSize='xs'
              mr='auto'
            >
              Verified <Icon as={CheckCircleIcon} ml='1' boxSize='3' />
            </Badge>
          )}

          <IconButton
            aria-label='Like'
            size='sm'
            variant={adventure?.isLiked ? 'solid' : 'outline'}
            colorScheme={adventure?.isLiked ? 'red' : 'gray'}
            onClick={handleLikeClick}
            bg='whiteAlpha.900'
            borderRadius='full'
            _hover={{ bg: 'white', transform: 'scale(1.1)' }}
          >
            <Icon
              as={Heart}
              boxSize='4'
              color={adventure?.isLiked ? 'red.500' : 'gray.400'}
              fill={adventure?.isLiked ? 'red.500' : 'none'}
            />
          </IconButton>
        </Flex>
      </Box>

      {/* BODY SECTION - Always wrapped in AppLink now */}
      <AppLink href={`/adventures/${adventure.id}`}>
        <Card.Body p='4' pt='6' gap='1' position='relative'>
          <Flex
            position='absolute'
            top='0'
            left='4'
            transform='translateY(-50%)'
            bg='white'
            px='2'
            py='1'
            borderRadius='full'
            boxShadow='md'
            alignItems='center'
            zIndex='3'
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

          <Card.Title
            fontWeight='bold'
            fontSize='md'
            lineHeight='tight'
            minH='45px'
          >
            {adventure.title}
          </Card.Title>
          <Card.Description color='gray.500' fontSize='xs' fontWeight='medium'>
            {adventure.days} Days / {nights} {nights === 1 ? 'Night' : 'Nights'}
          </Card.Description>
        </Card.Body>
      </AppLink>

      <Card.Footer pt='0'>
        <Flex
          w='full'
          justify='space-between'
          align='center'
          borderTop='1px solid'
          borderColor='gray.100'
          pt='3'
        >
          <Box>
            <Text as='span' fontSize='lg' fontWeight='bold'>
              ${adventure.price}
            </Text>
            <Text as='span' color='gray.500' fontSize='2xs' ml='1'>
              / person
            </Text>
          </Box>
          <Button
            onClick={handleWhatsAppBooking}
            bg='surface'
            color='dark'
            size='sm'
            px='4'
            borderRadius='xl'
            fontWeight='bold'
            _hover={{ filter: 'brightness(90%)' }}
          >
            Book Now
          </Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default AdventureCard;
