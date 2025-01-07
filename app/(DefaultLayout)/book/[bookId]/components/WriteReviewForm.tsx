"use client";

import { Button } from "@/components/ui/button";
import { BookResponseType } from "@/types/book";
import Image from "next/image";
import GradeSection from "./GradeSection";
import { useState } from "react";
import Spinner from "@/components/loader/Spinner";
import { useReview } from "@/hooks/review/useReview";

type ReviewFormProps = {
  book: BookResponseType;
};

export default function WriteReviewForm({ book }: ReviewFormProps) {
  const [enteredContents, setEnteredContents] = useState("");
  const [grade, setGrade] = useState(3);

  const { writeReview, isWriting } = useReview();

  return (
    <form
      className="w-80 flex flex-col gap-4"
      onSubmit={(event) => writeReview({ event, book, enteredContents, grade })}
    >
      <Image
        src={book.thumbnail}
        alt={`${book.title} 이미지`}
        width={400}
        height={500}
        className="w-full rounded-md border border-black"
      />
      <GradeSection grade={grade} setGrade={setGrade} />
      <textarea
        className="border border-black p-2 text-[16px]"
        required
        onChange={(e) => setEnteredContents(e.target.value)}
        value={enteredContents}
      />
      <Button className="text-3xl md:text-base h-16 md:h-12">
        {isWriting ? <Spinner /> : "작성 완료"}
      </Button>
    </form>
  );
}
