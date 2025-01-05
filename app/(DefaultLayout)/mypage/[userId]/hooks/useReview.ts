import { BASE_URL } from "@/constants/url";
import { Review } from "@/types/review";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useReview(userId: string) {
  return useSuspenseQuery<Review[]>({
    queryKey: ["review", userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/reviews/${userId}`);

      return await res.json();
    },
  });
}
