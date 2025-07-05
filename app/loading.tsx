import type { CSSProperties } from 'react';
import { ScaleLoader } from 'react-spinners';
import css from './page.module.css';

const override: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const Loader = () => {
  return (
    <div className={css.backdrop}>
      <ScaleLoader color="#dc3545" cssOverride={override} />
    </div>
  );
};

export default Loader;
