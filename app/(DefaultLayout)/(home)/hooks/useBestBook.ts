import { queryKeys } from "@/constants/queryKeys";
import { getBestBooks } from "@/service/book";
import { BookResponseType } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useBestBook() {
  return useQuery<BookResponseType[]>({
    queryKey: [queryKeys.book.bestBooks],
    queryFn: () => getBestBooks(),
  });
}
