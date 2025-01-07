import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../useModal";
import { queryKeys } from "@/constants/queryKeys";

const removeReviewMutationFn = async (reviewId: string) => {
  await fetch(`/api/review/${reviewId}`, {
    method: "HEAD",
  });
};

export function useReviewDetail() {
  const { close } = useModal();

  const queryClient = useQueryClient();

  const { mutate: removeReview, isPending: isRemoving } = useMutation<
    unknown,
    Error,
    string
  >({
    mutationFn: (reviewId) => removeReviewMutationFn(reviewId),
    onError: (error) => {
      alert(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.review.reviewsByBook],
      });
      close();
    },
  });

  return { isRemoving, removeReview };
}
