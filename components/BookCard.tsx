"use client";

import { BookResponseType } from "@/types/book";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import HeartToggle from "./HeartToggle";
import { getBookIdByISBN } from "@/utils/book";
import BlockSkeleton from "./skeleton/BlockSkeleton";

type BookCardProps = {
  book: BookResponseType;
  index: number;
};

function BookCard({ book, index }: BookCardProps) {
  const bookId = getBookIdByISBN(book.isbn);

  return (
    <li className="flex flex-col gap-4 justify-between rounded-sm p-4 w-full border shadow-md">
      <Link
        href={`/book/${bookId}`}
        className="overflow-hidden border rounded-sm"
      >
        <Image
          src={book?.thumbnail || "/images/no-image.png"}
          alt={`${book?.title} 이미지`}
          width={200}
          height={300}
          className="w-full h-72 md:h-52 hover:scale-110 transition"
          priority={index < 13}
        />
      </Link>
      <div className="flex gap-2">
        <Button asChild className="w-full h-12 md:h-7 text-2xl md:text-base">
          <Link href={`/book/${bookId}`}>상세 보기</Link>
        </Button>
        <HeartToggle book={book} />
      </div>
    </li>
  );
}

const Skeleton = () => <BlockSkeleton size="w-full h-72" />;

BookCard.Skeleton = Skeleton;

export default BookCard;
