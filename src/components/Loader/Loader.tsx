import ClipLoader from 'react-spinners/ClipLoader';

import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <ClipLoader
        //cssOverride={true}
        size={150}
        color={'#123abc'}
        loading={true}
        speedMultiplier={1.5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
