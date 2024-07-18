"use client";

import { Button } from "@/components/ui/button";
import { BookResponseType } from "@/types/book";
import Image from "next/image";
import GradeSection from "./GradeSection";
import { useState } from "react";

type ReviewFormProps = {
  book: BookResponseType;
};

export default function ReviewForm({ book }: ReviewFormProps) {
  const [grade, setGrade] = useState(3);

  return (
    <form className="w-80 flex flex-col gap-4">
      <Image
        src={book.thumbnail}
        alt={`${book.title} 이미지`}
        width={400}
        height={500}
        className="w-full"
      />
      <GradeSection grade={grade} setGrade={setGrade} />
      <textarea className="border border-black p-2" required />
      <Button>작성 완료</Button>
    </form>
  );
}
