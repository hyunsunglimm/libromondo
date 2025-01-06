import DropdownIcon from "@/components/icons/DropdownIcon";
import { useState } from "react";
import UserListItem from "@/components/UserListItem";
import { useBookSavors } from "../hooks/useBookSavors";
import Spinner from "@/components/loader/Spinner";

type UsersWhoSavedBooksProps = {
  bookId: string;
};

export default function BookSavors({ bookId }: UsersWhoSavedBooksProps) {
  const { data: users, isPending } = useBookSavors(bookId);
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) {
    return <Spinner type="black" />;
  }

  return (
    <nav className="relative">
      {users && users.length > 0 && (
        <button
          className="border border-black py-1 px-2 rounded-md hover:bg-gray-50 transition flex justify-between items-center w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div />
          <p className="font-bold text-2xl md:text-base">
            {users?.length}명의 서재에 담겨있습니다.
          </p>
          <DropdownIcon isOpen={isOpen} />
        </button>
      )}
      {isOpen && (
        <ul className="border border-black rounded-md p-4 absolute top-14 md:top-12 w-full bg-white z-10 flex flex-col gap-4 max-h-72 overflow-y-scroll">
          {users?.map((user) => (
            <li key={user.id}>
              <UserListItem user={user} />
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
