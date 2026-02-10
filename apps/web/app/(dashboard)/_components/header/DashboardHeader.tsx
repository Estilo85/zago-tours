'use client';

import Button from '@/components/ui/button/Button';
import { Box, Heading, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PlanningCallDialog } from '../dialogs/PlanningCallDialog';
import { usePermissions } from '@/hooks';

export default function DashboardHeader() {
  const [isPlanningCallDialogOpen, setIsPlanningCallDialogOpen] =
    useState(false);
  const { isAnyAdmin } = usePermissions();
  return (
    <>
      <Box
        bg='primary'
        display='flex'
        justifyContent='center'
        alignItems='center'
        borderRadius='3xl'
        p={16}
        maxH={{ base: '200px', md: '300px' }}
        mb={10}
      >
        <VStack gap={9}>
          <Heading
            fontWeight='bolder'
            color='white'
            fontSize={{ base: '2xl', md: '3xl' }}
            letterSpacing='wider'
          >
            Dashboard
          </Heading>
          {!isAnyAdmin && (
            <Button
              bg='white'
              color='primary'
              onClick={() => setIsPlanningCallDialogOpen(true)}
            >
              Book your trip planning call
            </Button>
          )}
        </VStack>
      </Box>

      <PlanningCallDialog
        open={isPlanningCallDialogOpen}
        onOpenChange={(e) => setIsPlanningCallDialogOpen(e.open)}
      />
    </>
  );
}
