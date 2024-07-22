"use client";

import ReviewListItem from "@/components/ReviewListItem";
import { Review } from "@/types/review";
import { SanityUser } from "@/types/user";
import { ScaleLoader } from "react-spinners";
import useSWR from "swr";

type ReviewsProps = {
  user: SanityUser;
  isMe: boolean;
};

export default function Reviews({ user, isMe }: ReviewsProps) {
  const { data: reviews, isLoading } = useSWR<Review[]>(
    `/api/reviews/${user.id}`
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <div className="pt-4 mt-4">
      <h2 className="text-center font-bold text-2xl">
        {isMe ? "내 리뷰" : `${user?.name}님의 리뷰`}
      </h2>
      <p className="text-end text-gray-400">
        {reviews?.length}개의 리뷰를 작성하셨습니다.
      </p>
      {reviews?.length === 0 && (
        <p className="mt-8 text-gray-300 font-bold text-xl text-center">
          아직 작성한 리뷰가 없습니다. <br />
          리뷰를 작성해보세요 !
        </p>
      )}
      <ul className="flex flex-col gap-2 mt-4">
        {reviews?.map((review) => (
          <ReviewListItem key={review.id} review={review} isMe={isMe} />
        ))}
      </ul>
    </div>
  );
}
