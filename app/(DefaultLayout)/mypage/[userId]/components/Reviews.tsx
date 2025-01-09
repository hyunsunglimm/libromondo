"use client";

import ReviewListItem from "@/components/ReviewListItem";
import { useUserById } from "../hooks/useUserById";
import { Review } from "@/types/review";

type ReviewsProps = {
  userId: string;
  reviews: Review[] | undefined;
};

export default function Reviews({ userId, reviews }: ReviewsProps) {
  const { data: user, isMe } = useUserById(userId);

  return (
    <div className="pt-4 mt-4">
      <h2 className="text-center font-bold text-4xl md:text-2xl">
        {isMe ? "내 리뷰" : `${user?.name}님의 리뷰`}
      </h2>
      <p className="text-end text-gray-500 text-2xl md:text-base mt-4 md:mt-2">
        {reviews?.length}개의 리뷰를 작성하셨습니다.
      </p>
      {reviews?.length === 0 && (
        <p className="mt-8 text-gray-400 font-bold text-3xl md:text-xl text-center">
          아직 작성한 리뷰가 없습니다. <br />
          리뷰를 작성해보세요 !
        </p>
      )}
      <ul className="flex flex-col gap-2 mt-4">
        {reviews?.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
}
