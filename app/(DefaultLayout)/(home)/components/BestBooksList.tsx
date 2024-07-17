"use client";

import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";
import { BookResponseType } from "@/types/book";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";

export default function BestBooksList() {
  const { data: books, isLoading } = useSWR<BookResponseType[]>("/api/book");

  if (isLoading) {
    return (
      <div className="flex justify-center mt-40">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <>
      {!isLoading && books && (
        <motion.ul
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid md:grid-cols-4 grid-cols-3 max-w-[800px] w-full mx-auto mt-8 gap-4"
        >
          {books.map((book, index) => {
            const bookId = book.isbn.split(" ")[0];

            return (
              <li
                key={book?.isbn}
                className="w-full shadow-lg border overflow-hidden cursor-pointer"
              >
                <Link href={`/book/${bookId}`}>
                  <Image
                    src={book?.thumbnail || ""}
                    alt={`${book?.title} 이미지`}
                    width={200}
                    height={300}
                    className="hover:scale-105 transition w-full"
                    priority={index < 13}
                  />
                </Link>
              </li>
            );
          })}
        </motion.ul>
      )}
    </>
  );
}
