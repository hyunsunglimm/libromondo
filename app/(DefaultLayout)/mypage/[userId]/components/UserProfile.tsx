"use client";

import Modal from "@/components/Modal";
import { SanityUser } from "@/types/user";
import { useEffect, useState } from "react";
import useSWR from "swr";
import UserInfoEditForm from "./UserInfoEditForm";
import useMe from "@/hooks/useMe";
import ProfileImage from "@/components/ProfileImage";
import DropdownIcon from "@/components/icons/DropdownIcon";
import UserListItem from "@/components/UserListItem";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner/Spinner";
import { useAlarmStore } from "@/store/alarm";

async function updateFollow(targetId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ targetId, follow }),
  }).then((res) => res.json());
}

export default function UserProfile({ userId }: { userId: string }) {
  const [isEdit, setIsEdit] = useState(false);
  const [dropdownType, setDropdownType] = useState("");
  const [followLoading, setFollowLoading] = useState(false);

  const { isAlarm, onAlarm, offAlarm } = useAlarmStore();

  useEffect(() => {
    if (isAlarm) {
      const timer = setTimeout(() => {
        offAlarm();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAlarm, offAlarm]);

  const { loginUser, mutate: loginUserMutate } = useMe();
  const {
    data: user,
    mutate,
    isLoading,
  } = useSWR<SanityUser>(`/api/user/${userId}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isMe = loginUser?.id === userId;

  const isFollow = loginUser?.following.some((user) => user.id === userId);

  const closeModal = () => setIsEdit(false);

  const dropdownHandler = (type: string) => {
    if (dropdownType === type) {
      setDropdownType("");
    } else {
      setDropdownType(type);
    }
  };

  const toggleFollow = async (targetId: string, follow: boolean) => {
    if (!loginUser) {
      onAlarm();
      return;
    }
    setFollowLoading(true);

    await loginUserMutate(updateFollow(targetId, follow), {
      populateCache: false,
    });
    await mutate();
    setFollowLoading(false);
  };

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
      {!isMe && (
        <Button
          onClick={() => toggleFollow(userId, !!isFollow)}
          className="w-20"
        >
          {followLoading ? (
            <Spinner />
          ) : (
            <p>{isFollow ? "언팔로우" : "팔로우"}</p>
          )}
        </Button>
      )}
      <div className="w-full flex gap-4">
        <nav className="relative w-full">
          <button
            className="border border-black rounded-md p-1 w-full flex justify-between items-center hover:bg-gray-50 trasition"
            onClick={() => dropdownHandler("following")}
          >
            <div />
            <p>팔로잉: {user?.following.length}명</p>
            <DropdownIcon isOpen={dropdownType === "following"} />
          </button>
          {dropdownType === "following" && (
            <ul className="border border-black rounded-md p-4 absolute top-12 w-full bg-white z-10 flex flex-col gap-4 max-h-72 overflow-y-scroll">
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
            className="border border-black rounded-md p-1 w-full flex justify-between items-center hover:bg-gray-50 trasition"
            onClick={() => dropdownHandler("followers")}
          >
            <div />
            <p>팔로워: {user?.followers.length}명</p>
            <DropdownIcon isOpen={dropdownType === "followers"} />
          </button>
          {dropdownType === "followers" && (
            <ul className="border border-black rounded-md p-4 absolute top-12 w-full bg-white z-10 flex flex-col gap-4 max-h-72 overflow-y-scroll">
              {user?.followers?.map((user) => (
                <li key={user.id}>
                  <UserListItem user={user} />
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      <Modal isOpen={isEdit} onClose={closeModal}>
        <UserInfoEditForm user={user} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
