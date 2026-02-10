'use client';
import RegistrationForm from '@/components/auth/registration/form/RegistrationForm';
import { Box, Container, Flex } from '@chakra-ui/react';
import { useRegistrationLogic } from '@/hooks/settings/use-registration-logic';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';

export default function Register() {
  const { selectedCategory } = useRegistrationLogic();

  //Display image base on role
  const getImageSource = () => {
    switch (selectedCategory) {
      case 'ADVENTURER':
        return '/images/forms/adventure-form-bg.webp';
      case 'AFFILIATE':
        return '/images/forms/affiliate-form-bg.webp';
      default:
        return '/images/forms/ind-agent-form-bg.webp';
    }
  };

  return (
    <Container
      maxW={{ base: '100%', md: 'container.xl' }}
      py={{ base: 0, md: 10 }}
      px={{ base: 0, md: 8 }}
      display='flex'
      justifyContent='center'
    >
      <Flex
        position='relative'
        width='full'
        justify={{ base: 'center', md: 'center' }}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Box
          width='700px'
          maxH='1200px'
          height='600px'
          bg='primary'
          p={5}
          borderRadius='2xl'
          display={{ base: 'none', md: 'block' }}
        >
          <ResponsiveImage
            src={getImageSource()}
            alt='Form background image'
            width='70%'
            height='100%'
            sizes='(max-width: 768px) 0vw, 490px'
            objectFit='cover'
          />
        </Box>
        <Box
          position={{ base: 'relative', md: 'absolute' }}
          top={{ base: 'auto', md: '50%' }}
          right={{ base: 'auto', md: '-30px' }}
          transform={{ base: 'none', md: 'translateY(-50%)' }}
          width={{ base: '100%', md: '40%' }}
          maxWidth={{ base: '100%', md: 'none' }}
          px={{ base: 4, md: 0 }}
          my={{ base: 9, md: 0 }}
          zIndex='1'
        >
          <RegistrationForm />
        </Box>
      </Flex>
    </Container>
  );
}
