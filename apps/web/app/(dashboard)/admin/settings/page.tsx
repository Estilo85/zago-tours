'use client';

import React from 'react';
import {
  Box,
  Card,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Badge,
  Separator,
  Stack,
  Heading,
  Field,
} from '@chakra-ui/react';
import {
  Settings,
  Globe,
  Mail,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Power,
  PowerOff,
} from 'lucide-react';
import {
  useSettings,
  useUpdateSettings,
  useEnableMaintenance,
  useDisableMaintenance,
  useClearCache,
} from '@/hooks';
import { LoadingState } from '@/components/ui/LoadingState';

export default function PlatformSettings() {
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();
  const enableMaintenanceMutation = useEnableMaintenance();
  const disableMaintenanceMutation = useDisableMaintenance();
  const clearCacheMutation = useClearCache();

  const [siteName, setSiteName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');

  React.useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName || '');
      setContactEmail(settings.contactEmail || '');
    }
  }, [settings]);

  const handleUpdateSiteName = async () => {
    if (!siteName.trim()) return;
    await updateMutation.mutateAsync({ siteName });
  };

  const handleUpdateContactEmail = async () => {
    if (!contactEmail.trim()) return;
    await updateMutation.mutateAsync({ contactEmail });
  };

  const handleToggleMaintenance = async () => {
    if (settings?.maintenance) {
      await disableMaintenanceMutation.mutateAsync();
    } else {
      await enableMaintenanceMutation.mutateAsync();
    }
  };

  const handleClearCache = async () => {
    if (
      window.confirm(
        'Are you sure you want to clear the system cache? This may temporarily affect performance.',
      )
    ) {
      await clearCacheMutation.mutateAsync();
    }
  };

  if (isLoading) return <LoadingState />;

  return (
    <Box p={6}>
      <VStack align='stretch' gap={6} maxW='4xl'>
        {/* Header */}
        <HStack gap={3}>
          <Settings size={28} />
          <Heading size='xl'>Platform Settings</Heading>
        </HStack>

        {/* Maintenance Mode Status */}
        {settings?.maintenance && (
          <Card.Root bg='orange.50' borderColor='orange.200' borderWidth='1px'>
            <Card.Body>
              <HStack gap={3}>
                <AlertTriangle
                  size={20}
                  color='var(--chakra-colors-orange-600)'
                />
                <VStack align='start' gap={0} flex='1'>
                  <Text fontWeight='semibold' color='orange.800'>
                    Maintenance Mode Active
                  </Text>
                  <Text fontSize='sm' color='orange.700'>
                    Your site is currently in maintenance mode and not
                    accessible to users.
                  </Text>
                </VStack>
              </HStack>
            </Card.Body>
          </Card.Root>
        )}

        {/* Site Information */}
        <Card.Root>
          <Card.Header>
            <HStack gap={2}>
              <Globe size={20} />
              <Heading size='md'>Site Information</Heading>
            </HStack>
          </Card.Header>
          <Card.Body>
            <Stack gap={5}>
              {/* Site Name */}
              <Field.Root>
                <Field.Label>Site Name</Field.Label>
                <HStack gap={3}>
                  <Input
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder='Enter site name'
                    flex='1'
                  />
                  <Button
                    colorPalette='blue'
                    onClick={handleUpdateSiteName}
                    loading={updateMutation.isPending}
                    disabled={
                      !siteName.trim() || siteName === settings?.siteName
                    }
                  >
                    Update
                  </Button>
                </HStack>
              </Field.Root>

              <Separator />

              {/* Contact Email */}
              <Field.Root>
                <Field.Label>Contact Email</Field.Label>
                <HStack gap={3}>
                  <Input
                    type='email'
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder='contact@example.com'
                    flex='1'
                  />
                  <Button
                    colorPalette='blue'
                    onClick={handleUpdateContactEmail}
                    loading={updateMutation.isPending}
                    disabled={
                      !contactEmail.trim() ||
                      contactEmail === settings?.contactEmail
                    }
                  >
                    Update
                  </Button>
                </HStack>
              </Field.Root>

              {/* Last Updated */}
              {settings?.updatedAt && (
                <>
                  <Separator />
                  <HStack gap={2}>
                    <Text fontSize='sm' color='fg.muted'>
                      Last updated:
                    </Text>
                    <Text fontSize='sm' fontWeight='medium'>
                      {new Date(settings.updatedAt).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </Text>
                  </HStack>
                </>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Maintenance Mode */}
        <Card.Root>
          <Card.Header>
            <HStack gap={2}>
              <Power size={20} />
              <Heading size='md'>Maintenance Mode</Heading>
            </HStack>
          </Card.Header>
          <Card.Body>
            <VStack align='stretch' gap={4}>
              <HStack justify='space-between'>
                <VStack align='start' gap={1}>
                  <Text fontWeight='semibold'>Current Status</Text>
                  <Badge
                    size='lg'
                    colorPalette={settings?.maintenance ? 'orange' : 'green'}
                    variant='subtle'
                  >
                    {settings?.maintenance ? (
                      <HStack gap={2}>
                        <PowerOff size={14} />
                        <span>Maintenance Active</span>
                      </HStack>
                    ) : (
                      <HStack gap={2}>
                        <CheckCircle size={14} />
                        <span>Site Live</span>
                      </HStack>
                    )}
                  </Badge>
                </VStack>

                <Button
                  colorPalette={settings?.maintenance ? 'green' : 'orange'}
                  onClick={handleToggleMaintenance}
                  loading={
                    enableMaintenanceMutation.isPending ||
                    disableMaintenanceMutation.isPending
                  }
                >
                  {settings?.maintenance ? (
                    <>
                      <Power size={16} />
                      Disable Maintenance
                    </>
                  ) : (
                    <>
                      <PowerOff size={16} />
                      Enable Maintenance
                    </>
                  )}
                </Button>
              </HStack>

              <Box p={4} bg='bg.muted' borderRadius='md' borderWidth='1px'>
                <Text fontSize='sm' color='fg.muted'>
                  When maintenance mode is enabled, your site will display a
                  maintenance page to all visitors. Only administrators will be
                  able to access the dashboard.
                </Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* System Actions */}
        <Card.Root>
          <Card.Header>
            <HStack gap={2}>
              <Settings size={20} />
              <Heading size='md'>System Actions</Heading>
            </HStack>
          </Card.Header>
          <Card.Body>
            <VStack align='stretch' gap={4}>
              {/* Clear Cache */}
              <HStack justify='space-between'>
                <VStack align='start' gap={1}>
                  <Text fontWeight='semibold'>Clear System Cache</Text>
                  <Text fontSize='sm' color='fg.muted'>
                    Clear cached data to ensure fresh content delivery
                  </Text>
                </VStack>

                <Button
                  colorPalette='red'
                  variant='outline'
                  onClick={handleClearCache}
                  loading={clearCacheMutation.isPending}
                >
                  <Trash2 size={16} />
                  Clear Cache
                </Button>
              </HStack>

              <Box
                p={3}
                bg='yellow.50'
                borderRadius='md'
                borderWidth='1px'
                borderColor='yellow.200'
              >
                <Text fontSize='xs' color='yellow.800'>
                  ⚠️ Clearing cache may temporarily affect site performance as
                  new data is loaded.
                </Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Settings ID (for debugging) */}
        {settings?.id && (
          <Box p={3} bg='bg.muted' borderRadius='md'>
            <Text fontSize='xs' color='fg.muted' fontFamily='mono'>
              Settings ID: {settings.id}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
