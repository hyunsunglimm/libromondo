import { BookResponseType } from "@/app/api/book/type";
import Image from "next/image";

export default async function BestBooksList() {
  const res = await fetch("http://localhost:3000/api/book");
  const books: BookResponseType[] = await res.json();

  return (
    <ul className="grid grid-cols-4 w-[800px] mx-auto mt-8 gap-4">
      {books.map((book) => (
        <li key={book?.isbn}>
          <Image
            src={book?.image}
            alt={`${book?.title} 이미지`}
            width={200}
            height={300}
            className="w-full h-72 object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
