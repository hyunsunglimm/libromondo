import HeartIcon from "@/components/icons/HeartIcon";
import { Button } from "@/components/ui/button";
import { BookResponseType, KakaoBookResponse } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRef } from "react";
import ShowMoreBooks from "./components/ShowMoreBooks";

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

  const authors = book.authors.join(", ");
  const translators = book.translators.join(", ");

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
      <div className="border-2 border-black rounded-sm p-8">
        <div className="flex gap-8">
          <Image
            src={book.thumbnail}
            alt={`${book.title} 이미지`}
            width={400}
            height={400}
            className="w-1/3 rounded-lg shadow-lg"
          />
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">{book.title}</p>
            <p>저자 : {authors}</p>
            <p>출판사 : {book.publisher}</p>
            {translators && <p>번역 : {translators}</p>}
            <p>
              가격 : <span className="line-through">{book.price}</span>{" "}
              {book.status !== "정상판매" ? (
                <span className="text-red-500 bg-red-200 p-1 rounded-md">
                  판매중이 아닙니다.
                </span>
              ) : (
                `${book.sale_price}원`
              )}
            </p>
          </div>
        </div>
        <div className="bg-neutral-100 p-8 my-8 rounded-md">
          <p className="leading-10">{book.contents}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button asChild className="w-full">
            <Link href={book.url} target="_blank">
              더 자세히 보러가기
            </Link>
          </Button>
          <HeartIcon />
        </div>
      </div>

      <ShowMoreBooks books={sameAuthorBooks} title="같은 작가의 책" />
      <ShowMoreBooks books={relatedBooks} title="관련있는 책" />
    </section>
  );
}
