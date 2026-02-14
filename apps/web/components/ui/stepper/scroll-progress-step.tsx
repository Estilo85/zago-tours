'use client';

import { Box, Stack, Steps } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface StepItem {
  content?: React.ReactNode;
}

interface ScrollProgressStepsProps {
  items: StepItem[];
}

export const ScrollProgressSteps = ({ items }: ScrollProgressStepsProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-step-index'));
            setActiveStep(index);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-5% 0px -45% 0px',
      },
    );

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <Steps.Root
      orientation='vertical'
      step={activeStep}
      gap={{ base: 6, md: 8 }}
    >
      <Stack gap={0} w='full'>
        {items.map((item, index) => (
          <Box
            key={index}
            ref={(el: any) => (contentRefs.current[index] = el)}
            data-step-index={index}
            w='full'
            position='relative'
          >
            <Steps.Item index={index}>
              <Steps.Indicator
                w={{ base: '35px', md: '35px' }}
                h={{ base: '35px', md: '35px' }}
                borderRadius='full'
                bg='secondary'
                border='7px solid'
                borderColor={activeStep === index ? 'primary' : 'transparent'}
                transition='border-color 0.3s ease'
              />
              {index < items.length - 1 && (
                <Steps.Separator
                  w='2px'
                  bg='primary'
                  // Ensure the separator stretches to connect steps
                  flexGrow={1}
                />
              )}
            </Steps.Item>

            <Box
              position='absolute'
              top='35px'
              left={{ base: '47px', md: '47px' }}
              w='calc(100% - 47px)'
              pb={6}
            >
              {item.content}
            </Box>
          </Box>
        ))}
      </Stack>
    </Steps.Root>
  );
};
