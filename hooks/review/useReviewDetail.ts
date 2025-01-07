import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../useModal";
import { queryKeys } from "@/constants/queryKeys";
import { v4 as uuid } from "uuid";
import { Review } from "@/types/review";
import { BASE_URL } from "@/constants/url";
import { getBookIdByISBN } from "@/utils/book";
import { useMe } from "../useMe";

type AddCommentParams = {
  event: React.FormEvent;
  reviewId: string;
  comment: string;
};

type RemoveCommentParams = {
  reviewId: string;
  commentId: string;
};

const removeReviewMutationFn = async (reviewId: string) => {
  await fetch(`/api/review/${reviewId}`, {
    method: "HEAD",
  });
};

const addCommentMutationFn = async ({
  event,
  reviewId,
  comment,
}: AddCommentParams) => {
  event.preventDefault();

  const commentId = uuid();

  return fetch("/api/review/comments", {
    method: "POST",
    body: JSON.stringify({
      reviewId,
      comment,
      commentId,
    }),
  }).then((res) => res.json());
};

const removeCommentMutationFn = async ({
  reviewId,
  commentId,
}: RemoveCommentParams) => {
  return fetch("/api/review/comments", {
    method: "PUT",
    body: JSON.stringify({ reviewId, commentId }),
  }).then((res) => res.json());
};

export function useReviewDetail(reviewId: string) {
  const { close } = useModal();
  const { data: loginUser } = useMe();

  const query = useQuery<Review>({
    queryKey: [queryKeys.review.base, reviewId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/review/${reviewId}`);

      return await res.json();
    },
  });

  const bookId = getBookIdByISBN(query.data?.book.isbn || "");

  const isMine = loginUser?.id === query.data?.author.id;

  const queryClient = useQueryClient();

  // 리뷰 삭제
  const { mutate: removeReview, isPending: isRemoving } = useMutation({
    mutationFn: () => removeReviewMutationFn(reviewId),
    onError: (error) => {
      alert(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.review.reviewsByBook, bookId],
      });
      close();
    },
  });

  // 댓글 작성
  const { mutate: addComment } = useMutation<
    unknown,
    Error,
    Omit<AddCommentParams, "reviewId">
  >({
    mutationFn: ({ event, comment }) =>
      addCommentMutationFn({ event, reviewId, comment }),
    onMutate: async ({ comment }) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.review.base, reviewId],
      });

      queryClient.setQueryData(
        [queryKeys.review.base, reviewId],
        (prev: Review) => {
          const newComment = {
            id: uuid(),
            userId: loginUser?.id,
            name: loginUser?.name,
            comment,
            image: loginUser?.image,
          };

          const newReview = {
            ...prev,
            comments: [...prev.comments, newComment],
          };
          return newReview;
        }
      );
    },
    onError: (error) => {
      alert(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.review.base, reviewId],
      });
    },
  });

  // 댓글 삭제
  const { mutate: removeComment } = useMutation<
    unknown,
    Error,
    Pick<RemoveCommentParams, "commentId">
  >({
    mutationFn: ({ commentId }) =>
      removeCommentMutationFn({ reviewId, commentId }),
    onMutate: ({ commentId }) => {
      queryClient.cancelQueries({
        queryKey: [queryKeys.review.base, reviewId],
      });

      queryClient.setQueryData(
        [queryKeys.review.base, reviewId],
        (prev: Review) => {
          const newComments = prev.comments.filter(
            (comment) => comment.id !== commentId
          );

          return { ...prev, comments: newComments };
        }
      );
    },
    onError: (error) => {
      alert(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.review.base, reviewId],
      });
    },
  });

  return {
    ...query,
    isRemoving,
    isMine,
    removeReview,
    addComment,
    removeComment,
  };
}
