import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../lib/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationFn: async (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted.');
      setDeletingId(null);
    },
    onError: () => {
      setDeletingId(null);
    },
  });
  const handleButton = (id: number) => {
    setDeletingId(id);
    mutate(id);
  };
  return (
    <section>
      {isError && (
        <ErrorMessage text="There was an error, please try again..." />
      )}
      <Toaster />
      <ul className={css.list}>
        {notes.map(({ id, title, content, tag }) => (
          <li className={css.listItem} key={id}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <Link href={`/notes/${id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => handleButton(id)}
                disabled={deletingId === id}
              >
                {deletingId === id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
