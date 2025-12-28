'use client';

import { Box, Text } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Box style={{ padding: '2rem', textAlign: 'center' }}>
      <Text as={'h1'}>404 - Page Not Found</Text>
      <Text>The page you are looking for does not exist.</Text>
    </Box>
  );
}
