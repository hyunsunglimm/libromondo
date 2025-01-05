"use client";

import { Button } from "@/components/ui/button";
import ReviewForm from "./ReviewForm";
import { BookResponseType } from "@/types/book";
import useAlarm from "@/hooks/useAlarm";
import useSWR from "swr";
import { Review } from "@/types/review";
import { useMe } from "@/hooks/useMe";
import { useModal } from "@/hooks/useModal";

type WriteReviewProps = {
  book: BookResponseType;
};

export default function WriteReview({ book }: WriteReviewProps) {
  const { data: reviews } = useSWR<Review[]>(
    `/api/reviews?type=book&isbn=${book.isbn}`
  );
  const { data: loginUser } = useMe();
  const { withAlarm } = useAlarm();
  const { open } = useModal();

  const alreadyWriteReview = reviews?.some(
    (review) => review.author.id === loginUser?.id
  );

  const handleClick = () => {
    withAlarm(() => open(<ReviewForm book={book} />));
  };

  return (
    <>
      <Button
        className={`w-full mt-4 text-2xl md:text-base h-12 ${
          alreadyWriteReview && "cursor-not-allowed"
        }`}
        onClick={handleClick}
        disabled={alreadyWriteReview}
      >
        {alreadyWriteReview ? "이 책의 리뷰를 작성했습니다." : "리뷰 작성하기"}
      </Button>
    </>
  );
}
