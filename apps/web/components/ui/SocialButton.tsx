import { Button, Icon } from '@chakra-ui/react';

export function SocialButton({ icon, label }: { icon: any; label: string }) {
  return (
    <Button
      variant='ghost'
      flex='1'
      size='sm'
      fontWeight='medium'
      color='gray.600'
      _hover={{ bg: 'primary.50', color: 'primary.600' }}
    >
      <Icon as={icon} mr={2} boxSize={4} />
      {label}
    </Button>
  );
}
