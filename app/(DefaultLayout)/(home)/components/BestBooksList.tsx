"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";
import { useGetBestBook } from "../hooks/useGetBestBook";

export default function BestBooksList() {
  const { data: books, isPending } = useGetBestBook();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center mt-24">
        <p className="text-2xl">국내 베스트 도서를 불러오는 중입니다.</p>
        <p className="text-2xl">잠시만 기다려주세요.</p>
        <ScaleLoader className="mt-8" />
      </div>
    );
  }

  return (
    <>
      {!isPending && (
        <motion.ul
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid md:grid-cols-4 grid-cols-3 max-w-[800px] w-full mx-auto mt-8 gap-4"
        >
          {books?.map((book, index) => {
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
