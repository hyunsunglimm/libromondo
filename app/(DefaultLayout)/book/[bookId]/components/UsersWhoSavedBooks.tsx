import useSWR from "swr";

type UsersWhoSavedBooksProps = {
  bookId: string;
};

export default function UsersWhoSavedBooks({
  bookId,
}: UsersWhoSavedBooksProps) {
  const { data: usersWhoSavedBooks } = useSWR(`/api/book/${bookId}/saved`);

  return (
    <>
      {usersWhoSavedBooks?.length > 0 && (
        <p className="text-center font-bold">
          {usersWhoSavedBooks.length}명이 좋아합니다.
        </p>
      )}
    </>
  );
}
