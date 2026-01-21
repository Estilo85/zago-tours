'use client';

import { Box, VStack, Text, List } from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import Button from '../button/Button';

interface PlanProps {
  title: string;
  price: string;
  buttonText: string;
  features: string[];
  isActive?: boolean;
}

export const PricingCard = ({
  title,
  price,
  features,
  isActive,
  buttonText,
}: PlanProps) => {
  return (
    <Box
      px={8}
      py={10}
      borderRadius='xl'
      borderWidth='1px'
      bg={isActive ? 'primary' : 'white'}
      color={isActive ? 'white' : 'gray.800'}
      borderColor={isActive ? 'white' : 'gray.200'}
      shadow={isActive ? 'xl' : 'md'}
      transform={isActive ? 'scale(1.05)' : 'none'}
      transition='all 0.3s'
    >
      <VStack spaceY={4} align='start'>
        <Text fontSize='xl' fontWeight='bold'>
          {title}
        </Text>
        <Text
          fontSize='4xl'
          fontWeight='extrabold'
          display='flex'
          alignItems='baseline'
        >
          {price}
          <Box
            as='sub'
            fontSize='sm'
            fontWeight='normal'
            ml={1}
            color={isActive ? 'blue.100' : 'gray.500'}
          >
            /monthly
          </Box>
        </Text>
        <Button
          width='full'
          bg={isActive ? 'white' : 'primary'}
          color={isActive ? 'primary' : 'white'}
          variant={isActive ? 'solid' : 'outline'}
        >
          {buttonText}
        </Button>
        <List.Root variant='plain' gap='3' textAlign='start' py='4'>
          {features.map((feature, index) => (
            <List.Item key={index} display='flex' alignItems='center'>
              <List.Indicator
                as={CheckCircle}
                color={isActive ? 'blue.200' : 'green.500'}
                me='2'
              />
              {feature}
            </List.Item>
          ))}
        </List.Root>
      </VStack>
    </Box>
  );
};
