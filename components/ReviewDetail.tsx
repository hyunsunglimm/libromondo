"use client";

import { Review } from "@/types/review";
import Image from "next/image";
import ToggleStar from "./ToggleStar";
import { Button } from "./ui/button";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Spinner from "./spinner/Spinner";
import { SanityUser } from "@/types/user";
import { v4 as uuid } from "uuid";
import DeleteIcon from "./icons/DeleteIcon";
import { useModal } from "@/hooks/useModal";

type ReviewDetailProps = {
  reviewId: string;
  loginUser: SanityUser | undefined;
  isMe: boolean;
};

export default function ReviewDetail({
  reviewId,
  loginUser,
  isMe,
}: ReviewDetailProps) {
  const {
    data: review,
    mutate,
    isLoading,
  } = useSWR<Review>(`/api/review/${reviewId}`);

  const { mutate: globalMutate } = useSWRConfig();

  const [enteredComment, setEnteredComment] = useState("");
  const [removeReviewLoading, setRemoveReviewLoading] = useState(false);

  const { close } = useModal();

  if (isLoading) {
    return (
      <div className="w-80 h-80 flex justify-center items-center">
        <Spinner type="black" />
      </div>
    );
  }

  const bookId =
    review?.book.isbn.split(" ")[0] || review?.book.isbn.split(" ")[1];

  const addComment = async (commentId: string) => {
    return fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        reviewId: review?.id,
        comment: enteredComment,
        commentId,
      }),
    }).then((res) => res.json());
  };

  const removeComment = async (commentId: string) => {
    return fetch("/api/comments", {
      method: "PUT",
      body: JSON.stringify({ reviewId: review?.id, commentId }),
    }).then((res) => res.json());
  };

  const revomeReview = async () => {
    setRemoveReviewLoading(true);
    await fetch(`/api/review/${reviewId}`, {
      method: "HEAD",
    });
    close();
    setRemoveReviewLoading(false);
    globalMutate(`/api/reviews/${loginUser?.id}`);
    globalMutate("/api/reviews?type=all");
    globalMutate("/api/reviews?type=following");
    globalMutate(`/api/reviews?type=book&isbn=${review?.book.isbn}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review || !loginUser) return;

    const commentId = uuid();

    const newComment = {
      id: commentId,
      userId: loginUser.id,
      name: loginUser?.name,
      comment: enteredComment,
      image: loginUser?.image,
    };

    const newReview = {
      ...review,
      comments: [...review.comments, newComment],
    };

    mutate(addComment(commentId), {
      optimisticData: newReview,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
    setEnteredComment("");
  };

  const handleClick = (commentId: string) => {
    if (!review) return;

    const newReview = {
      ...review,
      comments: review.comments.filter((c) => c.id !== commentId),
    };

    mutate(removeComment(commentId), {
      optimisticData: newReview,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return (
    <section className="w-[36rem]">
      <div className="flex">
        <div className="basis-1/3 flex flex-col justify-center">
          <Image
            src={review?.book.thumbnail || "/images/no-image.png"}
            alt={`${review?.book.title} 이미지`}
            width={400}
            height={500}
            className="w-full border border-black rounded-md"
          />
          <Button
            asChild
            className="mt-2 w-full text-xl md:text-base h-16 md:h-12"
          >
            <Link href={`/book/${bookId}`}>도서 상세 보기</Link>
          </Button>
        </div>
        <div className="basis-2/3 ml-4 flex flex-col gap-2">
          <Link
            href={`/mypage/${review?.author.id}`}
            className="py-2 border-b border-black flex justify-center items-center gap-2 hover:bg-neutral-50 transition"
          >
            <ProfileImage
              image={review?.author.image || ""}
              name={review?.author.name || ""}
              size="sm"
            />
            <p className="text-3xl md:text-xl font-bold">
              {review?.author.name}
            </p>
          </Link>
          <p className="text-center text-2xl md:text-base">
            {review?.book.title}
          </p>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map(
              (num) =>
                review && (
                  <ToggleStar
                    key={num}
                    isFill={review?.grade >= num}
                    size="sm"
                  />
                )
            )}
          </div>
          <div className="bg-neutral-100 p-4 rounded-md overflow-y-scroll grow max-h-72">
            <p className="text-xl md:text-base leading-9">{review?.contents}</p>
          </div>
          {isMe && (
            <Button
              variant="destructive"
              onClick={revomeReview}
              className="text-xl md:text-base h-16 md:h-12"
            >
              {removeReviewLoading ? <Spinner /> : "리뷰 삭제"}
            </Button>
          )}
        </div>
      </div>
      <div className="border-t border-black mt-4 pt-4 md:pt-2 md:mt-2">
        <p className="text-center text-3xl md:text-lg font-bold">댓글</p>
        {review?.comments.length === 0 && (
          <p className="text-center text-2xl md:text-base mt-2 font-bold text-gray-400">
            아직 댓글이 없습니다.
          </p>
        )}
        {review && review.comments.length > 0 && (
          <ul className="flex flex-col p-4 bg-neutral-100 rounded-md max-h-72 overflow-y-scroll">
            {review?.comments.map((c) => {
              const isValidRemoveComment =
                review.author.id === loginUser?.id ||
                c.userId === loginUser?.id;

              return (
                <li key={c.id} className="flex gap-2 border-b p-2">
                  <Link href={`/mypage/${c.userId}`} className="shrink-0">
                    <ProfileImage image={c.image} name={c.name} size="sm" />
                  </Link>
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <Link href={`/mypage/${c.userId}`}>
                        <p className="font-bold text-2xl md:text-lg">
                          {c.name}
                        </p>
                      </Link>
                      {isValidRemoveComment && (
                        <button onClick={() => handleClick(c.id)}>
                          <DeleteIcon />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 text-xl md:text-base">
                      {c.comment}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {loginUser && (
          <form className="flex mt-2 gap-2" onSubmit={handleSubmit}>
            <input
              className="border py-1 px-2 rounded-md w-full text-[16px]"
              placeholder="댓글을 입력해주세요."
              required
              onChange={(e) => setEnteredComment(e.target.value)}
              value={enteredComment}
            />
            <Button className="w-28 h-16 md:h-12 text-2xl md:text-lg">
              작성
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
