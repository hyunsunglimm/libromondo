"use client";

import { Review } from "@/types/review";
import { convertToKST } from "@/utils/date";
import Image from "next/image";
import ToggleStar from "./ToggleStar";
import ReviewDetail from "./ReviewDetail";
import { useModal } from "@/hooks/useModal";

type ReviewListItemProps = {
  review: Review;
};

export default function ReviewListItem({ review }: ReviewListItemProps) {
  const { open } = useModal();

  return (
    <li
      key={review.id}
      className="border border-black p-2 rounded-md hover:bg-neutral-50 transition cursor-pointer flex"
      onClick={() => open(<ReviewDetail reviewId={review.id} />)}
    >
      <Image
        src={review.book.thumbnail}
        alt={`${review.book.title} 이미지`}
        width={200}
        height={200}
        className="w-20 md:w-12 border border-black rounded-md"
      />
      <div className="ml-2 w-full overflow-hidden flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-xl md:text-base">
            <p className="truncate font-bold">{review.book.title}</p>
            <p>|</p>
            <p className="shrink-0">작성자 : {review.author.name}</p>
            <p className="hidden md:block">|</p>
            <p className="text-gray-400 text-sm shrink-0 hidden md:block">
              {convertToKST(review.createdAt)}
            </p>
          </div>
          <div className="flex ml-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <ToggleStar key={num} isFill={review.grade >= num} size="sm" />
            ))}
          </div>
        </div>
        <div className="bg-neutral-100 mt-2 p-2 rounded-md grow">
          <p className="truncate text-xl md:text-base">{review.contents}</p>
        </div>
      </div>
    </li>
  );
}
