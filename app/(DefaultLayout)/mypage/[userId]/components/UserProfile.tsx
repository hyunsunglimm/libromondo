"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import UserInfoEditForm from "./UserInfoEditForm";
import ProfileImage from "@/components/ProfileImage";
import DropdownIcon from "@/components/icons/DropdownIcon";
import UserListItem from "@/components/UserListItem";
import { Button } from "@/components/ui/button";
import UserProfileSkeleton from "./UserProfileSkeleton";
import { useUserById } from "../hooks/useUserById";

export default function UserProfile({ userId }: { userId: string }) {
  const [isEdit, setIsEdit] = useState(false);
  const [dropdownType, setDropdownType] = useState("");

  const {
    data: user,
    isPending,
    isFollow,
    isMe,
    toggleFollow,
  } = useUserById(userId);

  if (isPending) {
    return <UserProfileSkeleton />;
  }

  const closeModal = () => setIsEdit(false);

  const dropdownHandler = (type: string) => {
    if (dropdownType === type) {
      setDropdownType("");
    } else {
      setDropdownType(type);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        {user && <ProfileImage image={user.image} name={user.name} size="lg" />}
        <p className="font-bold text-4xl md:text-2xl">{user?.name}</p>
        {isMe && (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-gray-100 p-2 rounded-md font-bold hover:bg-gray-200 transition text-2xl md:text-base"
          >
            내 정보 수정
          </button>
        )}
        {!isMe && (
          <Button
            onClick={() => toggleFollow()}
            className="w-32 md:w-20 text-2xl md:text-base h-16 md:h-12"
          >
            {isFollow ? "언팔로우" : "팔로우"}
          </Button>
        )}
        <div className="w-full flex gap-4">
          <nav className="relative w-full">
            <button
              className="border border-black rounded-md p-2 md:p-1 w-full flex justify-between items-center hover:bg-gray-50 trasition"
              onClick={() => dropdownHandler("following")}
            >
              <div />
              <p className="text-2xl md:text-base">
                팔로잉: {user?.following.length}명
              </p>
              <DropdownIcon isOpen={dropdownType === "following"} />
            </button>
            {dropdownType === "following" && (
              <ul className="border border-black rounded-md p-4 absolute top-16 md:top-12 w-full bg-white z-10 flex flex-col gap-4 max-h-72 overflow-y-scroll">
                {user?.following?.map((user) => (
                  <li key={user.id}>
                    <UserListItem user={user} />
                  </li>
                ))}
              </ul>
            )}
          </nav>
          <nav className="relative w-full">
            <button
              className="border border-black rounded-md p-2 md:p-1 w-full flex justify-between items-center hover:bg-gray-50 trasition"
              onClick={() => dropdownHandler("followers")}
            >
              <div />
              <p className="text-2xl md:text-base">
                팔로워: {user?.followers.length}명
              </p>
              <DropdownIcon isOpen={dropdownType === "followers"} />
            </button>
            {dropdownType === "followers" && (
              <ul className="border border-black rounded-md p-4 absolute top-16 md:top-12 w-full bg-white z-10 flex flex-col gap-4 max-h-72 overflow-y-scroll">
                {user?.followers?.map((user) => (
                  <li key={user.id}>
                    <UserListItem user={user} />
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </div>
      <Modal isOpen={isEdit} onClose={closeModal}>
        <UserInfoEditForm user={user} closeModal={closeModal} />
      </Modal>
    </>
  );
}
