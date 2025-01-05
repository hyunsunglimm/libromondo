"use client";

import BookCard from "@/components/BookCard";
import { useUserById } from "../hooks/useUserById";
import { useSavedBooks } from "../hooks/useSavedBooks";
import { ScaleLoader } from "react-spinners";

export default function SavedBooks({ userId }: { userId: string }) {
  const { data: books, isPending } = useSavedBooks(userId);
  const { data: user, isMe } = useUserById(userId);

  if (isPending) {
    return (
      <div className="flex justify-center mt-20">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <div className="pt-4 mt-4">
      <h2 className="text-center font-bold text-4xl md:text-2xl">
        {isMe ? "내 서재" : `${user?.name}님의 서재`}
      </h2>
      <p className="text-end text-gray-500 text-2xl md:text-base  mt-4 md:mt-2">
        서재에 {books?.length}권의 책이 있습니다.
      </p>
      {books?.length === 0 && (
        <p className="mt-8 text-gray-400 font-bold text-xl text-center">
          찜한 도서가 없습니다.
        </p>
      )}
      <ul className="grid grid-cols-3 md:grid-cols-4 w-full mx-auto gap-4 mt-4">
        {books?.map((book, index) => {
          const bookId = book.isbn.split(" ")[0] || book.isbn.split(" ")[1];
          return <BookCard book={book} index={index} key={bookId} />;
        })}
      </ul>
    </div>
  );
}
