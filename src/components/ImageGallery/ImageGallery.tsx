import { Photo } from '../../types/photo';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

interface Props {
  gallery: Photo[];
  openModal: () => void;
  updateModalStateData: (url: string, alt: string) => void;
}

export default function ImageGallery({
  gallery,
  openModal,
  updateModalStateData,
}: Props) {
  return (
    <ul className={styles.itemsContainer}>
      {gallery.map(({ id, alt_description, urls }) => (
        <li className={styles.cardItem} key={id} onClick={openModal}>
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            updateModalStateData={updateModalStateData}
          />
        </li>
      ))}
    </ul>
  );
}
