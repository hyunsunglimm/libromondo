import ProfileImage from "@/components/ProfileImage";
import DropdownIcon from "@/components/icons/DropdownIcon";
import Link from "next/link";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import useSWR from "swr";
import { motion } from "framer-motion";

type UsersWhoSavedBooksProps = {
  bookId: string;
};

type UsersWhoSavedBooksType = {
  id: string;
  name: string;
  image: string;
};

export default function UsersWhoSavedBooks({
  bookId,
}: UsersWhoSavedBooksProps) {
  const { data: usersWhoSavedBooks, isLoading } = useSWR<
    UsersWhoSavedBooksType[]
  >(`/api/book/${bookId}/saved`);
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
              <Link
                href={`/mypage/${user.id}`}
                className="flex justify-between items-center hover:bg-gray-50 transition p-1 rounded-md"
              >
                <div />
                <div className="flex items-center gap-4">
                  <ProfileImage image={user.image} name={user.name} size="sm" />
                  <p>{user.name}</p>
                </div>
                <RiArrowDropDownLine className="w-7 h-7 -rotate-90" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
