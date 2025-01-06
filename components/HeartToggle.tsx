"use client";

import { useSave } from "@/hooks/useSave";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";
import { BookResponseType } from "@/types/book";

type HeartToggleProps = {
  book: BookResponseType;
};

export default function HeartToggle({ book }: HeartToggleProps) {
  const { toggleSave } = useSave();

  const isSave = true;

  return (
    <>
      {isSave ? (
        <HeartFillIcon onClick={() => toggleSave({ book, isSave })} />
      ) : (
        <HeartIcon onClick={() => toggleSave({ book, isSave })} />
      )}
    </>
  );
}
