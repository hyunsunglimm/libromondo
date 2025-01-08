"use client";

import { useState } from "react";
import { useRelatedBooks } from "../hooks/useRelatedBooks";
import { getPageArray } from "@/utils/book";
import BookCard from "@/components/BookCard";
import PaginationSection from "@/components/PaginationSection";

type RelatedBookListProps = {
  bookId: string;
  size: number;
};

const RelatedBookList = ({ bookId, size }: RelatedBookListProps) => {
  const [page, setPage] = useState(1);
  const { data: books, refetch } = useRelatedBooks(bookId);

  const displayBooks = books?.slice(size * (page - 1), size * page);

  const totalCount = books?.length;

  const lastPage = Math.ceil((totalCount || 0) / size);

  const pageArray = getPageArray(page, lastPage);

  const isLastPage = lastPage === page;

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  };

  const handleRefetch = async () => {
    await refetch();
    setPage(1);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-3xl md:text-lg">
          관련있는 책을 모아봤어요.
          <span
            className="ml-4 text-base cursor-pointer hover:underline"
            onClick={handleRefetch}
          >
            다른 책도 보고싶어요!
          </span>
        </p>
        {totalCount ? (
          <p className="text-gray-500 text-2xl md:text-base">
            총 {totalCount}개의 도서가 있습니다.
          </p>
        ) : null}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {displayBooks
          ? displayBooks.map((book, index) => (
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
          관련있는 책이 없습니다.
        </p>
      )}
    </div>
  );
};

export default RelatedBookList;
