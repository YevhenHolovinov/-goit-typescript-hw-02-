interface Props {
  handleLoadMore: () => void;
  isActive: boolean;
}

export default function LoadMoreBtn({ handleLoadMore, isActive }: Props) {
  return (
    <button onClick={handleLoadMore} type="button" disabled={isActive}>
      Load more
    </button>
  );
}
