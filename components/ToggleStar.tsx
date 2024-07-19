import StarFillIcon from "@/components/icons/StarFillIcon";
import StarIcon from "@/components/icons/StarIcon";

type ToggleStarProps = {
  isFill: boolean;
  size: "sm" | "lg";
};

export default function ToggleStar({ isFill, size }: ToggleStarProps) {
  return (
    <>{isFill ? <StarFillIcon size={size} /> : <StarIcon size={size} />}</>
  );
}
