"use client";

import { useState } from "react";
import SavedBooks from "./SavedBooks";
import Reviews from "./Reviews";

export default function UserContents({ userId }: { userId: string }) {
  const [type, setType] = useState("book");

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
      {type === "book" && <SavedBooks userId={userId} />}
      {type === "review" && <Reviews userId={userId} />}
    </section>
  );
}
