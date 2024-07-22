"use client";

import { Button } from "@/components/ui/button";
import { BookResponseType } from "@/types/book";
import Image from "next/image";
import GradeSection from "./GradeSection";
import { useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import { useSWRConfig } from "swr";

type ReviewFormProps = {
  book: BookResponseType;
  onClose: () => void;
};

export default function ReviewForm({ book, onClose }: ReviewFormProps) {
  const [enteredContents, setEnteredContents] = useState("");
  const [grade, setGrade] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: globalMutate } = useSWRConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ book, contents: enteredContents, grade }),
    });
    setIsLoading(false);
    globalMutate(`/api/reviews?type=book&isbn=${book.isbn}`);
    onClose();
  };

  return (
    <form className="w-80 flex flex-col gap-4" onSubmit={handleSubmit}>
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
      <Button className="text-3xl md:text-base h-14 md:h-12">
        {isLoading ? <Spinner /> : "작성 완료"}
      </Button>
    </form>
  );
}
