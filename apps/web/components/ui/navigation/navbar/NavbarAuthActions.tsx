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
  VStack,
  Text,
  Flex,
  useBreakpointValue,
  Collapsible,
  Box,
} from '@chakra-ui/react';
import { ArrowRight, LogOut, ChevronDown, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRoleStore } from '@/store/role-selector.store';
import Button from '@/components/ui/button/Button';
import { AppLink } from '@/components/ui/link/AppLink';
import { useAuth, useAuthSession } from '@/hooks';

const menuList = [
  { label: 'Adventurer', value: 'ADVENTURER' },
  { label: 'Affiliate', value: 'AFFILIATE' },
  { label: 'Agent', value: 'AGENT' },
];

export const NavbarAuthActions = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthSession();
  const { logout } = useAuth();
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  // Detect if mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Store action
  const selectedRole = useRoleStore((state) => state.role);
  const setRole = useRoleStore((state) => state.setRole);

  const handleRoleSelect = (value: string) => {
    setRole(value);
    setCollapsibleOpen(false);
    router.push('/register');
  };

  if (isAuthenticated) {
    return (
      <Flex align='center' justify='space-between' gap={4}>
        <Button
          asChild
          variant='outline'
          fontWeight='medium'
          px={{ base: 3, md: 5 }}
          py={5}
        >
          <AppLink href='/dashboard'>
            <ArrowLeft size={16} />
            Dashboard
          </AppLink>
        </Button>
        <Button
          aria-label='logout'
          gap={3}
          fontWeight='bold'
          px={{ base: 3, md: 5 }}
          py={5}
          cursor='pointer'
          bg='primary'
          color='white'
          onClick={logout}
        >
          Logout <LogOut size={16} />
        </Button>
      </Flex>
    );
  }

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

      {/* MOBILE: Collapsible */}
      {isMobile ? (
        <Box position='relative'>
          <Collapsible.Root
            open={collapsibleOpen}
            onOpenChange={(e) => setCollapsibleOpen(e.open)}
          >
            <Collapsible.Trigger asChild>
              <Button
                aria-label='join-us'
                alignItems='center'
                gap={3}
                fontWeight='bold'
                p={5}
                cursor='pointer'
                bg='secondary'
                color='dark'
              >
                Join us{' '}
                <Icon
                  as={ChevronDown}
                  size='xs'
                  transform={
                    collapsibleOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }
                  transition='transform 0.2s'
                />
              </Button>
            </Collapsible.Trigger>

            <Collapsible.Content>
              <Box
                position='absolute'
                top='calc(100% + 8px)'
                right={0}
                borderWidth='1px'
                borderRadius='md'
                boxShadow='lg'
                zIndex={10}
                minW='200px'
              >
                <VStack align='stretch' gap={0} p={2}>
                  {menuList.map((item) => (
                    <Button
                      key={item.value}
                      variant='ghost'
                      bg={
                        selectedRole === item.value ? 'blue.100' : 'transparent'
                      }
                      color='dark'
                      _hover={{
                        bg:
                          selectedRole === item.value ? 'blue.200' : 'gray.100',
                      }}
                      onClick={() => handleRoleSelect(item.value)}
                      p={3}
                      w='full'
                      justifyContent='flex-start'
                      borderRadius='md'
                    >
                      {item.label}
                    </Button>
                  ))}
                </VStack>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </Box>
      ) : (
        /* DESKTOP: Menu */
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
            >
              Join us <Icon as={ArrowRight} size='sm' />
            </Button>
          </MenuTrigger>
          <Portal>
            <MenuPositioner>
              <MenuContent p={3}>
                <RadioGroup.Root
                  variant='outline'
                  size='sm'
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
                          selectedRole === item.value
                            ? 'blue.200'
                            : 'transparent'
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
      )}
    </HStack>
  );
};
