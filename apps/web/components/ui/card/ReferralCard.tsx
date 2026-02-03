import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Box, Text, Skeleton } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { useCurrentUser } from '@/hooks';
import Button from '../button/Button';

export function ReferralCard() {
  const { data: userData, isLoading } = useCurrentUser();
  const [copied, setCopied] = useState(false);

  const referralLink = userData?.data?.referralLink;

  const handleCopyReferralLink = async () => {
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);

      toaster.create({
        title: 'Copied!',
        description: 'Referral link copied to clipboard',
        type: 'success',
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toaster.create({
        title: 'Failed to copy',
        description: 'Please try again',
        type: 'error',
      });
    }
  };

  if (isLoading) {
    return (
      <Box borderWidth='1px' borderRadius='lg' p={6} bg='bg.panel' shadow='sm'>
        <Skeleton height='6' width='75%' mb={4} />
        <Skeleton height='10' />
      </Box>
    );
  }

  if (!referralLink) {
    return null;
  }

  return (
    <Box borderWidth='1px' borderRadius='lg' p={6} bg='bg.panel' shadow='sm'>
      <Text fontSize='lg' fontWeight='semibold' mb={4} color='fg.default'>
        Invite others with your unique referral link
      </Text>

      <Button
        onClick={handleCopyReferralLink}
        width='full'
        bg='primary'
        color='white'
        variant='solid'
        size='md'
      >
        {copied ? (
          <>
            <Check size={16} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy Referral Link
          </>
        )}
      </Button>
    </Box>
  );
}
