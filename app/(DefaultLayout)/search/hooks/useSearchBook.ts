import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { BookResponseType } from "@/types/book";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

type UseSearchBookParams = {
  keyword: string;
  page: number;
  size: number;
};

export function useSearchBook(params: UseSearchBookParams) {
  const { keyword, page, size } = params;

  const { data: books, isLoading: isSearching } = useQuery<BookResponseType[]>({
    queryKey: [queryKeys.search.book, keyword, page, size],
    queryFn: async () => {
      const queryParams = queryString.stringify(params);
      const res = await fetch(`${BASE_URL}/api/books/search?${queryParams}`);

      return await res.json();
    },
    enabled: keyword.trim().length > 0,
  });

  const { data, isLoading: isFetchingTotalCount } = useQuery<{
    totalCount: number;
  }>({
    queryKey: [queryKeys.search.book, "total-count", keyword],
    queryFn: async () => {
      const queryParams = queryString.stringify({ keyword });
      const res = await fetch(
        `${BASE_URL}/api/books/search/total-count?${queryParams}`
      );

      return await res.json();
    },
    enabled: keyword.trim().length > 0,
  });

  const totalCount = data?.totalCount;

  return { books, totalCount, isLoading: isSearching || isFetchingTotalCount };
}
