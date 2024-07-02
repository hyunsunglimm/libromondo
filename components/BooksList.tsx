"use client";

import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";
import { BookResponseType } from "@/types/book";
import { useEffect, useState } from "react";

type BooksListProps = {
  fetchUrl: string;
  delay?: boolean;
};

export default function BooksList({ fetchUrl, delay = false }: BooksListProps) {
  const { data: books, isLoading } = useSWR<BookResponseType[]>(fetchUrl);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const isShow = delay || show;

  if (isLoading && !delay) {
    return <p className="w-full text-center">Loading...</p>;
  }

  return (
    <>
      {books && isShow && (
        <motion.ul
          initial={delay ? { opacity: 0, y: 50 } : undefined}
          animate={delay ? { opacity: 1, y: 0 } : undefined}
          transition={delay ? { duration: 1, ease: "easeOut" } : undefined}
          className="grid grid-cols-4 w-[800px] mx-auto mt-8 gap-4"
        >
          {books.map((book, index) => (
            <li key={book?.isbn}>
              <Image
                src={book?.thumbnail || ""}
                alt={`${book?.title} 이미지`}
                width={200}
                height={300}
                className="w-full h-72 object-cover shadow-lg border"
                priority={index < 13}
              />
            </li>
          ))}
        </motion.ul>
      )}
    </>
  );
}
