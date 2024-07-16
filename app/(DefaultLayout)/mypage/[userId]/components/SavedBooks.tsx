"use client";

import BookCard from "@/components/BookCard";
import useMe from "@/hooks/useMe";
import { SanityUser } from "@/types/user";
import useSWR from "swr";
import SavedBooksSkeleton from "./SavedBooksSkeleton";

export default function SavedBooks({ userId }: { userId: string }) {
  const { data: user, isLoading } = useSWR<SanityUser>(`/api/user/${userId}`);
  const { loginUser } = useMe();

  if (isLoading) {
    return <SavedBooksSkeleton />;
  }

  const isMe = loginUser?.id === userId;

  return (
    <div className="border-t-2 pt-4 mt-4 border-black">
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
