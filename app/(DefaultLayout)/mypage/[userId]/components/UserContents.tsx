"use client";

import { useState } from "react";
import SavedBooks from "./SavedBooks";
import useSWR from "swr";
import { SanityUser } from "@/types/user";
import useMe from "@/hooks/useMe";
import { ScaleLoader } from "react-spinners";
import Reviews from "./Reviews";

export default function UserContents({ userId }: { userId: string }) {
  const { data: user, isLoading } = useSWR<SanityUser>(`/api/user/${userId}`);
  const { loginUser } = useMe();
  const [type, setType] = useState("book");

  if (isLoading || !user) {
    return (
      <div className="flex justify-center mt-20">
        <ScaleLoader />
      </div>
    );
  }

  const isMe = loginUser?.id === userId;

  return (
    <section className="mt-4">
      <div className="flex border border-black rounded-md">
        <button
          className={`w-full p-2 border-r border-black ${type === "book" && "bg-black text-white"}`}
          onClick={() => setType("book")}
        >
          서재
        </button>
        <button
          className={`w-full p-2 ${type === "review" && "bg-black text-white"}`}
          onClick={() => setType("review")}
        >
          리뷰
        </button>
      </div>
      {type === "book" && <SavedBooks user={user} isMe={isMe} />}
      {type === "review" && <Reviews user={user} isMe={isMe} />}
    </section>
  );
}
