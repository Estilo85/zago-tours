interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetails({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Adventure Detail</h1>
      <p>Viewing adventure: {id}</p>
    </div>
  );
}
