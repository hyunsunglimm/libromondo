"use client";

import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";
import useUser from "@/hooks/useUser";
import { BookResponseType } from "@/types/book";

export default function HeartToggle({ book }: { book: BookResponseType }) {
  const { isSave, updateSaveHandler } = useUser(book);
  return (
    <>
      {isSave ? (
        <HeartFillIcon onClick={updateSaveHandler} />
      ) : (
        <HeartIcon onClick={updateSaveHandler} />
      )}
    </>
  );
}
