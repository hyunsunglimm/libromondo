import { getBestBooks } from "@/service/book";
import { BookResponseType } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useGetBestBook() {
  return useQuery<BookResponseType[]>({
    queryKey: ["best-book"],
    queryFn: () => getBestBooks(),
  });
}
