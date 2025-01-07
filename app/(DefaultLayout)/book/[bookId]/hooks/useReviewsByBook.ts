import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export function useReviewsByBook(bookId: string) {
  return useQuery<Review[]>({
    queryKey: [queryKeys.review.reviewsByBook, bookId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/reviews/by-book/${bookId}`);

      return await res.json();
    },
  });
}
