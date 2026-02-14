'use client';

import { Box, Flex, Stack } from '@chakra-ui/react';
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
    <Stack gap={{ base: 6, md: 8 }} maxW='800px' w='full'>
      {items.map((item, index) => (
        <Flex
          key={index}
          gap={{ base: 4, md: 6 }}
          direction='row'
          alignItems='flex-start'
          ref={(el: any) => (contentRefs.current[index] = el)}
          data-step-index={index}
        >
          {/* Inline Step Indicator */}
          <Flex direction='column' alignItems='center' flexShrink={0} pt={2}>
            {/* Circle Indicator */}
            <Box
              w={{ base: '35px', md: '35px' }}
              h={{ base: '35px', md: '35px' }}
              borderRadius='full'
              bg='secondary'
              border='7px solid'
              borderColor={activeStep === index ? 'primary' : 'transparent'}
              transition='border-color 0.3s ease'
              flexShrink={0}
            />

            {/* Connector Line */}
            {index < items.length - 1 && (
              <Box
                w='2px'
                flex='1'
                bg='primary'
                transition='background-color 0.3s ease'
                minH='100px'
              />
            )}
          </Flex>

          {/* Content */}
          <Box flex='1' w='full'>
            {item.content}
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};

// 'use client';

// import { Box, Stack, Steps } from '@chakra-ui/react';
// import { useEffect, useRef, useState } from 'react';

// interface StepItem {
//   content?: React.ReactNode;
// }

// interface ScrollProgressStepsProps {
//   items: StepItem[];
// }

// export const ScrollProgressSteps = ({ items }: ScrollProgressStepsProps) => {
//   const [activeStep, setActiveStep] = useState(0);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = Number(entry.target.getAttribute('data-step-index'));
//             setActiveStep(index);
//           }
//         });
//       },
//       {
//         threshold: 0.3,
//         rootMargin: '-5% 0px -45% 0px',
//       },
//     );

//     contentRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => observer.disconnect();
//   }, [items]);

//   return (
//     <Steps.Root
//       orientation='vertical'
//       step={activeStep}
//       count={items.length}
//       gap={{ base: 6, md: 8 }}
//     >
//       <Stack gap={0} w='full'>
//         {items.map((item, index) => (
//           <Box
//             key={index}
//             ref={(el: any) => (contentRefs.current[index] = el)}
//             data-step-index={index}
//             w='full'
//           >
//             <Steps.Item index={index}>
//               <Steps.Indicator
//                 w={{ base: '35px', md: '35px' }}
//                 h={{ base: '35px', md: '35px' }}
//                 borderRadius='full'
//                 bg='secondary'
//                 border='7px solid'
//                 borderColor={activeStep === index ? 'primary' : 'transparent'}
//                 transition='border-color 0.3s ease'
//               />
//               {index < items.length - 1 && (
//                 <Steps.Separator
//                   w='2px'
//                   bg='primary'
//                   minH='100px'
//                 />
//               )}
//             </Steps.Item>

//             {/* Content below indicator */}
//             <Box ml={{ base: '47px', md: '47px' }} mt={4} mb={6} w='full'>
//               {item.content}
//             </Box>
//           </Box>
//         ))}
//       </Stack>
//     </Steps.Root>
//   );
// };
