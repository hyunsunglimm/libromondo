"use client";

import { BookResponseType } from "@/types/book";
import Image from "next/image";
import { Button } from "./ui/button";
import HeartIcon from "./icons/HeartIcon";
import Link from "next/link";
import HeartFillIcon from "./icons/HeartFillIcon";
import useSWR from "swr";
import { SanityUser } from "@/types/user";

type BookCardProps = {
  book: BookResponseType;
  index: number;
};

export default function BookCard({ book, index }: BookCardProps) {
  const { data: user, mutate } = useSWR<SanityUser>("/api/user");
  const bookId = book.isbn.split(" ")[0] || book.isbn.split(" ")[1];

  const isSave = user?.books?.map((b) => b.isbn).includes(book.isbn);

  const updateSave = async () => {
    return fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({ userId: user?.id, book, isSave }),
    }).then((res) => res.json());
  };

  const updateSaveHandler = async () => {
    const save = user?.books;

    if (!save) return;

    const newUser = {
      ...user,
      books: isSave
        ? save.filter((s) => s.isbn !== book.isbn)
        : [...save, book],
    };

    return mutate(updateSave(), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return (
    <li className="flex flex-col gap-4 justify-between rounded-sm p-4 w-full border shadow-md">
      <Image
        src={book?.thumbnail || "/images/no-image.png"}
        alt={`${book?.title} 이미지`}
        width={200}
        height={300}
        className="w-full h-52"
        priority={index < 13}
      />
      <div className="flex gap-2">
        <Button asChild className="w-full h-7">
          <Link href={`/book/${bookId}`}>상세 보기</Link>
        </Button>
        {isSave ? (
          <HeartFillIcon onClick={updateSaveHandler} />
        ) : (
          <HeartIcon onClick={updateSaveHandler} />
        )}
      </div>
    </li>
  );
}
