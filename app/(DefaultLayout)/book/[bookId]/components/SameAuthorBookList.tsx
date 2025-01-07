"use client";

import BookCard from "@/components/BookCard";
import PaginationSection from "@/components/PaginationSection";

import { getPageArray } from "@/utils/book";
import { useState } from "react";
import { useBookSameAuthor } from "../hooks/useBookSameAuthor";

type ShowMoreBooksProps = {
  author: string;
  size: number;
};

export default function SameAuthorBookList({
  author,
  size,
}: ShowMoreBooksProps) {
  const [page, setPage] = useState(1);
  const { books, totalCount } = useBookSameAuthor({ author, page, size });

  const lastPage = Math.ceil((totalCount || 0) / size);

  const pageArray = getPageArray(page, lastPage);

  const isLastPage = lastPage === page;

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-3xl md:text-lg">같은 작가의 책</p>
        {totalCount && (
          <p className="text-gray-500 text-2xl md:text-base">
            총 {totalCount}개의 도서가 있습니다.
          </p>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {books
          ? books.map((book, index) => (
              <BookCard book={book} index={index} key={book.isbn} />
            ))
          : [1, 2, 3, 4].map((index) => <BookCard.Skeleton key={index} />)}
      </div>

      {lastPage > 0 && (
        <PaginationSection
          setPrevPage={handlePrevPage}
          setNextPage={handleNextPage}
          setPage={setPage}
          pageArray={pageArray}
          currentPage={page}
          isLastPage={isLastPage ?? true}
        />
      )}
      {totalCount === 0 && (
        <p className="text-gray-300 text-3xl md:text-2xl text-center py-8 font-bold">
          같은 작가의 책이 존재하지 않습니다.
        </p>
      )}
    </div>
  );
}
