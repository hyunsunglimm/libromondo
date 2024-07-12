import DropdownIcon from "@/components/icons/DropdownIcon";
import { useState } from "react";
import useSWR from "swr";
import UserListItem from "@/components/UserListItem";
import { SimpleUser } from "@/types/user";

type UsersWhoSavedBooksProps = {
  bookId: string;
};

export default function UsersWhoSavedBooks({
  bookId,
}: UsersWhoSavedBooksProps) {
  const { data: usersWhoSavedBooks, isLoading } = useSWR<SimpleUser[]>(
    `/api/book/${bookId}/saved`
  );
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="relative">
      {usersWhoSavedBooks && usersWhoSavedBooks.length > 0 && (
        <button
          className="border border-black py-1 px-2 rounded-md hover:bg-gray-50 transition flex justify-between items-center w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div />
          <p className="font-bold">
            {usersWhoSavedBooks.length}명의 서재에 담겨있습니다.
          </p>
          <DropdownIcon isOpen={isOpen} />
        </button>
      )}
      {isOpen && (
        <ul className="border border-black rounded-md p-4 absolute top-12 w-full bg-white z-10 flex flex-col gap-4">
          {usersWhoSavedBooks?.map((user) => (
            <li key={user.id}>
              <UserListItem user={user} />
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
