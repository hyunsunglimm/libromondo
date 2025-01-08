import { BookResponseType } from "@/types/book";
import { redirect } from "next/navigation";
import ShowMoreBooks from "./components/ShowMoreBooks";
import DetailBook from "./components/DetailBook";
import { Metadata } from "next";
import { BASE_URL } from "@/constants/url";
import { getBookById } from "@/service/book";
import SameAuthorBookList from "./components/SameAuthorBookList";
import RelatedBookList from "./components/RelatedBookList";

type BookDetailPageProps = {
  params: {
    bookId: string;
  };
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { bookId } = params;

  const book = await getBookById(bookId);

  if (!book) return redirect("/");

  return (
    <section className="max-w-[832px] w-full mx-auto px-4">
      <DetailBook book={book} />
      <SameAuthorBookList author={book.authors[0]} size={4} />
      <RelatedBookList bookId={bookId} size={4} />
    </section>
  );
}

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const bookId = params.bookId;

  const book = await fetch(`${BASE_URL}/api/book/${bookId}`)
    .then((res) => res.json())
    .then((data) => data.documents[0]);

  if (!book) return redirect("/");

  const title = `${book.title} (${book.authors[0]})`;
  const description = book.contents;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${BASE_URL}/book/${params.bookId}/`,
      images: book.thumbnail,
      siteName: "Libro Mondo",
      locale: "ko_KR",
    },
  };
}
