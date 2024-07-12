"use client";

import Modal from "@/components/Modal";
import { SanityUser } from "@/types/user";
import { useState } from "react";
import useSWR from "swr";
import UserInfoEditForm from "./UserInfoEditForm";
import useMe from "@/hooks/useMe";
import ProfileImage from "@/components/ProfileImage";

export default function UserProfile({ userId }: { userId: string }) {
  const [isEdit, setIsEdit] = useState(false);
  const { loginUser } = useMe();
  const { data: user, isLoading } = useSWR<SanityUser>(`/api/user/${userId}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isMe = loginUser?.id === userId;

  const closeModal = () => setIsEdit(false);

  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      {user && <ProfileImage image={user.image} name={user.name} size="lg" />}
      <p className="font-bold text-2xl">{user?.name}</p>
      {isMe && (
        <button
          onClick={() => setIsEdit(true)}
          className="bg-gray-100 p-2 rounded-md font-bold hover:bg-gray-200 transition"
        >
          내 정보 수정
        </button>
      )}
      <Modal isOpen={isEdit} onClose={closeModal}>
        <UserInfoEditForm user={user} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
