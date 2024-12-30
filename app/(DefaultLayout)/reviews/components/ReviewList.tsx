"use client";

import ReviewListItem from "@/components/ReviewListItem";
import useMe from "@/hooks/useMe";
import { Review } from "@/types/review";
import { ScaleLoader } from "react-spinners";
import useSWR from "swr";

type ReviewListProps = {
  type: "all" | "following";
};

export default function ReviewList({ type }: ReviewListProps) {
  const { data: reviews, isLoading } = useSWR<Review[]>(
    `/api/reviews?type=${type}`
  );
  const { data: loginUser } = useMe();

  if (isLoading) {
    return (
      <ScaleLoader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  return (
    <>
      <p className="text-end text-gray-600 font-bold mb-4 md:mb-2 text-2xl md:text-base">{`총 ${reviews?.length}개의 리뷰가 있습니다.`}</p>
      <ul className="flex flex-col gap-4">
        {reviews?.map((review) => {
          const isMe = loginUser?.id === review.author.id;

          return <ReviewListItem key={review.id} review={review} isMe={isMe} />;
        })}
      </ul>
    </>
  );
}
