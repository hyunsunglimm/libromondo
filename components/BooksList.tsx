"use client";

import Image from "next/image";
import useSWR from "swr";
import { BookResponseType } from "@/types/book";

type BooksListProps = {
  fetchUrl: string;
};

export default function BooksList({ fetchUrl }: BooksListProps) {
  const { data: books, isLoading } = useSWR<BookResponseType[]>(fetchUrl);

  if (isLoading) {
    return <p className="w-full text-center">Loading...</p>;
  }

  return (
    <>
      {books && (
        <ul className="grid grid-cols-4 w-[800px] mx-auto mt-8 gap-4">
          {books?.map((book, index) => (
            <li key={book?.isbn}>
              <Image
                src={book?.thumbnail || ""}
                alt={`${book?.title} 이미지`}
                width={200}
                height={300}
                className="w-full h-72 object-cover shadow-lg border"
                priority={index < 13}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
