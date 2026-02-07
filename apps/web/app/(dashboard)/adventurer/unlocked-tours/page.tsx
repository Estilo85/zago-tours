import { AppLink } from '@/components/ui/link/AppLink';
import { Box, Button, Grid, Heading, Card, Text } from '@chakra-ui/react';
import React from 'react';

const videos = [
  {
    name: 'Game Drive',
    url: 'https://drive.google.com/file/d/1LRshOeMAg5ltR0sHhyBxftN4vz48xNpG/view?usp=drivesdk',
  },
  {
    name: 'Paragliding',
    url: 'https://drive.google.com/file/d/1LuR89ANET_fDIHetCGEoevZASk3RBm6Y/view?usp=drivesdk',
  },
  {
    name: 'Tarangire',
    url: 'https://drive.google.com/file/d/1gL3ZO5JEPTQrkujHnOIvf3Xm5CC_B6X1/view?usp=drivesdk',
  },
];

export default function UnlockedTours() {
  return (
    <Box p={8}>
      <Heading mb={6}>Unlocked Tours</Heading>

      <Grid
        gridTemplateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {videos.map((video, index) => (
          <Card.Root key={index} boxShadow='md' borderRadius='lg'>
            <Card.Body>
              <Box mb={4}>
                <iframe
                  src={video.url.replace('/view?usp=drivesdk', '/preview')}
                  width='100%'
                  height='200'
                  style={{ borderRadius: '8px', border: 'none' }}
                  title={video.name}
                />
              </Box>
              <Heading size='md'>{video.name}</Heading>
            </Card.Body>

            <Card.Footer>
              <AppLink
                href={video.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button bg='primary' color='white' width='100%'>
                  Watch Full Video
                </Button>
              </AppLink>
            </Card.Footer>
          </Card.Root>
        ))}
      </Grid>
    </Box>
  );
}
