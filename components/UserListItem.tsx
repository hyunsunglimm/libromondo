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
      className={`flex justify-between items-center hover:bg-gray-50 transition p-4 md:p-2 rounded-md ${outlined && "border border-black"}`}
    >
      <div />
      <div className="flex items-center gap-4">
        <ProfileImage image={user.image} name={user.name} size="sm" />
        <p className="text-3xl font-bold md:text-lg">{user.name}</p>
      </div>
      <RiArrowDropDownLine className="w-12 h-12 md:w-8 md:h-8 -rotate-90" />
    </Link>
  );
}
