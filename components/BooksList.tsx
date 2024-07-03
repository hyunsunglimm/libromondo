"use client";

import Image from "next/image";
import useSWR from "swr";
import { KakaoBookResponse } from "@/types/book";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { ScaleLoader } from "react-spinners";
import BookCard from "./BookCard";

type BooksListProps = {
  keyword: string | null;
};

export default function BooksList({ keyword }: BooksListProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR<KakaoBookResponse>(
    keyword ? `/api/book/search?query=${keyword}&page=${page}` : null
  );
  const isLastPage = data?.meta.is_end || page >= 100;
  const books = data?.documents;
  const pageableCount = data?.meta.pageable_count ?? 0;
  const lastPage = Math.ceil(pageableCount / 8);

  const getPageArray = () => {
    const startPage = Math.floor((page - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, lastPage);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageArray = getPageArray();

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (!isLastPage) setPage(page + 1);
  };

  if (isLoading) {
    return (
      <ScaleLoader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  return (
    <>
      <ul className="grid grid-cols-4 w-[800px] mx-auto mt-8 gap-4">
        {books?.map((book, index) => (
          <BookCard book={book} index={index} key={`book?.isbn -${index}`} />
        ))}
      </ul>
      {books?.length === 0 && (
        <p className="text-center text-gray-300 text-xl">
          검색된 도서가 없습니다.
        </p>
      )}
      {books && books?.length > 0 && (
        <PaginationSection
          setPrevPage={handlePrevPage}
          setNextPage={handleNextPage}
          pageArray={pageArray}
          setPage={setPage}
          currentPage={page}
          isLastPage={isLastPage}
        />
      )}
    </>
  );
}

type PaginationSectionProps = {
  setPrevPage: () => void;
  setNextPage: () => void;
  pageArray: number[];
  setPage: (arg: number) => void;
  currentPage: number;
  isLastPage: boolean;
};

const PaginationSection = ({
  setPrevPage,
  setNextPage,
  pageArray,
  setPage,
  currentPage,
  isLastPage,
}: PaginationSectionProps) => {
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            href="#"
            onClick={setPrevPage}
          />
        </PaginationItem>
        {pageArray.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              onClick={() => setPage(p)}
              isActive={p === currentPage}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            disabled={isLastPage}
            href="#"
            onClick={setNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
