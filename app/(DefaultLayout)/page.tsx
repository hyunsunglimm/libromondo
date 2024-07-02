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
      <ul className="grid grid-cols-4 w-[800px] mx-auto mt-8 gap-4">
        {books.map((book) => (
          <li key={book?.isbn}>
            <Image
              src={book?.image}
              alt={`${book?.title} 이미지`}
              width={200}
              height={290}
              className="w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
