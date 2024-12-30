"use client";

import ReviewListItem from "@/components/ReviewListItem";
import useMe from "@/hooks/useMe";
import { Review } from "@/types/review";
import useSWR from "swr";

type BookReviewInfoProps = {
  isbn: string;
};

export default function BookReviewInfo({ isbn }: BookReviewInfoProps) {
  const { data: reviews } = useSWR<Review[]>(
    `/api/reviews?type=book&isbn=${isbn}`
  );
  const { data: loginUser } = useMe();

  const grade =
    reviews && reviews.length > 0
      ? reviews
          .map((review) => review.grade)
          .reduce((acc, cur) => acc + cur, 0) / reviews.length
      : 0;

  return (
    <>
      <div className="flex justify-end gap-2 items-center font-bold mb-2 text-2xl md:text-base">
        <p>{`작성된 리뷰 (${reviews?.length ?? 0})`}</p>
        <p>|</p>
        <p>평점 : {grade}점</p>
      </div>
      <ul className="flex flex-col gap-4 mb-8 max-h-72 overflow-y-scroll">
        {reviews?.map((review) => {
          const isMe = loginUser?.id === review.author.id;

          return <ReviewListItem key={review.id} review={review} isMe={isMe} />;
        })}
      </ul>
    </>
  );
}
