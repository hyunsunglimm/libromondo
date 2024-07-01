import MotionText from "@/components/MotionText";
import Image from "next/image";
import { BookResponseType } from "../api/book/type";

export default async function HomePage() {
  const res = await fetch("http://localhost:3000/api/book");
  const books: BookResponseType[] = await res.json();

  return (
    <section className="w-full">
      <MotionText className="mt-20 text-4xl">
        세상엔 다양한 책들이 있습니다.
      </MotionText>
      <MotionText className="mt-4 text-3xl">
        리브로 몬도와 함께 알아가보세요.
      </MotionText>
      <ul>
        {books.map((book) => (
          <li key={book?.isbn}>
            <Image
              src={book?.thumbnail}
              alt={`${book?.title} 이미지`}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
