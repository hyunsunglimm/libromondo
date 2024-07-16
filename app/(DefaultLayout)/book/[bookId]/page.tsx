import { BookResponseType } from "@/types/book";
import { redirect } from "next/navigation";
import ShowMoreBooks from "./components/ShowMoreBooks";
import DetailBook from "./components/DetailBook";

type BookDetailPageProps = {
  params: {
    bookId: string;
  };
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { bookId } = params;

  const book = await fetch(`${process.env.BASE_URL}/api/book/${bookId}`)
    .then((res) => res.json())
    .then((data) => data.documents[0]);

  if (!book) return redirect("/");

  const sameAuthorBooks: BookResponseType[] = await fetch(
    `${process.env.BASE_URL}/api/book/related?query=${book.authors[0]}`
  )
    .then((res) => res.json())
    .then((data) => data.documents);

  const relatedBooks: BookResponseType[] = await fetch(
    `${process.env.BASE_URL}/api/book/related?query=${book.title.slice(0, 2)}`
  )
    .then((res) => res.json())
    .then((data) => data.documents);

  return (
    <section className="max-w-[832px] w-full mx-auto px-4">
      <DetailBook book={book} bookId={bookId} />
      <ShowMoreBooks books={sameAuthorBooks} title="같은 작가의 책" />
      <ShowMoreBooks books={relatedBooks} title="관련있는 책" />
    </section>
  );
}
