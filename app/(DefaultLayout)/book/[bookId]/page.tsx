import HeartIcon from "@/components/icons/HeartIcon";
import { Button } from "@/components/ui/button";
import { BookResponseType, KakaoBookResponse } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
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

  const res = await fetch(`${process.env.BASE_URL}/api/book/${bookId}`);
  const data: KakaoBookResponse = await res.json();
  const book = data.documents[0];

  if (!book) return redirect("/");

  const relatedBooks: BookResponseType[] = await fetch(
    `${process.env.BASE_URL}/api/book/related?query=${book.title.slice(0, 2)}`
  )
    .then((res) => res.json())
    .then((data) => data.documents);

  const sameAuthorBooks: BookResponseType[] = await fetch(
    `${process.env.BASE_URL}/api/book/related?query=${book.authors[0]}`
  )
    .then((res) => res.json())
    .then((data) => data.documents);

  return (
    <section className="max-w-[800px] mx-auto">
      <DetailBook book={book} />
      <ShowMoreBooks books={sameAuthorBooks} title="같은 작가의 책" />
      <ShowMoreBooks books={relatedBooks} title="관련있는 책" />
    </section>
  );
}
