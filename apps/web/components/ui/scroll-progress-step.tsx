'use client';

import { Box, Flex, Steps } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface StepItem {
  content: React.ReactNode;
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
            console.log('Current Active Step:', index);
            setActiveStep(index);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-5% 0px -45% 0px',
      }
    );

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <Flex gap={{ base: '6', md: '10' }} direction='row' alignItems='stretch'>
      {/* LEFT SIDE: Indicators */}
      <Box>
        <Steps.Root
          orientation='vertical'
          step={activeStep}
          count={items.length}
        >
          <Steps.List>
            {items.map((_, index) => (
              <Steps.Item
                index={index}
                key={index}
                // minHeight='60vh'
                data-active={activeStep === index ? '' : undefined}
              >
                <Steps.Trigger>
                  <Steps.Indicator
                    bg='secondary'
                    border='5px solid'
                    borderColor={
                      activeStep === index ? 'primary' : 'transparent'
                    }
                    color='transparent'
                    transition='border-color 0.3s ease'
                  />
                </Steps.Trigger>
                {index < items.length - 1 && (
                  <Steps.Separator
                    bg={activeStep > index ? 'primary' : 'gray.200'}
                    flex='1'
                  />
                )}
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps.Root>
      </Box>

      {/* RIGHT SIDE: Content */}
      <Box flex='1'>
        {items.map((item, index) => (
          <Box
            key={index}
            ref={(el: any) => (contentRefs.current[index] = el)}
            data-step-index={index}
            minHeight='50vh'
            pt='2'
          >
            {item.content}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
