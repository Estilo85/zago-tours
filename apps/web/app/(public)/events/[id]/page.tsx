'use client';

import { EventDetailPage } from '@/components/event/EventDetail';
import { useEvent } from '@/hooks';
import { notFound, useParams } from 'next/navigation';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';

export default function EventDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, error } = useEvent(id);

  if (isLoading) return <LoadingState message='Loading events...' />;
  if (isError) return <ErrorState message={error?.message} />;

  // Not found
  if (!data?.data) {
    notFound();
  }

  return <EventDetailPage event={data.data} />;
}
