import { AiFillHeart } from "react-icons/ai";

export default function HeartFillIcon({ ...props }) {
  return (
    <AiFillHeart
      className="w-12 h-12 md:w-7 md:h-7 fill-red-500 shrink-0 cursor-pointer"
      {...props}
    />
  );
}
