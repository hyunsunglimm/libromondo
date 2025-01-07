"use client";

import { useSave } from "@/hooks/useSave";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";
import { BookResponseType } from "@/types/book";

type HeartToggleProps = {
  book: BookResponseType;
};

export default function HeartToggle({ book }: HeartToggleProps) {
  const { isSave, allLoading, toggleSave } = useSave(book);

  if (allLoading) return <div className="w-12 h-12 md:w-7 md:h-7" />;

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
