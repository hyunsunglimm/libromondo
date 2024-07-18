"use client";

import { Button } from "@/components/ui/button";
import { BookResponseType } from "@/types/book";
import Image from "next/image";
import GradeSection from "./GradeSection";
import { useState } from "react";
import Spinner from "@/components/spinner/Spinner";

type ReviewFormProps = {
  book: BookResponseType;
  onClose: () => void;
};

export default function ReviewForm({ book, onClose }: ReviewFormProps) {
  const [enteredContents, setEnteredContents] = useState("");
  const [grade, setGrade] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ book, contents: enteredContents, grade }),
    });
    setIsLoading(false);
    onClose();
  };

  return (
    <form className="w-80 flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        src={book.thumbnail}
        alt={`${book.title} 이미지`}
        width={400}
        height={500}
        className="w-full"
      />
      <GradeSection grade={grade} setGrade={setGrade} />
      <textarea
        className="border border-black p-2"
        required
        onChange={(e) => setEnteredContents(e.target.value)}
        value={enteredContents}
      />
      <Button>{isLoading ? <Spinner /> : "작성 완료"}</Button>
    </form>
  );
}
