import { Review } from "@/types/review";
import Image from "next/image";
import ToggleStar from "./ToggleStar";
import { Button } from "./ui/button";
import ProfileImage from "./ProfileImage";

export default function ReviewDetail({ review }: { review: Review }) {
  return (
    <section className="w-[600px]">
      <div className="flex">
        <div className="basis-1/3">
          <Image
            src={review.book.thumbnail}
            alt={`${review.book.title} 이미지`}
            width={400}
            height={500}
            className="w-full border border-black rounded-md"
          />
        </div>
        <div className="basis-2/3 ml-4 flex flex-col gap-2">
          <p className="text-center text-xl font-bold pb-1 border-b border-black">
            {review.author}
          </p>
          <p className="text-center">{review.book.title}</p>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((num) => (
              <ToggleStar key={num} isFill={review.grade >= num} size="sm" />
            ))}
          </div>
          <div className="bg-neutral-100 p-4 rounded-md overflow-scroll grow">
            <p>{review.contents}</p>
          </div>
          <Button variant="destructive">리뷰 삭제</Button>
        </div>
      </div>
      <div className="border-t border-black mt-2">
        <p className="text-center text-lg font-bold">댓글</p>
        <ul className="flex flex-col p-4 bg-neutral-100 rounded-md">
          {review.comments.map((c) => (
            <li key={c.id} className="flex gap-2 border-b p-2">
              <ProfileImage image={c.image} name={c.name} size="sm" />
              <div>
                <p className="font-bold text-lg">{c.name}</p>
                <p className="text-gray-600">{c.comment}</p>
              </div>
            </li>
          ))}
        </ul>
        <input
          className="border mt-2 py-1 px-2 rounded-md w-full"
          placeholder="댓글을 입력해주세요."
        />
      </div>
    </section>
  );
}
