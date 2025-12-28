import { Flex, Heading } from '@chakra-ui/react';

export function Navbar() {
  return (
    <Flex
      px={6}
      py={4}
      align='center'
      borderBottom='1px solid'
      borderColor='gray.200'
    >
      <Heading size='md'>ZagoTour</Heading>
    </Flex>
  );
}
