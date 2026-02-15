import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { DynamicImageCard } from '../ui/card/DynamicImageCard';

const cardInfo = [
  {
    url: '/images/community/community-getting-started-1.webp',
    title: (
      <Text
        fontSize={{ base: 'md', md: 'xl' }}
        fontWeight='bold'
        color='primary'
        textAlign='center'
      >
        Sign up & <br /> introduce yourself
      </Text>
    ),
    content:
      'Share who you are and the kinds of adventures you care about. Profiles help others understand your travel style before they reach out.',
  },
  {
    url: '/images/community/community-getting-started-2.webp',
    title: (
      <Text
        fontSize={{ base: 'md', md: 'xl' }}
        fontWeight='bold'
        color='primary'
        textAlign='center'
      >
        Explore by your <br /> adventure type
      </Text>
    ),
    content:
      'Find people interested in safaris, hiking, climbing, or other experiences you care about Discover others who match your pace and mindset',
  },
];

export default function GettingStartedSection() {
  return (
    <Stack
      mx={5}
      my={24}
      bg='white'
      px={{ base: 4, md: 6 }}
      py={20}
      gap={10}
      borderRadius='xl'
      borderWidth='1px'
      borderColor='gray.200'
    >
      <Heading
        size={{ base: '2xl', md: '4xl' }}
        color='primary'
        fontWeight='bold'
        textAlign='center'
      >
        Getting Started
      </Heading>

      <Flex
        gap={{ base: 4, md: 7 }}
        direction={{ base: 'column', md: 'row' }}
        maxW={{ lg: '1000px', xl: '1200px' }}
        mx='auto'
        justify='center'
        px={4}
      >
        {cardInfo.map((card, idx) => (
          <DynamicImageCard
            key={idx}
            image={card.url}
            title={card.title}
            description={card.content}
            maxWidth='350px'
          />
        ))}
      </Flex>
    </Stack>
  );
}
