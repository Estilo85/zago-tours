import React from 'react';
import { Box, Link } from '@chakra-ui/react';

export default function AffiliateContracts() {
  return (
    <Box>
      <Link
        href='/doc/TRAVEL_ADVISOR_AGREEMENT.pdf'
        download='TRAVEL_ADVISOR_AGREEMENT.pdf'
        textDecor='none'
        _hover={{ textDecor: 'underline' }}
      >
        Download media kit (PDF)
      </Link>
    </Box>
  );
}
