import { SimpleUser } from "@/types/user";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import { RiArrowDropDownLine } from "react-icons/ri";

type UserListItemProps = {
  user: SimpleUser;
  outlined?: boolean;
};

export default function UserListItem({
  user,
  outlined = false,
}: UserListItemProps) {
  return (
    <Link
      href={`/mypage/${user.id}`}
      className={`flex justify-between items-center hover:bg-gray-50 transition p-2 rounded-md ${outlined && "border border-black"}`}
    >
      <div />
      <div className="flex items-center gap-4">
        <ProfileImage image={user.image} name={user.name} size="sm" />
        <p className="text-2xl md:text-base">{user.name}</p>
      </div>
      <RiArrowDropDownLine className="w-7 h-7 -rotate-90" />
    </Link>
  );
}
