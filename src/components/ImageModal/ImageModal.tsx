import Modal from 'react-modal';

import css from './ImageModal.module.css';

interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  src: string;
  alt: string;
}

export default function ImageModal({
  modalIsOpen,
  closeModal,
  src,
  alt,
}: Props) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={closeModal} className={css.modalBtn}>
        close
      </button>
      <div>
        <img className={css.modalImg} src={src} alt={alt} />
        <p className={css.modalText}>{alt}</p>
      </div>
    </Modal>
  );
}
