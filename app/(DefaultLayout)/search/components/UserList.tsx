"use client";

import UserListItem from "@/components/UserListItem";
import { ScaleLoader } from "react-spinners";
import { useSearchUser } from "../hooks/useSearchUser";

type UserListProps = {
  keyword: string;
};

export default function UserList({ keyword }: UserListProps) {
  const { data: users, isLoading } = useSearchUser(keyword);

  if (isLoading) {
    return (
      <ScaleLoader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  return (
    <>
      {users?.length === 0 && (
        <p className="text-center text-gray-400 text-3xl md:text-xl font-bold mt-8">
          검색된 사용자가 없습니다.
        </p>
      )}
      <ul className="w-full flex flex-col gap-4 mt-8">
        {users?.map((user) => (
          <li key={user.id}>
            <UserListItem user={user} outlined />
          </li>
        ))}
      </ul>
    </>
  );
}
