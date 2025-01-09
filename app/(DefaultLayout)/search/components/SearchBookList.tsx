import { useState } from "react";
import { useSearchBook } from "../hooks/useSearchBook";
import { getPageArray } from "@/utils/book";
import BookCard from "@/components/BookCard";
import PaginationSection from "@/components/PaginationSection";
import { useBookSearchStore } from "@/store/search";

type SearchBookListProps = {
  keyword: string;
  size: number;
};

export default function SearchBookList({ keyword, size }: SearchBookListProps) {
  const { page, setPage } = useBookSearchStore();
  const { books, totalCount, isLoading } = useSearchBook({
    keyword,
    page,
    size,
  });

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

  return (
    <div className="mt-8">
      <div className="flex justify-end items-center mb-4">
        {totalCount ? (
          <p className="text-gray-500 text-2xl md:text-base">
            총 {totalCount}개의 도서가 있습니다.
          </p>
        ) : null}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {books?.map((book, index) => (
          <BookCard book={book} index={index} key={book.isbn} />
        ))}
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <BookCard.Skeleton key={index} />
          ))}
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
          검색결과가 존재하지 않습니다.
        </p>
      )}
    </div>
  );
}
