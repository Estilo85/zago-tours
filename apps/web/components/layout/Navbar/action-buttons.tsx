'use client';
import {
  HStack,
  Icon,
  MenuContent,
  MenuRoot,
  MenuTrigger,
  Portal,
  MenuPositioner,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRoleStore } from '@/store/role-selector.store';
import Button from '@/components/ui/button';
import { AppLink } from '@/components/ui/AppLink';

const menuList = [
  { label: 'Adventurer', value: 'ADVENTURER' },
  { label: 'Affiliate', value: 'AFFILIATE' },
  { label: 'Agent', value: 'AGENT' },
];

export const ActionButtons = () => {
  const router = useRouter();

  // Store action
  const selectedRole = useRoleStore((state) => state.role);
  const setRole = useRoleStore((state) => state.setRole);

  const handleRoleSelect = (value: string) => {
    setRole(value);

    router.push('/register');
  };

  return (
    <HStack gap={4}>
      <Button
        asChild
        aria-label='login'
        variant='outline'
        border='1px solid black'
        fontWeight='bold'
        p={5}
        cursor='pointer'
        bg='textInverse'
        textDecor='none'
        color='dark'
      >
        <AppLink href='/login'>Login</AppLink>
      </Button>

      <MenuRoot>
        <MenuTrigger asChild>
          <Button
            aria-label='join-us'
            alignItems='center'
            gap={3}
            fontWeight='bold'
            p={5}
            cursor='pointer'
            bg='secondary'
            color='dark'
            onClick={() => router.push('/register')}
          >
            Join us <Icon as={ArrowRight} size={{ base: 'xs', md: 'sm' }} />
          </Button>
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
