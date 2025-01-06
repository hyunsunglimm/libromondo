// cancelQueries, setQueryData, invalidateQueries 비대해져서 리팩토링 고려
import { BookResponseType } from "@/types/book";
import { useMe } from "./useMe";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/constants/url";
import { SimpleUser } from "@/types/user";
import { getBookIdByISBN } from "@/utils/book";

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
  const { data: loginUser, isPending: meLoading } = useMe();
  const queryClient = useQueryClient();

  const simpleUser = {
    id: loginUser?.id,
    name: loginUser?.name,
    image: loginUser?.image,
  };

  const { data: savedIds, isPending: savedLoading } = useQuery<string[]>({
    queryKey: ["my-saved"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/books/my-saved`);

      return await res.json();
    },
  });

  const allLoading = meLoading || savedLoading;

  const isSave = savedIds?.includes(book.isbn) || false;

  const bookId = getBookIdByISBN(book.isbn);

  const { mutate } = useMutation({
    mutationFn: () => updateSave({ userId: loginUser?.id, book, isSave }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["my-saved"],
      });
      await queryClient.cancelQueries({
        queryKey: ["savedBooks", loginUser?.id],
      });
      await queryClient.cancelQueries({
        queryKey: ["bookSavors", bookId],
      });

      queryClient.setQueryData(["my-saved"], (prev: string[]) =>
        isSave ? prev.filter((id) => id !== book.isbn) : [...prev, book.isbn]
      );
      queryClient.setQueryData(
        ["savedBooks", loginUser?.id],
        (prev: BookResponseType[]) => {
          if (!prev) {
            // 마이페이지에 접속하지 않아 savedBooks가 fetch되기 전
            return;
          }

          return isSave
            ? prev.filter((prevBook) => prevBook.isbn !== book.isbn)
            : [...prev, book];
        }
      );
      queryClient.setQueryData(["bookSavors", bookId], (prev: SimpleUser[]) =>
        isSave
          ? prev.filter((user) => user.id !== simpleUser.id)
          : [...prev, simpleUser]
      );
    },
    onError: (error, variable) => {
      alert(`${error} ${variable}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-saved"] });
      queryClient.invalidateQueries({
        queryKey: ["savedBooks", loginUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["bookSavors", bookId],
      });
    },
  });

  return { isSave, allLoading, toggleSave: mutate };
}
