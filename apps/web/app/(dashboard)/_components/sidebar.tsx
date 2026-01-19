'use client';
import { Stack, Text, HStack, Icon, Box } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { LuLogOut } from 'react-icons/lu';
import { MENU_CONFIG } from '../_config/menu-config';
import { AppLink } from '@/components/ui/link/AppLink';

export const Sidebar = ({
  role,
  onClose,
}: {
  role: string;
  onClose?: () => void;
}) => {
  const pathname = usePathname();

  //==== NAVITEM ====
  const NavItem = ({ item }: any) => {
    const isActive = pathname === item.href;
    return (
      <AppLink
        href={item.href}
        onClick={onClose}
        p={3}
        borderRadius='md'
        bg={isActive ? 'textInverse' : 'transparent'}
        color={isActive ? 'dark' : 'textPrimary'}
        transition='0.2s'
        _hover={{ bg: isActive ? 'textPrimary' : 'whiteAlpha.200' }}
        textDecoration='none'
      >
        <Icon as={item.icon} boxSize={5} />
        <Text fontSize='sm' fontWeight='medium'>
          {item.label}
        </Text>
      </AppLink>
    );
  };

  //==== SECTION HEADING ====
  const SectionHeading = ({ children }: { children: string }) => (
    <Text
      fontSize='xs'
      fontWeight='bold'
      color='gray.400'
      mb={2}
      mt={4}
      letterSpacing='widest'
      px={2}
    >
      {children.toUpperCase()}
    </Text>
  );

  return (
    <Stack gap={6} h='full'>
      <Box>
        <SectionHeading>General Setting</SectionHeading>
        <Stack gap={1}>
          {MENU_CONFIG.common.main.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
          {/* Inject Role Specific Links here if needed */}
          {MENU_CONFIG.roles[role as keyof typeof MENU_CONFIG.roles]?.map(
            (item) => (
              <NavItem key={item.href} item={item} />
            ),
          )}
        </Stack>

        <SectionHeading>Support</SectionHeading>
        <Stack gap={1}>
          {MENU_CONFIG.common.support.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </Stack>
      </Box>

      <Box mt='auto'>
        <HStack
          p={3}
          cursor='pointer'
          color='red.500'
          _hover={{ bg: 'red.50' }}
          borderRadius='md'
        >
          <Icon as={LuLogOut} />
          <Text fontSize='sm' fontWeight='bold'>
            Logout
          </Text>
        </HStack>
      </Box>
    </Stack>
  );
};
