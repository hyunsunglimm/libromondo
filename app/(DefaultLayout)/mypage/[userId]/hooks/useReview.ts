import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export function useReview(userId: string) {
  return useQuery<Review[]>({
    queryKey: ["review", userId],
    queryFn: async () => {
      const res = await fetch(`/api/reviews/${userId}`);

      return await res.json();
    },
  });
}
