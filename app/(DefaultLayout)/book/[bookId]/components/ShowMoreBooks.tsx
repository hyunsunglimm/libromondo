"use client";

import BookCard from "@/components/BookCard";
import PaginationSection from "@/components/PaginationSection";
import SwiperWrapper from "@/components/SwiperWrapper";

import { BookResponseType } from "@/types/book";
import { getPageArray } from "@/utils/book";
import { useEffect, useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useBookSameAuthor } from "../hooks/useBookSameAuthor";

type ShowMoreBooksProps = {
  author: string;
  title: string;
  slidesPerView: number;
};

export default function ShowMoreBooks({
  title,
  author,
  slidesPerView,
}: ShowMoreBooksProps) {
  const { data: books } = useBookSameAuthor(author);
  const [page, setPage] = useState(1);
  const ref = useRef<{ slideTo: (arg: number) => void } | null>(null);

  const lastPage = Math.ceil(books?.length || 0 / slidesPerView);
  const isLastPage = page === lastPage;

  const pageArray = getPageArray(page, lastPage);

  useEffect(() => {
    ref.current?.slideTo((page - 1) * slidesPerView);
  }, [page, slidesPerView]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (!isLastPage) setPage(page + 1);
  };

  if (!books) {
    return (
      <div className="flex justify-center my-12">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-3xl md:text-lg">{title}</p>
        <p className="text-gray-500 text-2xl md:text-base">
          총 {books?.length}개의 도서가 있습니다.
        </p>
      </div>
      <SwiperWrapper ref={ref} setPage={setPage} slidesPerView={slidesPerView}>
        {books?.map((book, index) => (
          <BookCard book={book} index={index} key={`book?.isbn -${index}`} />
        ))}
      </SwiperWrapper>

      {books?.length > 0 ? (
        <PaginationSection
          setPrevPage={handlePrevPage}
          setNextPage={handleNextPage}
          setPage={setPage}
          pageArray={pageArray}
          currentPage={page}
          isLastPage={isLastPage}
        />
      ) : (
        <p className="text-gray-300 text-3xl md:text-2xl text-center py-8 font-bold">
          {title}이 존재하지 않습니다.
        </p>
      )}
    </div>
  );
}
