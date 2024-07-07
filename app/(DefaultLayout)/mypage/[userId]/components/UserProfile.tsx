"use client";

import { SanityUser } from "@/types/user";
import useSWR from "swr";

export default function UserProfile() {
  const { data: user, isLoading } = useSWR<SanityUser>("/api/user");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user?.image || "/images/empty-profile-image.jpeg"}
        alt={`${user?.name}님의 프로필 이미지`}
        className="w-32 h-32 border border-black rounded-full object-cover"
      />
      <p className="font-bold text-2xl">{user?.name}</p>
      <button className="bg-gray-200 p-2 rounded-md font-bold">
        내 정보 수정
      </button>
    </div>
  );
}
