'use client';

import { Dialog, Flex, Icon, IconButton, Portal, Text } from '@chakra-ui/react';
import { Input, Textarea, Stack } from '@chakra-ui/react';
import Button from '@/components/ui/button/Button';
import { useState } from 'react';
import { X } from 'lucide-react';

interface TripRequestDialogProps {
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
}

export const TripRequestDialog = ({
  open,
  onOpenChange,
}: TripRequestDialogProps) => {
  const [formData, setFormData] = useState({
    tripType: '',
    destination: '',
    date: '',
    preference: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trip Request:', formData);
    // Handle form submission here (API call, etc.)

    // Reset form and close dialog
    setFormData({
      tripType: '',
      destination: '',
      date: '',
      preference: '',
    });

    onOpenChange({ open: false });
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      tripType: '',
      destination: '',
      date: '',
      preference: '',
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={{ base: 1, md: 6 }}>
            <Dialog.Header>
              <Dialog.Title
                width='full'
                fontSize='2xl'
                color='primary'
                fontWeight='bold'
                textAlign='center'
                mt={10}
              >
                Request a Trip
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body spaceY='4'>
              <form onSubmit={handleSubmit} id='trip-request-form'>
                <Stack gap={4}>
                  <Stack gap={2}>
                    <label htmlFor='tripType'>Trip Type</label>
                    <Input
                      id='tripType'
                      name='tripType'
                      placeholder='e.g., Business, Leisure, Adventure'
                      value={formData.tripType}
                      onChange={handleInputChange}
                      required
                    />
                  </Stack>

                  <Stack gap={2}>
                    <label htmlFor='destination'>Destination</label>
                    <Input
                      id='destination'
                      name='destination'
                      placeholder='Where would you like to go?'
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                    />
                  </Stack>

                  <Stack gap={2}>
                    <label htmlFor='date'>Date</label>
                    <Input
                      id='date'
                      name='date'
                      type='date'
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </Stack>

                  <Stack gap={2}>
                    <label htmlFor='preference'>Preferences</label>
                    <Textarea
                      id='preference'
                      name='preference'
                      placeholder='Any special requests or preferences?'
                      value={formData.preference}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </Stack>
                </Stack>
              </form>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <IconButton
                  aria-label='Search database'
                  variant='outline'
                  onClick={handleCancel}
                >
                  <X size={48} />
                </IconButton>
              </Dialog.CloseTrigger>

              <Button
                width='full'
                bg='primary'
                type='submit'
                form='trip-request-form'
              >
                Submit Request
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
