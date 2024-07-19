import { FaRegStar } from "react-icons/fa";

type StarIconProps = {
  size: "sm" | "lg";
};

export default function StarIcon({ size }: StarIconProps) {
  return (
    <FaRegStar
      className={`${size === "sm" ? "w-5 h-5" : size === "lg" ? "w-10 h-10" : ""}`}
    />
  );
}
