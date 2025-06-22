import css from './ImageCard.module.css';

import { PhotoUrls } from '../../types/photo';

interface Props {
  alt_description: string;
  urls: PhotoUrls;
  updateModalStateData: (url: string, alt: string) => void;
}

export default function ImageCard({
  alt_description,
  urls,
  updateModalStateData,
}: Props) {
  return (
    <div
      className={css.cardWrapper}
      onClick={() => updateModalStateData(urls.regular, alt_description)}
    >
      <img className={css.cardImage} src={urls.small} alt={alt_description} />
      <p className={css.cardDescription}>{alt_description}</p>
    </div>
  );
}
