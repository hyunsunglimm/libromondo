import { AiOutlineHeart } from "react-icons/ai";

export default function HeartIcon({ ...props }) {
  return (
    <AiOutlineHeart className="w-7 h-7 shrink-0 cursor-pointer" {...props} />
  );
}
