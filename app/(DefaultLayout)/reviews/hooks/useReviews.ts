import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export function useReviews(type: "all" | "following") {
  return useQuery<Review[]>({
    queryKey: [queryKeys.review.reviews, type],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/reviews?type=${type}`);

      return await res.json();
    },
  });
}
