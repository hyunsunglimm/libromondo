"use client";

import BookCard from "@/components/BookCard";
import { SanityUser } from "@/types/user";

type SavedBooksProps = {
  user: SanityUser;
  isMe: boolean;
};

export default function SavedBooks({ user, isMe }: SavedBooksProps) {
  return (
    <div className="pt-4 mt-4">
      <h2 className="text-center font-bold text-2xl">
        {isMe ? "내 서재" : `${user?.name}님의 서재`}
      </h2>
      <p className="text-end text-gray-400">
        서재에 {user?.books.length}권의 책이 있습니다.
      </p>
      {user?.books.length === 0 && (
        <p className="mt-8 text-gray-300 font-bold text-xl text-center">
          찜한 도서가 없습니다.
        </p>
      )}
      <ul className="grid grid-cols-4 w-full mx-auto gap-4 mt-4">
        {user?.books.map((book, index) => (
          <BookCard book={book} index={index} key={`book?.isbn -${index}`} />
        ))}
      </ul>
    </div>
  );
}
