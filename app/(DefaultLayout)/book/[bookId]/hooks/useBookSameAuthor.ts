import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { BookResponseType, KakaoBookResponse } from "@/types/book";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

type UseBookSameAuthorParams = {
  author: string;
  page: number;
  size: number;
};

export function useBookSameAuthor(params: UseBookSameAuthorParams) {
  const { author, page, size } = params;

  const { data: books } = useQuery<BookResponseType[]>({
    queryKey: [queryKeys.book.sameAuthor, author, page, size],
    queryFn: async () => {
      const queryParams = queryString.stringify(params);
      const res = await fetch(
        `${BASE_URL}/api/books/same-author?${queryParams}`
      );

      return await res.json();
    },
  });

  const { data } = useQuery<{ totalCount: number }>({
    queryKey: [queryKeys.book.sameAuthor, "total-count", author],
    queryFn: async () => {
      const queryParams = queryString.stringify({ author });
      const res = await fetch(
        `${BASE_URL}/api/books/same-author/total-count?${queryParams}`
      );

      return await res.json();
    },
  });

  const totalCount = data?.totalCount;

  return { books, totalCount };
}
