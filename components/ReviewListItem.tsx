import { Review } from "@/types/review";
import { convertToKST } from "@/utils/date";
import Image from "next/image";
import ToggleStar from "./ToggleStar";

type ReviewListItemProps = {
  review: Review;
};

export default function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <li
      key={review.id}
      className="border border-black p-2 rounded-md hover:bg-neutral-50 transition cursor-pointer flex"
    >
      <Image
        src={review.book.thumbnail}
        alt={`${review.book.title} 이미지`}
        width={200}
        height={200}
        className="w-12 border border-black rounded-md"
      />
      <div className="ml-2 w-full overflow-hidden">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <p>{review.book.title}</p>
            <p>|</p>
            <p>작성자 : {review.author}</p>
            <p>|</p>
            <p className="text-gray-400 text-sm">
              {convertToKST(review.updatedAt)}
            </p>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((num) => (
              <ToggleStar key={num} isFill={review.grade >= num} size="sm" />
            ))}
          </div>
        </div>
        <div className="bg-neutral-100 mt-2 p-2 rounded-md">
          <p className="truncate">{review.contents}</p>
        </div>
      </div>
    </li>
  );
}
