"use client";

import { Button } from "@/components/ui/button";
import ReviewForm from "./WriteReviewForm";
import { BookResponseType } from "@/types/book";
import useAlarm from "@/hooks/useAlarm";
import { useMe } from "@/hooks/useMe";
import { useModal } from "@/hooks/useModal";
import { getBookIdByISBN } from "@/utils/book";
import { useReviewsByBook } from "../hooks/useReviewsByBook";

type WriteReviewProps = {
  book: BookResponseType;
};

export default function WriteReview({ book }: WriteReviewProps) {
  const bookId = getBookIdByISBN(book.isbn);

  const { data: reviews } = useReviewsByBook(bookId);
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
