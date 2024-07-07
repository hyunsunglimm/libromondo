"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { SanityUser } from "@/types/user";
import { useState } from "react";
import useSWR from "swr";
import UserInfoEditForm from "./UserInfoEditForm";

export default function UserProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const { data: user, isLoading } = useSWR<SanityUser>("/api/user");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user?.image}
        alt={`${user?.name}님의 프로필 이미지`}
        className="w-32 h-32 border border-black rounded-full object-cover"
      />
      <p className="font-bold text-2xl">{user?.name}</p>
      <button
        onClick={() => setIsEdit(true)}
        className="bg-gray-100 p-2 rounded-md font-bold hover:bg-gray-200 transition"
      >
        내 정보 수정
      </button>
      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
        <UserInfoEditForm user={user} />
      </Modal>
    </div>
  );
}
