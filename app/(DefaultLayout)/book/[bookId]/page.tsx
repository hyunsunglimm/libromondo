import { BookResponseType } from "@/types/book";
import { redirect } from "next/navigation";
import ShowMoreBooks from "./components/ShowMoreBooks";
import DetailBook from "./components/DetailBook";
import { Metadata } from "next";

type BookDetailPageProps = {
  params: {
    bookId: string;
  };
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { bookId } = params;

  const book = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${bookId}`
  )
    .then((res) => res.json())
    .then((data) => data.documents[0]);

  if (!book) return redirect("/");

  const sameAuthorBooks: BookResponseType[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/related?keyword=${book.authors[0]}`
  )
    .then((res) => res.json())
    .then((data) => data.documents);

  const relatedBooks: BookResponseType[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/related?keyword=${book.title.slice(0, 2)}`
  )
    .then((res) => res.json())
    .then((data) => data.documents);

  return (
    <section className="max-w-[832px] w-full mx-auto px-4">
      <DetailBook book={book} bookId={bookId} />
      <div className="md:hidden">
        <ShowMoreBooks
          books={sameAuthorBooks}
          title="같은 작가의 책"
          slidesPerView={3}
        />
      </div>
      <div className="hidden md:block">
        <ShowMoreBooks
          books={sameAuthorBooks}
          title="같은 작가의 책"
          slidesPerView={4}
        />
      </div>
      <div className="md:hidden">
        <ShowMoreBooks
          books={relatedBooks}
          title="관련있는 책"
          slidesPerView={3}
        />
      </div>
      <div className="hidden md:block">
        <ShowMoreBooks
          books={relatedBooks}
          title="관련있는 책"
          slidesPerView={4}
        />
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const bookId = params.bookId;

  const book = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${bookId}`
  )
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/${params.bookId}/`,
      images: book.thumbnail,
      siteName: "Libro Mondo",
      locale: "ko_KR",
    },
  };
}
