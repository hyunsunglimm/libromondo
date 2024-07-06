"use client";

import BookCard from "@/components/BookCard";
import PaginationSection from "@/components/PaginationSection";
import SwiperWrapper from "@/components/SwiperWrapper";

import { BookResponseType } from "@/types/book";
import { getPageArray } from "@/utils/book";
import { useEffect, useRef, useState } from "react";

type ShowMoreBooksProps = {
  title: string;
  books: BookResponseType[];
};

export default function ShowMoreBooks({ title, books }: ShowMoreBooksProps) {
  const [page, setPage] = useState(1);
  const ref = useRef<{ slideTo: (arg: number) => void } | null>(null);

  const lastPage = Math.ceil(books.length / 4);
  const isLastPage = page === lastPage;

  const pageArray = getPageArray(page, lastPage);

  useEffect(() => {
    ref.current?.slideTo((page - 1) * 4);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (!isLastPage) setPage(page + 1);
  };

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
        setPrevPage={handlePrevPage}
        setNextPage={handleNextPage}
        setPage={setPage}
        pageArray={pageArray}
        currentPage={page}
        isLastPage={isLastPage}
      />
    </div>
  );
}
