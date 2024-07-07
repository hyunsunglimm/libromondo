"use client";

import BookCard from "@/components/BookCard";
import { SanityUser } from "@/types/user";
import useSWR from "swr";

export default function SavedBooks() {
  const { data: user, isLoading } = useSWR<SanityUser>("/api/user");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user?.books.length === 0 && (
        <p className="mt-8 text-gray-300 font-bold text-xl text-center">
          찜한 도서가 없습니다.
        </p>
      )}
      <ul className="grid grid-cols-4 w-[800px] mx-auto gap-4 mt-8">
        {user?.books.map((book, index) => (
          <BookCard book={book} index={index} key={`book?.isbn -${index}`} />
        ))}
      </ul>
    </div>
  );
}
