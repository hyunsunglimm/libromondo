import { SimpleUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useBookSavors(bookId: string) {
  return useQuery<SimpleUser[]>({
    queryKey: ["bookSavors", bookId],
    queryFn: async () => {
      const res = await fetch(`/api/user/savors?bookId=${bookId}`);

      return await res.json();
    },
  });
}
