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
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  DialogBackdrop,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowRight, LogOut } from 'lucide-react';
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
  const [dialogOpen, setDialogOpen] = useState(false);

  // Detect if mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Store action
  const selectedRole = useRoleStore((state) => state.role);
  const setRole = useRoleStore((state) => state.setRole);

  const handleRoleSelect = (value: string) => {
    setRole(value);
    setDialogOpen(false);
    router.push('/register');
  };

  if (isAuthenticated) {
    return (
      <Button
        aria-label='logout'
        alignItems='center'
        gap={3}
        fontWeight='bold'
        p={5}
        cursor='pointer'
        bg='red.500'
        color='white'
        _hover={{ bg: 'red.600' }}
        onClick={logout}
      >
        Logout <Icon as={LogOut} size={{ base: 'xs', md: 'sm' }} />
      </Button>
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

      {/* MOBILE: Dialog */}
      {isMobile ? (
        <DialogRoot
          open={dialogOpen}
          onOpenChange={(e) => setDialogOpen(e.open)}
        >
          <DialogTrigger asChild>
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
              Join us <Icon as={ArrowRight} size='xs' />
            </Button>
          </DialogTrigger>

          <Portal>
            <DialogBackdrop />
            <DialogContent>
              <DialogHeader>
                <Text fontSize='lg' fontWeight='bold'>
                  Select Your Role
                </Text>
              </DialogHeader>
              <DialogCloseTrigger />

              <DialogBody>
                <VStack align='stretch' gap={3} py={4}>
                  {menuList.map((item) => (
                    <Button
                      key={item.value}
                      variant={
                        selectedRole === item.value ? 'solid' : 'outline'
                      }
                      bg={
                        selectedRole === item.value ? 'blue.500' : 'transparent'
                      }
                      color={selectedRole === item.value ? 'white' : 'dark'}
                      _hover={{
                        bg:
                          selectedRole === item.value ? 'blue.600' : 'gray.100',
                      }}
                      onClick={() => handleRoleSelect(item.value)}
                      p={4}
                      w='full'
                      justifyContent='flex-start'
                    >
                      {item.label}
                    </Button>
                  ))}
                </VStack>
              </DialogBody>
            </DialogContent>
          </Portal>
        </DialogRoot>
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
