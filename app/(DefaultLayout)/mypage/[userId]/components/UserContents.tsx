"use client";

import { useState } from "react";
import SavedBooks from "./SavedBooks";
import Reviews from "./Reviews";
import { useUserById } from "../hooks/useUserById";
import { useSavedBooks } from "../hooks/useSavedBooks";
import { useReviews } from "../hooks/useReviews";
import { SyncLoader } from "react-spinners";
import Spinner from "@/components/loader/Spinner";

export default function UserContents({ userId }: { userId: string }) {
  const [type, setType] = useState("book");
  const { allLoading: userLoading } = useUserById(userId);
  const { data: books, isPending: savedBookLoading } = useSavedBooks(userId);
  const { data: reviews, isPending: reviewLoading } = useReviews(userId);

  const allLoading = userLoading || savedBookLoading || reviewLoading;

  if (allLoading) {
    return (
      <div className="flex justify-center mt-20">
        <SyncLoader />
      </div>
    );
  }

  return (
    <section className="mt-8 md:mt-4">
      <div className="flex border border-black rounded-md">
        <button
          className={`text-2xl md:text-base w-full p-2 border-r border-black ${
            type === "book" && "bg-black text-white"
          }`}
          onClick={() => setType("book")}
        >
          서재
        </button>
        <button
          className={`text-2xl md:text-base w-full p-2 ${
            type === "review" && "bg-black text-white"
          }`}
          onClick={() => setType("review")}
        >
          리뷰
        </button>
      </div>
      {type === "book" && <SavedBooks userId={userId} books={books} />}
      {type === "review" && <Reviews userId={userId} reviews={reviews} />}
    </section>
  );
}
