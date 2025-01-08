import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { BookResponseType } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useRelatedBooks(bookId: string) {
  return useQuery<BookResponseType[]>({
    queryKey: [queryKeys.book.related, bookId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/books/related/${bookId}`);

      return await res.json();
    },
  });
}
