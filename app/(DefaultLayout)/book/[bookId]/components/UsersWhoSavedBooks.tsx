"use client";

import { DetailBookType } from "@/types/book";
import useSWR from "swr";

export default function UsersWhoSavedBooks({ bookId }: { bookId: string }) {
  const { data } = useSWR(`/api/book/${bookId}`);
  const book: DetailBookType = data?.documents[0];

  return (
    <>
      {book?.usersWhoSavedBooks.length > 0 && (
        <p className="text-center font-bold cursor-pointer">
          {book?.usersWhoSavedBooks.length}명이 좋아합니다.
        </p>
      )}
    </>
  );
}
