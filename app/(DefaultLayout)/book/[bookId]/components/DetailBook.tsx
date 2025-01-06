"use client";

import HeartToggle from "@/components/HeartToggle";
import { Button } from "@/components/ui/button";
import { BookResponseType } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import UsersWhoSavedBooks from "./UsersWhoSavedBooks";
import WriteReview from "./WriteReview";
import BookReviewInfo from "./BookReviewInfo";

type DetailBookProps = {
  book: BookResponseType;
  bookId: string;
};

export default function DetailBook({ book, bookId }: DetailBookProps) {
  const authors = book.authors.join(", ");
  const translators = book.translators.join(", ");

  return (
    <div className="border-2 border-black rounded-sm p-8">
      <div className="flex gap-8">
        <Image
          src={book.thumbnail}
          alt={`${book.title} 이미지`}
          width={400}
          height={400}
          className="w-1/3 rounded-lg shadow-lg shrink-0"
        />
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="font-bold text-4xl md:text-xl">{book.title}</p>
            <p className="text-2xl md:text-base">저자 : {authors}</p>
            <p className="text-2xl md:text-base">출판사 : {book.publisher}</p>
            {translators && (
              <p className="text-2xl md:text-base">번역 : {translators}</p>
            )}
            <p className="text-2xl md:text-base">
              가격 : <span className="line-through">{book.price}</span>{" "}
              {!book.status || book.sale_price <= 0 ? (
                <span className="text-red-500 bg-red-200 p-1 rounded-md">
                  판매중이 아니거나 E북으로만 판매중입니다.
                </span>
              ) : (
                `${book.sale_price}원`
              )}
            </p>
          </div>
          <div>
            <UsersWhoSavedBooks bookId={bookId} />
            <WriteReview book={book} />
          </div>
        </div>
      </div>
      <div className="bg-neutral-100 p-8 my-8 rounded-md">
        <p className="leading-10 text-xl md:text-base">{book.contents}</p>
      </div>
      <BookReviewInfo isbn={book.isbn} />
      <div className="flex gap-2 items-center">
        <Button asChild className="w-full text-2xl md:text-base h-12">
          <Link href={book.url} target="_blank">
            더 자세히 보러가기
          </Link>
        </Button>
        <HeartToggle book={book} />
      </div>
    </div>
  );
}
