import AdventureDetailPage from '@/components/adventure/AdventureDetail';
import { DUMMY_ADVENTURES } from '@/components/home/FeaturedAdventures';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdventureDetails({ params }: PageProps) {
  const { id } = await params;

  const adventure = DUMMY_ADVENTURES.find((item) => item.id === id);

  if (!adventure) {
    notFound();
  }

  return <AdventureDetailPage adventure={adventure} />;
}
