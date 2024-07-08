"use client";

import { SanityUser } from "@/types/user";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";
import { BookResponseType } from "@/types/book";

type HeartToggleProps = {
  isSave: boolean;
  onClick: () => Promise<SanityUser | undefined>;
};

export default function HeartToggle({ isSave, onClick }: HeartToggleProps) {
  return (
    <>
      {isSave ? (
        <HeartFillIcon onClick={onClick} />
      ) : (
        <HeartIcon onClick={onClick} />
      )}
    </>
  );
}
