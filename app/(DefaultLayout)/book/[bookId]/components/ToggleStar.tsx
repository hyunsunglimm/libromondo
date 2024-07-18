import StarFillIcon from "@/components/icons/StarFillIcon";
import StarIcon from "@/components/icons/StarIcon";

type ToggleStarProps = {
  isFill: boolean;
};

export default function ToggleStar({ isFill }: ToggleStarProps) {
  return <>{isFill ? <StarFillIcon /> : <StarIcon />}</>;
}
