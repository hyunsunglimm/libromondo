import { BookResponseType } from "@/types/book";
import useMe from "./useMe";
import { useEffect } from "react";
import { useAlarmStore } from "@/store/alarm";
import useSWR, { useSWRConfig } from "swr";

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

export default function useUser(book: BookResponseType, isDetail: boolean) {
  const { isAlarm, onAlarm, offAlarm } = useAlarmStore();
  const { loginUser, mutate } = useMe();

  const bookId = book.isbn.split(" ")[0] || book.isbn.split(" ")[1];

  const { data: usersWhoSavedBooks, mutate: bookMutate } = useSWR(
    isDetail && `/api/book/${bookId}/saved`
  );

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

    mutate(updateSave(loginUser.id, book, isSave), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });

    if (isDetail) {
      bookMutate(null, {
        optimisticData: isSave
          ? usersWhoSavedBooks.filter(
              (user: { id: string; name: string; image: string }) =>
                user.id !== loginUser.id
            )
          : [
              ...usersWhoSavedBooks,
              {
                id: loginUser.id,
                name: loginUser.name,
                image: loginUser.image,
              },
            ],
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    }
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
