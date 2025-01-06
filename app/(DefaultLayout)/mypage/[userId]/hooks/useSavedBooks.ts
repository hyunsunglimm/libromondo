import { BASE_URL } from "@/constants/url";
import { BookResponseType } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useSavedBooks(userId: string) {
  return useQuery<BookResponseType[]>({
    queryKey: ["savedBooks", userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/books/${userId}/saved`);

      return await res.json();
    },
  });
}
