'use client';

import css from './NoteForm.module.css';
import type { CreateNote, Tags } from '../../types/note';
import { createNote } from '../../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ErrorText from '../ErrorMessage/ErrorMessage';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import React from 'react';

// const NoteSchema = Yup.object().shape({
//     title: Yup.string().min(3, "Min. of 3 symbols").max(50, "Max. characters 50").required("Title is required"),
//     content: Yup.string().max(500, "Max. characters 500"),
//     tag: Yup.string().oneOf(['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'], "Invalid tag value").required("Select a note tag")
// }
// );

export default function NoteForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (noteData: CreateNote) => createNote(noteData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
      toast.success('Note added');
    },
  });

  const handleCreateTask = async (formData: FormData) => {
    const createNote = Object.fromEntries(formData);
    const data: CreateNote = {
      title: createNote.title as string,
      content: createNote.content ? (createNote.content as string) : undefined,
      tag: createNote.tag as Tags,
    };
    mutate(data);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleCreateTask}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending ? true : false}
        >
          Create note
        </button>
      </div>
      {isError && <ErrorText text="Please try again later..." />}
    </form>
  );
}
