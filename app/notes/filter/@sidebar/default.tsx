import { TagsProps } from '@/types/note';
import css from './SidebarNotes.module.css';
import Link from 'next/link';

const SidebarNotes = ({
  tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'],
}: TagsProps) => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All Notes
        </Link>
      </li>
      {tags.map(tag => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
