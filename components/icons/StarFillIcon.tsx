import { FaStar } from "react-icons/fa";

type StarFillIconProps = {
  size: "sm" | "lg";
};

export default function StarFillIcon({ size }: StarFillIconProps) {
  return (
    <FaStar
      className={`${size === "sm" ? "w-5 h-5" : size === "lg" ? "w-10 h-10" : ""}`}
    />
  );
}
