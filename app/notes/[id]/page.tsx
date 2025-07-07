import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const { title, content, tag } = await fetchNoteById(Number(id));
  return {
    title,
    description: `${tag} note with task ${content}`,
    openGraph: {
      title,
      description: `${tag} note with task ${content}`,
      url: `https://08-zustand-pink.vercel.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${tag} note with task ${content}`,
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  const parseId = Number(id);
  queryClient.prefetchQuery({
    queryKey: ['note', parseId],
    queryFn: () => fetchNoteById(parseId),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </>
  );
};

export default NoteDetails;
