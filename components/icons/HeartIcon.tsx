import { AiOutlineHeart } from "react-icons/ai";

export default function HeartIcon({ ...props }) {
  return (
    <AiOutlineHeart
      className="w-12 h-12 md:w-7 md:h-7 shrink-0 cursor-pointer"
      {...props}
    />
  );
}
