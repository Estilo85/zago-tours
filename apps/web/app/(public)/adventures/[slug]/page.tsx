interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdventureDetails({ params }: PageProps) {
  // In Next.js 15/16, params is a Promise that must be awaited
  const { slug } = await params;

  return (
    <div>
      <h1>Adventure Detail</h1>
      <p>Viewing adventure: {slug}</p>
    </div>
  );
}
