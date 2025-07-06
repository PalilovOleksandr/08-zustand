import CreateNote from '@/components/CreateNote/CreateNote';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note - NoteHub',
  description: 'Create your own note on NoteHub.',
  openGraph: {
    title: 'Create note - NoteHub',
    description: 'Create your own note on NoteHub.',
    url: 'https://08-zustand-pink.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create note',
      },
    ],
  },
};
const CreateNotePage = () => {
  return <CreateNote />;
};

export default CreateNotePage;
