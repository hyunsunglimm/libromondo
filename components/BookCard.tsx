"use client";

import { BookResponseType } from "@/types/book";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import HeartToggle from "./HeartToggle";
import { usePathname } from "next/navigation";

type BookCardProps = {
  book: BookResponseType;
  index: number;
};

export default function BookCard({ book, index }: BookCardProps) {
  const bookId = book.isbn.split(" ")[0] || book.isbn.split(" ")[1];
  const pathname = usePathname();

  return (
    <li className="flex flex-col gap-4 justify-between rounded-sm p-4 w-full border shadow-md">
      <Image
        src={book?.thumbnail || "/images/no-image.png"}
        alt={`${book?.title} 이미지`}
        width={200}
        height={300}
        className="w-full h-52 border rounded-sm"
        priority={index < 13}
      />
      <div className="flex gap-2">
        <Button asChild className="w-full h-7">
          <Link href={`/book/${bookId}`}>상세 보기</Link>
        </Button>
        <HeartToggle book={book} isDetail={pathname.split("/")[2] === bookId} />
      </div>
    </li>
  );
}
