'use client';

import css from './TagsMenu.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { TagsProps } from '@/types/note';

const TagsMenu = ({ tags }: TagsProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const toggle = () => setIsOpenMenu(!isOpenMenu);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={toggle}
        className={css.menuButton}
        aria-label={isOpenMenu ? 'Close notes menu' : 'Open notes menu'}
      >
        Notes ▾
      </button>
      {isOpenMenu && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/all`}
              className={css.menuLink}
              onClick={toggle}
              aria-expanded={isOpenMenu}
              aria-haspopup="true"
              aria-label="View all notes"
              role="menuitem"
            >
              All Notes
            </Link>
          </li>
          {tags.map(tag => (
            <li
              key={tag}
              className={css.menuItem}
              aria-label={`View notes tagged with ${tag}`}
              role="menuitem"
            >
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
