type BookDetailPageProps = {
  params: {
    bookId: string;
  };
};

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const bookId = params.bookId;
  return <p>{bookId}</p>;
}
