import { EventDetailPage } from '@/components/event/EventDetail';
import { mockEvents } from '@/components/event/EventSection';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetails({ params }: PageProps) {
  const { id } = await params;

  const event = Array.isArray(mockEvents)
    ? mockEvents.find((e) => e.id === id)
    : null;

  if (!event) notFound();

  return <EventDetailPage event={event} />;
}
