"use client";

import UserListItem from "@/components/UserListItem";
import { SimpleUser } from "@/types/user";
import { ScaleLoader } from "react-spinners";
import useSWR from "swr";

type UserListProps = {
  keyword: string;
};

export default function UserList({ keyword }: UserListProps) {
  const { data: users, isLoading } = useSWR<SimpleUser[]>(
    keyword ? `/api/user/search?query=${keyword}` : null
  );

  if (isLoading) {
    return (
      <ScaleLoader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  return (
    <>
      {users?.length === 0 && (
        <p className="text-center text-gray-300 text-xl mt-4">
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
