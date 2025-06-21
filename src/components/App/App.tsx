import { useEffect, useMemo, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import './App.module.css';
import fetchGalleryPhotos from '../../Photo-Search';
import { FetchGalleryPhotosResponse, Photo } from '../../types/photo';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [queryValue, setQueryValue] = useState<string>('');
  const [gallery, setGallery] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>('');
  const [altDescription, setAltDescription] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queryValue === '') return;

    const handleSearch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data: FetchGalleryPhotosResponse = await fetchGalleryPhotos(
          queryValue,
          page
        );
        console.log('data: ', data);
        if (data.total === 0) return;
        setGallery((prevGallery) => {
          return [...prevGallery, ...data.results];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  }, [page, queryValue]);

  useEffect(() => {
    if (page === 1) return;

    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [page, gallery]);

  const handleQuery = (newQuery: string) => {
    setQueryValue(newQuery);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const isActive = useMemo(() => page === totalPages, [page, totalPages]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateModalStateData = (src: string, alt: string) => {
    setModalImage(src);
    setAltDescription(alt);
  };

  return (
    <div ref={ref}>
      <SearchBar onSubmit={handleQuery} />
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          openModal={openModal}
          updateModalStateData={updateModalStateData}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {gallery.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isActive={isActive} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage}
        alt={altDescription}
      />
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}
