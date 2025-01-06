import { BookResponseType } from "@/types/book";
import { useMe } from "./useMe";
import { useMutation } from "@tanstack/react-query";
import { useSavedBooks } from "@/app/(DefaultLayout)/mypage/[userId]/hooks/useSavedBooks";

type UpdateSaveParams = {
  userId: string | undefined;
  book: BookResponseType;
  isSave: boolean;
};

const updateSave = async ({ userId, book, isSave }: UpdateSaveParams) => {
  if (!userId) return;

  return fetch(`/api/books/${userId}/saved`, {
    method: "PUT",
    body: JSON.stringify({ userId, book, isSave }),
  }).then((res) => res.json());
};

export function useSave() {
  const { data: loginUser } = useMe();
  // const { data: mySavedBooks } = useSavedBooks(loginUser?.id || "");

  const { mutate } = useMutation<
    unknown,
    Error,
    Omit<UpdateSaveParams, "userId">
  >({
    mutationFn: ({ book, isSave }: Omit<UpdateSaveParams, "userId">) =>
      updateSave({ userId: loginUser?.id, book, isSave }),
  });

  return { toggleSave: mutate };
}
