"use client";

import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";
import { BookResponseType } from "@/types/book";
import { useEffect, useState } from "react";

export default function BestBooksList() {
  const { data: books } = useSWR<BookResponseType[]>("/api/book");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {books && show && (
        <motion.ul
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
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
