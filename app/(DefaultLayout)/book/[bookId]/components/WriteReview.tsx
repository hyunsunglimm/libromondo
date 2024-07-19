import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { BookResponseType } from "@/types/book";
import { useSession } from "next-auth/react";
import { useAlarmStore } from "@/store/alarm";

type WriteReviewProps = {
  book: BookResponseType;
};

export default function WriteReview({ book }: WriteReviewProps) {
  const { isAlarm, onAlarm, offAlarm } = useAlarmStore();
  const { data: session } = useSession();
  const [isReview, setIsReview] = useState(false);

  useEffect(() => {
    if (isAlarm) {
      const timer = setTimeout(() => {
        offAlarm();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAlarm, offAlarm]);

  const handleClick = () => {
    if (!session) {
      onAlarm();
      return;
    }
    setIsReview(!isReview);
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
