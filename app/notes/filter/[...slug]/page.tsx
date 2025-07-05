import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesProps = {
  params: Promise<{ slug: string }>;
};

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? '' : slug[0];
  const data = await fetchNotes({
    page: 1,
    searchQuery: '',
    tag,
  });
  console.log(tag);
  return <NotesClient initialData={data} tag={tag} />;
};

export default Notes;
