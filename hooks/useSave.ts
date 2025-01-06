import { BookResponseType } from "@/types/book";
import { useMe } from "./useMe";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/constants/url";

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

export function useSave(book: BookResponseType) {
  const { data: loginUser } = useMe();
  const queryClient = useQueryClient();

  const { data: savedIds } = useQuery<string[]>({
    queryKey: ["my-saved"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/books/my-saved`);

      return await res.json();
    },
  });

  const isSave = savedIds?.includes(book.isbn) || false;

  const { mutate } = useMutation({
    mutationFn: () => updateSave({ userId: loginUser?.id, book, isSave }),
    onMutate: async () => {
      queryClient.setQueryData(["my-saved"], (prev: string[]) =>
        isSave ? prev.filter((id) => id !== book.isbn) : [...prev, book.isbn]
      );
      queryClient.setQueryData(
        ["savedBooks", loginUser?.id],
        (prev: BookResponseType[]) =>
          isSave
            ? prev.filter((prevBook) => prevBook.isbn !== book.isbn)
            : [...prev, book]
      );
    },
    onError: () => {
      alert("에러 발생!!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-saved"] });
      queryClient.invalidateQueries({
        queryKey: ["savedBooks", loginUser?.id],
      });
    },
  });

  return { isSave, toggleSave: mutate };
}
