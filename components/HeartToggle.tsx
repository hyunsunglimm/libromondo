"use client";

import { useSave } from "@/hooks/useSave";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";
import { BookResponseType } from "@/types/book";

type HeartToggleProps = {
  book: BookResponseType;
};

export default function HeartToggle({ book }: HeartToggleProps) {
  const { isSave, toggleSave } = useSave(book);

  return (
    <>
      {isSave ? (
        <HeartFillIcon onClick={toggleSave} />
      ) : (
        <HeartIcon onClick={toggleSave} />
      )}
    </>
  );
}
