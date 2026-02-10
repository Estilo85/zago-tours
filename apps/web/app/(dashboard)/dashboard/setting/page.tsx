'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Avatar,
  Card,
  SimpleGrid,
  Badge,
  Field,
} from '@chakra-ui/react';

import { LuUser, LuMail, LuPhone, LuGlobe, LuSave } from 'react-icons/lu';
import { useUpdateProfile, useUserProfile } from '@/hooks';

export default function SettingPage() {
  const { data: profileResponse, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();

  const userData = profileResponse?.data;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    image: '',
  });

  // Sync data when fetched
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        phone: userData.phone || '',
        country: userData.country || '',
        image: userData.image || '',
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
  };

  if (isLoading) return <Box p={10}>Loading profile...</Box>;

  return (
    <Container maxW='4xl' py={10}>
      <Stack gap={8}>
        {/* Header Section */}
        <Box>
          <Heading size='2xl'>Account Settings</Heading>
          <Text color='fg.muted'>
            Manage your profile information and preferences.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {/* Left Side: Stats & Preview */}
          <Stack gap={6}>
            <Card.Root>
              <Card.Body py={8}>
                <Flex direction='column' align='center'>
                  <Avatar.Root size='2xl' mb={4}>
                    <Avatar.Fallback name={userData?.name} />
                    <Avatar.Image src={userData?.image} />
                  </Avatar.Root>
                  <Heading size='md'>{userData?.name}</Heading>
                  <Badge variant='subtle' colorPalette='blue' mt={2}>
                    {userData?.role}
                  </Badge>
                  <Text fontSize='sm' color='fg.muted' mt={1}>
                    {userData?.email}
                  </Text>
                </Flex>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Heading size='xs'>Quick Stats</Heading>
              </Card.Header>
              <Card.Body gap={3}>
                <HStack justify='space-between'>
                  <Text fontSize='sm'>Referrals</Text>
                  <Text fontWeight='bold'>
                    {userData?.stats?.totalReferrals}
                  </Text>
                </HStack>
                <HStack justify='space-between'>
                  <Text fontSize='sm'>Reviews</Text>
                  <Text fontWeight='bold'>{userData?.stats?.totalReviews}</Text>
                </HStack>
              </Card.Body>
            </Card.Root>
          </Stack>

          {/* Right Side: Edit Form */}
          <Card.Root gridColumn={{ md: 'span 2' }}>
            <Card.Header>
              <Heading size='md'>Profile Information</Heading>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap={5}>
                  <Field.Root>
                    <Field.Label>Full Name</Field.Label>
                    <HStack w='full'>
                      <Icon as={LuUser} color='fg.muted' />
                      <Input
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='John Doe'
                      />
                    </HStack>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Phone Number</Field.Label>
                    <HStack w='full'>
                      <Icon as={LuPhone} color='fg.muted' />
                      <Input
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='+1 234 567 890'
                      />
                    </HStack>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Country</Field.Label>
                    <HStack w='full'>
                      <Icon as={LuGlobe} color='fg.muted' />
                      <Input
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                        placeholder='e.g. Nigeria'
                      />
                    </HStack>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Profile Image URL</Field.Label>
                    <Input
                      name='image'
                      value={formData.image}
                      onChange={handleChange}
                      placeholder='https://example.com/avatar.jpg'
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Email Address</Field.Label>
                    <HStack w='full' opacity={0.6}>
                      <Icon as={LuMail} />
                      <Input
                        value={userData?.email}
                        readOnly
                        variant='subtle'
                      />
                    </HStack>
                    <Field.HelperText>Email cannot be changed</Field.HelperText>
                  </Field.Root>

                  <Flex justify='flex-end' pt={4}>
                    <Button
                      type='submit'
                      colorPalette='blue'
                      loading={updateProfile.isPending}
                      loadingText='Saving...'
                    >
                      <LuSave /> Save Changes
                    </Button>
                  </Flex>
                </Stack>
              </form>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
