import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export function useReviewsByUser(userId: string) {
  return useQuery<Review[]>({
    queryKey: [queryKeys.review.reviewsByUser, userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/reviews/by-user/${userId}`);

      return await res.json();
    },
  });
}
