"use client";

import { useState } from "react";
import ReviewList from "./ReviewList";

export default function ReviewListSection() {
  const [type, setType] = useState<"all" | "following">("all");

  return (
    <section className="mx-auto max-w-[832px] w-full px-4">
      <div className="flex mb-4 gap-4">
        <button
          className={`border border-black w-full p-2 rounded-sm ${type === "all" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setType("all")}
        >
          리뷰 전체 보기
        </button>
        <button
          className={`border border-black w-full p-2 rounded-sm ${type === "following" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setType("following")}
        >
          팔로잉만 보기
        </button>
      </div>
      <ReviewList type={type} />
    </section>
  );
}
