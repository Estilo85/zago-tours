import { Flex, Icon, Stack, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface Prop {
  icon: IconType;
  heading: string;
  description: string;
}

export const HowItWorkCard = ({ icon, heading, description }: Prop) => {
  return (
    <Flex
      align='start'
      gap={4}
      p={5}
      borderRadius='xl'
      bg='white'
      _hover={{ shadow: 'md' }}
      transition='all 0.2s'
    >
      {/* Left Side: Icon Container */}
      <Box
        p={3}
        bg='textPrimary'
        borderRadius='lg'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Icon as={icon} boxSize={6} color='primary' />
      </Box>

      {/* Right Side: Text Content */}
      <Stack gap={1} flex='1'>
        <Text
          as='h3'
          fontWeight='bold'
          fontSize='lg'
          lineHeight='shorter'
          color='gray.800'
        >
          {heading}
        </Text>
        <Text fontSize='sm' color='gray.600' lineHeight='tall'>
          {description}
        </Text>
      </Stack>
    </Flex>
  );
};
