'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import css from './page.module.css';
import { useDebounce } from 'use-debounce';
import { NotesHttpResponse } from '@/types/note';
import Link from 'next/link';

type NoteClientProps = {
  initialData: NotesHttpResponse;
  tag: string;
};

const NotesClient = ({ initialData, tag }: NoteClientProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data, error, isError } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        searchQuery: debouncedQuery,
        ...(tag !== '' && { tag }),
      }),
    placeholderData: keepPreviousData,
    initialData,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  if (isError) throw error;

  function handleSearchChange(query: string) {
    setSearchQuery(query);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearchChange} />
        {data?.totalPages !== undefined && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
