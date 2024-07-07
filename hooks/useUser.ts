import { BookResponseType } from "@/types/book";
import { SanityUser } from "@/types/user";
import useSWR from "swr";

const updateSave = async (
  userId: string,
  book: BookResponseType,
  isSave: boolean
) => {
  return fetch("/api/user", {
    method: "PUT",
    body: JSON.stringify({ userId, book, isSave }),
  }).then((res) => res.json());
};

export default function useUser(book: BookResponseType) {
  const { data: user, mutate } = useSWR<SanityUser>("/api/user");

  const isSave = user?.books.map((b) => b.isbn).includes(book.isbn) ?? false;

  const updateSaveHandler = async () => {
    const save = user?.books;

    if (!save) return;

    const newUser = {
      ...user,
      books: isSave
        ? save.filter((s) => s.isbn !== book.isbn)
        : [...save, book],
    };

    return mutate(updateSave(user.id, book, isSave), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { updateSaveHandler };
}
