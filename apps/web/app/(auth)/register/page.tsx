'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RegistrationForm from '@/components/auth/registration/form/register-form';
import { RegistrableRole } from '@zagotours/types';
import { Box, Container, Flex } from '@chakra-ui/react';
import { useRegistrationLogic } from '@/hooks/use-registration-logic';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';

export default function Register() {
  const router = useRouter();
  const { selectedCategory } = useRegistrationLogic();
  const [error, setError] = useState<string | null>(null);

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

  //Handle Registration
  const handleRegistration = async (data: {
    role: RegistrableRole | null;
    [key: string]: any;
  }) => {
    setError(null);
    router.push('/dashboard');
  };

  return (
    <Container
      maxW={{ base: '100%', md: 'container.xl' }}
      py={{ base: 0, md: 10 }}
      px={{ base: 0, md: 8 }}
    >
      <Flex
        position='relative'
        justify={{ base: 'normal', md: 'center' }}
        mr={{ base: '0', md: '40' }}
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

          {/* Form positioned absolutely */}
        </Box>
        <Box
          position={{ base: 'relative', md: 'absolute' }}
          top={{ base: 'auto', md: '50%' }}
          right={{ base: 'auto', md: '-30px' }}
          transform={{ base: 'none', md: 'translateY(-50%)' }}
          width={{ base: '100%', md: '40%' }}
          maxWidth={{ base: '500px', md: 'none' }}
          zIndex='1'
        >
          <RegistrationForm onSubmit={handleRegistration} error={error} />
        </Box>
      </Flex>
    </Container>
  );
}
