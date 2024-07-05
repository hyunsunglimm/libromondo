"use client";

import BookCard from "@/components/BookCard";
import PaginationSection from "@/components/PaginationSection";
import SwiperWrapper from "@/components/SwiperWrapper";

import { BookResponseType } from "@/types/book";
import { useRef, useState } from "react";

type ShowMoreBooksProps = {
  title: string;
  books: BookResponseType[];
};

export default function ShowMoreBooks({ title, books }: ShowMoreBooksProps) {
  const [page, setPage] = useState(1);
  const ref = useRef<{ next: () => void; prev: () => void } | null>(null);

  const lastPage = Math.ceil(books.length / 4);
  const isLastPage = page === lastPage;
  const getPageArray = () => {
    const startPage = Math.floor((page - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, lastPage);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageArray = getPageArray();

  const handlePrev = () => ref.current?.prev();
  const handleNext = () => ref.current?.next();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-gray-400">총 {books.length}개의 도서가 있습니다.</p>
      </div>
      <SwiperWrapper ref={ref}>
        {books?.map((book, index) => (
          <BookCard book={book} index={index} key={`book?.isbn -${index}`} />
        ))}
      </SwiperWrapper>

      <PaginationSection
        setPrevPage={handlePrev}
        setNextPage={handleNext}
        setPage={setPage}
        pageArray={pageArray}
        currentPage={page}
        isLastPage={isLastPage}
      />
    </div>
  );
}
