'use client';
import {
  Box,
  Text,
  Stack,
  Heading,
  Flex,
  Icon,
  Separator,
  HStack,
  createListCollection,
  Select,
  Portal,
} from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

import Button from '../ui/button';
import { CustomSearchBar } from '../searchbar/CustomSearch';

// 1. Create your data collections
const destinations = createListCollection({
  items: [
    { label: 'Lagos', value: 'lagos' },
    { label: 'Abuja', value: 'abuja' },
    { label: 'Port Harcourt', value: 'ph' },
  ],
});

const dates = createListCollection({
  items: [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Next Month', value: 'next-month' },
  ],
});

export const AdventureHero = () => {
  return (
    <Box
      bg='primary'
      borderRadius={{ base: 'none', md: '4xl' }}
      p={{ base: 3, md: 10 }}
      mb={{ base: 0, md: '40px' }}
    >
      <Stack
        position='relative'
        textAlign='center'
        gap={10}
        align='center'
        maxW='container.xl'
        mx='auto'
        px={4}
        pb={{ base: 10, md: '100px' }}
      >
        <Heading
          size={{ base: '2xl', md: '4xl' }}
          lineHeight='1.2'
          color='white'
          fontWeight='bolder'
        >
          Adventures
        </Heading>

        <Button asChild bg='secondary' color='dark' fontWeight='bold'>
          <NextLink href='/'>
            Become a supplier
            <Icon as={ArrowRight} ml={2} />
          </NextLink>
        </Button>

        <Box
          width={{ base: '95%', md: '90%', lg: '70%' }}
          position={{ base: 'relative', md: 'absolute' }}
          bottom={{ base: '0', md: '-80px' }}
          left='50%'
          transform='translateX(-50%)'
          zIndex={10}
          mt={{ base: 10, md: 0 }}
          bg='white'
          p={{ base: 4, md: 6 }}
          borderRadius='2xl'
          boxShadow='2xl'
        >
          <Flex
            // 1. STACK VERTICALLY ON MOBILE
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'stretch', md: 'center' }}
            justify='space-between'
            gap={4}
            p={2}
            // 2. ADJUST RADIUS BASED ON DIRECTION
            borderRadius={{ base: 'xl', md: 'full' }}
            border='1px solid'
            borderColor='gray.200'
            width='full'
            bg='white'
          >
            {/* LEFT SIDE: Select Buttons */}
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 4, md: 6 }}
              flex='1'
              align='center'
              px={{ base: 2, md: 4 }}
            >
              {/* Where to Group */}
              <HStack
                gap={3}
                width={{ base: 'full', sm: 'auto' }}
                justify='space-between'
              >
                <Text
                  fontWeight='bold'
                  fontSize='sm'
                  whiteSpace='nowrap'
                  color='gray.700'
                >
                  Where to
                </Text>
                <Select.Root
                  collection={destinations}
                  size='sm'
                  width={{ base: '150px', md: '120px' }}
                >
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder='Select City' />
                      <Select.Indicator />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {destinations.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </HStack>

              {/* 3. HIDE SEPARATOR ON MOBILE */}
              <Separator
                orientation='vertical'
                height='20px'
                display={{ base: 'none', md: 'block' }}
              />

              {/* When Group */}
              <HStack
                gap={3}
                width={{ base: 'full', sm: 'auto' }}
                justify='space-between'
              >
                <Text
                  fontWeight='bold'
                  fontSize='sm'
                  whiteSpace='nowrap'
                  color='gray.700'
                >
                  When
                </Text>
                <Select.Root
                  collection={dates}
                  size='sm'
                  width={{ base: '150px', md: '120px' }}
                >
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder='Anytime' />
                      <Select.Indicator />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {dates.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </HStack>
            </Flex>

            {/* RIGHT SIDE: Custom Search Bar */}
            <Box width={{ base: 'full', md: 'auto' }}>
              <CustomSearchBar
                placeholder='Search destinations...'
                width={{ base: 'full', md: '320px' }}
              />
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};
