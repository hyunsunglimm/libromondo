import { AiFillHeart } from "react-icons/ai";

export default function HeartFillIcon({ ...props }) {
  return (
    <AiFillHeart
      className="w-7 h-7 fill-red-500 shrink-0 cursor-pointer"
      {...props}
    />
  );
}
