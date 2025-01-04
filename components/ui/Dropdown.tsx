import { SimpleUser } from "@/types/user";
import DropdownIcon from "../icons/DropdownIcon";
import UserListItem from "../UserListItem";

type DropdownProps = {
  isOpen: boolean;
  title: string;
  list: SimpleUser[] | undefined;
  onClick: () => void;
};

export default function Dropdown({
  isOpen,
  title,
  list,
  onClick,
}: DropdownProps) {
  return (
    <div className="relative w-full">
      <button
        className="border border-black rounded-md p-2 md:p-1 w-full flex justify-between items-center hover:bg-gray-50 trasition"
        onClick={onClick}
      >
        <div />
        <p className="text-2xl md:text-base">{title}</p>
        <DropdownIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <ul className="border border-black rounded-md p-4 absolute top-16 md:top-12 w-full bg-white z-10 flex flex-col gap-4 max-h-72 overflow-y-scroll">
          {list?.map((user) => (
            <li key={user.id}>
              <UserListItem user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
