'use client';

import { StoryHero } from '@/components/our-story/StoryHero';
import TransformationSection from '@/components/our-story/TransformationSection';
import PurposeSection from '@/components/our-story/PurposeSection';
import { ScrollProgressSteps } from '@/components/ui/stepper/scroll-progress-step';
import { Box, Center, Stack, Text } from '@chakra-ui/react';

const mySteps = [
  {
    content: (
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        facere quasi natus fuga, alias sint consectetur sapiente autem impedit
        ad dolore beatae magnam totam vitae iure ipsam. Eligendi inventore
        porro, excepturi dolores nesciunt nulla animi explicabo iure temporibus,
        perferendis ad. Labore, magni earum ea eligendi laborum nostrum soluta
        cum suscipit facere explicabo aperiam, sint aliquid blanditiis, sequi
        incidunt! Maiores nisi unde asperiores sit quidem minima earum eveniet
        error ullam harum atque ad, fugit nam in autem eum fugiat maxime, ea ut
        adipisci placeat! Doloremque odit dicta quae saepe culpa accusamus
        perferendis eos nisi, mollitia iste tenetur blanditiis, cupiditate
        voluptatem laboriosam ratione. Laboriosam sit adipisci ad doloribus
        impedit at, tempora odio quibusdam, cumque vero, esse cupiditate rem sed
      </h1>
    ),
  },
  {
    content: (
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eaque
        hic dolore dolorem nobis provident eius, qui itaque modi, aliquid
        corporis quo dicta tempore esse ratione numquam quia quod quibusdam sit
        accusantium quidem molestiae? Repellendus sequi suscipit dolore facere
        ullam? Libero quibusdam natus exercitationem officia quam ducimus
        nesciunt. Maiores incidunt eos asperiores eius odit exercitationem
        dignissimos doloribus, officiis recusandae sapiente cumque. Quibusdam
        quam, dignissimos architecto sunt est unde veritatis, distinctio iste
        iusto modi voluptate. Nam at deleniti, maxime quisquam nulla iure dolor
        deserunt, perspiciatis excepturi corporis dolorum mollitia aut ea quos
        minima eligendi eos tenetur facilis error? Dignissimos exercitationem
        rerum, reiciendis odit sunt repellendus voluptatum dolor velit vitae
        dolores, fugit, eum aliquam blanditiis aut? Nihil iste magni deserunt ab
        expedita magnam eligendi maiores laboriosam nobis, quaerat, blanditiis
      </h1>
    ),
  },
  {
    content: (
      <h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
        reiciendis quas ullam amet quibusdam ea enim hic, quae temporibus esse
        quos. Amet id voluptatum ex repudiandae nulla, quisquam consectetur
        adipisci molestias! Voluptatem, mollitia! Iure, ullam esse cumque soluta
        quas explicabo laboriosam autem ad voluptate ex nam recusandae, est
        itaque non eveniet porro consequatur nulla adipisci ducimus iste ipsa
        reprehenderit deserunt voluptate! Quos repellat, perferendis vitae,
      </h1>
    ),
  },
];

export default function OurStory() {
  return (
    <Box my={10} mx={{ base: '4', md: '10' }}>
      <Stack gap={20}>
        {' '}
        <StoryHero />
        {/* Story Section */}
        <Stack textAlign='center' gap={8}>
          <Center>
            <Text
              border='1px solid'
              borderColor='primary'
              px={4}
              py={1}
              borderRadius='full'
            >
              Our story
            </Text>
          </Center>
          <Text
            fontSize={{ base: 'xl', md: '3xl' }}
            color='primary'
            fontWeight='bolder'
          >
            The moment everything <br /> changed
          </Text>
          <ScrollProgressSteps items={mySteps} />
        </Stack>
        <TransformationSection />
        <PurposeSection />
      </Stack>
    </Box>
  );
}
