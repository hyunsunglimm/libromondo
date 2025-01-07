import { BookResponseType } from "@/types/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../useModal";
import { queryKeys } from "@/constants/queryKeys";

type WriteReviewParams = {
  event: React.FormEvent;
  book: BookResponseType;
  enteredContents: string;
  grade: number;
};

const writeReviewMutationFn = async ({
  event,
  book,
  enteredContents,
  grade,
}: WriteReviewParams) => {
  event.preventDefault();

  await fetch("/api/review", {
    method: "POST",
    body: JSON.stringify({ book, contents: enteredContents, grade }),
  });
};

export function useReview() {
  const { close } = useModal();

  const queryClient = useQueryClient();

  const { mutate: writeReview, isPending: isWriting } = useMutation({
    mutationFn: writeReviewMutationFn,
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

  return { writeReview, isWriting };
}
