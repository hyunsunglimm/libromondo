"use client";

import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";
import useUser from "@/hooks/useUser";
import { BookResponseType } from "@/types/book";

type HeartToggleProps = {
  book: BookResponseType;
  isDetail?: boolean;
};

export default function HeartToggle({
  book,
  isDetail = false,
}: HeartToggleProps) {
  const { isSave, updateSaveHandler } = useUser(book, isDetail);
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
