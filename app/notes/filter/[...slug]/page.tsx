import { Metadata } from 'next';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const allNotes = slug[0] === 'all' ? 'All Notes' : `${slug[0]} notes`;
  return {
    title: allNotes,
    description:
      'Your centralized space for organizing and storing all your notes. Access, manage, and search all your important information in one place.',
    openGraph: {
      title: allNotes,
      description:
        'The centralized hub for all your notes. Organize, store, and easily access your entire collection of information.',
      url: `https://08-zustand-pink.vercel.app/notes/filter/${allNotes}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: allNotes,
        },
      ],
    },
  };
}

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? '' : slug[0];
  const data = await fetchNotes({
    page: 1,
    searchQuery: '',
    tag,
  });
  return <NotesClient initialData={data} tag={tag} />;
};

export default Notes;
