export type Tags = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tags;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: Tags;
}

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number | undefined;
}

export interface TagsProps {
  tags: Tags[];
}
