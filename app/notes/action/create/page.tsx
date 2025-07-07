import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';
import css from './page.module.css';

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
const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
