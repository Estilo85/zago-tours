'use client';
import {
  HStack,
  Icon,
  IconButton,
  MenuContent,
  MenuRoot,
  MenuTrigger,
  Portal,
  MenuPositioner,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const menuList = [
  { label: 'Adventurer', value: 'ADVENTURER' },
  { label: 'Affiliate', value: 'AFFILIATE' },
  { label: 'Agent', value: 'AGENT' },
];

export const ActionButtons = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('ADVENTURER');

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
    router.push(`/register?role=${value}`);
  };

  return (
    <HStack gap={4}>
      <IconButton
        asChild
        aria-label='login'
        variant='outline'
        borderRadius='20px'
        fontWeight='bold'
        p={5}
        cursor='pointer'
        bg='textInverse'
        textDecor='none'
        color='dark'
      >
        <NextLink href='/login'>Login</NextLink>
      </IconButton>

      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton
            asChild
            aria-label='join-us'
            alignItems='center'
            gap={3}
            fontWeight='bold'
            borderRadius='20px'
            p={5}
            cursor='pointer'
            bg='secondary'
            border='none'
            textDecor='none'
            color='dark'
          >
            <NextLink href='/register'>
              Join us <Icon as={ArrowRight} size={{ base: 'xs', md: 'sm' }} />
            </NextLink>
          </IconButton>
        </MenuTrigger>
        <Portal>
          <MenuPositioner>
            <MenuContent p={3}>
              <RadioGroup.Root
                variant='outline'
                size={{ base: 'xs', md: 'sm' }}
                value={selectedRole}
                onValueChange={(details) =>
                  handleRoleSelect(details.value || '')
                }
              >
                <Stack direction='column' gap={2}>
                  {menuList.map((item) => (
                    <RadioGroup.Item
                      key={item.value}
                      value={item.value}
                      p={2}
                      borderRadius='md'
                      bg={
                        selectedRole === item.value ? 'blue.200' : 'transparent'
                      }
                      _hover={{
                        bg: selectedRole === item.value ? '' : 'gray.200',
                      }}
                      transition='background 0.2s'
                      cursor='pointer'
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </Stack>
              </RadioGroup.Root>
            </MenuContent>
          </MenuPositioner>
        </Portal>
      </MenuRoot>
    </HStack>
  );
};
