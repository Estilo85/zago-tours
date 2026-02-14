'use client';

import { AppLink } from '@/components/ui/link/AppLink';
import { Box, Button, Grid, Heading, Card, Text } from '@chakra-ui/react';
import React from 'react';

const videos = [
  {
    name: 'Tarangire National Park: Wildlife Watching',
    url: 'https://youtube.com/shorts/k4Wrre-s--I',
  },
  {
    name: 'Hot Air Balloon Safari (South Africa)',
    url: 'https://youtu.be/lWtPeN8NYNQ',
  },
  {
    name: ' Masai Mara (Kenya)',
    url: 'https://youtu.be/h6Xd_tsqt50 ',
  },
  {
    name: '   Inca Trail Trek (Peru)',
    url: 'https://youtube.com/shorts/Jmq5TNyGDjI ',
  },
  {
    name: '  Island Hopping (Philippines)',
    url: 'https://youtube.com/shorts/MPBg_hmeCSg ',
  },
  {
    name: 'White water rafting (Uganda)',
    url: 'https://youtube.com/shorts/To6gLWHcwMA ',
  },
  {
    name: ' Game Driving and Viewing (South Africa):',
    url: 'https://youtu.be/b1bDfj8LvZ8 ',
  },
  {
    name: 'Mountain Trekking (Tanzania)',
    url: 'https://youtube.com/shorts/kNn6lu1MiNg ',
  },
  {
    name: 'Paragliding in South Africa',
    url: 'https://youtube.com/shorts/ZZmOg4Gx-jk ',
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
