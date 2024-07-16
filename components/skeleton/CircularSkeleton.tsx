type CircularSkeletonProps = {
  size: "sm" | "lg";
};

export default function CircularSkeleton({ size }: CircularSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-300 rounded-full ${size === "sm" ? "w-14 h-14 md:w-8 md:h-8" : size === "lg" ? "w-32 h-32" : ""}`}
    />
  );
}
