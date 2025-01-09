"use client";

import ReviewListItem from "@/components/ReviewListItem";
import { ScaleLoader } from "react-spinners";
import { useReviews } from "../hooks/useReviews";

type ReviewListProps = {
  type: "all" | "following";
};

export default function ReviewList({ type }: ReviewListProps) {
  const { data: reviews, isPending } = useReviews(type);

  if (isPending) {
    return (
      <ScaleLoader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  return (
    <>
      <p className="text-end text-gray-600 font-bold mb-4 md:mb-2 text-2xl md:text-base">{`총 ${reviews?.length}개의 리뷰가 있습니다.`}</p>
      <ul className="flex flex-col gap-4">
        {reviews?.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
