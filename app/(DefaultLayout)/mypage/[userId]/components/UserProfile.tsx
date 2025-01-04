"use client";

import { useState } from "react";
import UserInfoEditForm from "./UserInfoEditForm";
import ProfileImage from "@/components/ProfileImage";
import DropdownIcon from "@/components/icons/DropdownIcon";
import UserListItem from "@/components/UserListItem";
import { Button } from "@/components/ui/button";
import UserProfileSkeleton from "./UserProfileSkeleton";
import { useUserById } from "../hooks/useUserById";
import { useModal } from "@/hooks/useModal";
import Dropdown from "@/components/ui/Dropdown";

export default function UserProfile({ userId }: { userId: string }) {
  const [dropdownType, setDropdownType] = useState("");
  const { open } = useModal();

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
            onClick={() => open(<UserInfoEditForm user={user} />)}
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
          <Dropdown
            isOpen={dropdownType === "following"}
            title={`팔로잉: ${user?.following?.length || 0}명`}
            list={user?.following}
            onClick={() => dropdownHandler("following")}
          />
          <Dropdown
            isOpen={dropdownType === "followers"}
            title={`팔로워: ${user?.followers?.length || 0}명`}
            list={user?.followers}
            onClick={() => dropdownHandler("followers")}
          />
        </div>
      </div>
    </>
  );
}
