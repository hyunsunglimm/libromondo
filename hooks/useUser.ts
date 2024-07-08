import { BookResponseType } from "@/types/book";
import useMe from "./useMe";
import { useEffect, useState } from "react";
import { useAlarmStore } from "@/store/alarm";

const updateSave = async (
  userId: string,
  book: BookResponseType,
  isSave: boolean
) => {
  return fetch(`/api/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ userId, book, isSave }),
  }).then((res) => res.json());
};

export default function useUser(book: BookResponseType) {
  const { isAlarm, onAlarm, offAlarm } = useAlarmStore();
  const { loginUser, mutate } = useMe();

  const isSave =
    loginUser?.books.map((b) => b.isbn).includes(book.isbn) ?? false;

  const updateSaveHandler = async () => {
    const save = loginUser?.books;

    if (!save) {
      onAlarm();
      return;
    }

    const newUser = {
      ...loginUser,
      books: isSave
        ? save.filter((s) => s.isbn !== book.isbn)
        : [...save, book],
    };

    return mutate(updateSave(loginUser.id, book, isSave), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  useEffect(() => {
    if (isAlarm) {
      const timer = setTimeout(() => {
        offAlarm();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAlarm, offAlarm]);

  return { isSave, updateSaveHandler };
}
