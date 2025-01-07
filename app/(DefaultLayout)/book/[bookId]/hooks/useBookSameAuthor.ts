import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { BookResponseType } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useBookSameAuthor(author: string) {
  return useQuery<BookResponseType[]>({
    queryKey: [queryKeys.book.sameAuthor, author],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/api/books/same-author?author=${author}`
      );

      const data = await res.json();

      return data.documents;
    },
  });
}
