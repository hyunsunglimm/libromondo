"use client";

import { ScaleLoader } from "react-spinners";
import useSWR from "swr";

type ReviewListProps = {
  type: "all" | "following";
};

export default function ReviewList({ type }: ReviewListProps) {
  const { data: reviews, isLoading } = useSWR(`/api/reviews?type=${type}`);

  if (isLoading) {
    return (
      <ScaleLoader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  console.log(reviews);

  return <p>reviews</p>;
}
