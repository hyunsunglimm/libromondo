import useSWR from "swr";
import { KakaoBookResponse } from "@/types/book";
import { ScaleLoader } from "react-spinners";
import BookCard from "./BookCard";
import { useBookSearchStore } from "@/store/search";
import PaginationSection from "./PaginationSection";
import { getPageArray } from "@/utils/book";

type BooksListProps = {
  keyword: string | null;
  pagePerView: number;
};

export default function BooksList({ keyword, pagePerView }: BooksListProps) {
  const { page, setPage } = useBookSearchStore();
  const { data, isLoading } = useSWR<KakaoBookResponse>(
    keyword
      ? `/api/book/search?query=${keyword}&page=${page}&size=${pagePerView}`
      : null
  );

  const books = data?.documents;
  const pageableCount = data?.meta.pageable_count ?? 0;
  const lastPage = Math.ceil(pageableCount / pagePerView);
  const isLastPage = page === lastPage || page >= 100;

  const pageArray = getPageArray(page, lastPage);

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
      {books && books?.length > 0 && (
        <p className="text-gray-400 text-end mt-4 text-2xl md:text-base">
          {pageableCount > pagePerView * 100
            ? pagePerView * 100
            : pageableCount}
          개의 검색 결과가 있습니다.
        </p>
      )}

      <ul className="grid grid-cols-3 md:grid-cols-4 max-w-[832px] w-full mx-auto mt-4 gap-4">
        {books?.map((book, index) => (
          <BookCard book={book} index={index} key={`book?.isbn -${index}`} />
        ))}
      </ul>
      {books?.length === 0 && (
        <p className="text-center text-gray-400 text-3xl md:text-xl font-bold mt-8">
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
