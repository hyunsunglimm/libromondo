"use client";

import ReviewListItem from "@/components/ReviewListItem";
import { useReviewsByBook } from "../hooks/useReviewsByBook";

type BookReviewInfoProps = {
  bookId: string;
};

export default function BookReviewInfo({ bookId }: BookReviewInfoProps) {
  const { data: reviews } = useReviewsByBook(bookId);

  const totalRating =
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
        <p>총 평점 : {totalRating}점</p>
      </div>
      <ul className="flex flex-col gap-4 mb-8 max-h-72 overflow-y-scroll">
        {reviews?.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
