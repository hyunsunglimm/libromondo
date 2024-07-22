import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { BookResponseType } from "@/types/book";
import useAlarm from "@/hooks/useAlarm";

type WriteReviewProps = {
  book: BookResponseType;
};

export default function WriteReview({ book }: WriteReviewProps) {
  const [isReview, setIsReview] = useState(false);
  const { withAlarm } = useAlarm();

  const handleClick = () => {
    withAlarm(() => setIsReview(!isReview));
  };

  return (
    <>
      <Button className="w-full mt-4" onClick={handleClick}>
        리뷰 작성하기
      </Button>
      <Modal isOpen={isReview} onClose={() => setIsReview(false)}>
        <ReviewForm book={book} onClose={() => setIsReview(false)} />
      </Modal>
    </>
  );
}
