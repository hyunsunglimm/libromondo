"use client";

import { useState } from "react";
import ReviewList from "./ReviewList";
import useAlarm from "@/hooks/useAlarm";

export default function ReviewListSection() {
  const [type, setType] = useState<"all" | "following">("all");
  const { withAlarm } = useAlarm();

  return (
    <section className="mx-auto max-w-[832px] w-full px-4">
      <div className="flex mb-4 gap-4">
        <button
          className={`text-3xl md:text-base border border-black w-full p-2 rounded-sm ${type === "all" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setType("all")}
        >
          리뷰 전체 보기
        </button>
        <button
          className={`text-3xl md:text-base border border-black w-full p-2 rounded-sm ${type === "following" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => {
            withAlarm(() => setType("following"));
          }}
        >
          팔로잉만 보기
        </button>
      </div>
      <ReviewList type={type} />
    </section>
  );
}
