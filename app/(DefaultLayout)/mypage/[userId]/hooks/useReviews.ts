import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export function useReviews(userId: string) {
  return useQuery<Review[]>({
    queryKey: [queryKeys.review.reviews, userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/reviews/${userId}`);

      return await res.json();
    },
  });
}
