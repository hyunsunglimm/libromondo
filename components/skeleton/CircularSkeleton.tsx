type CircularSkeletonProps = {
  size: "sm" | "lg";
};

export default function CircularSkeleton({ size }: CircularSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-300 rounded-full ${size === "sm" ? "w-8 h-8" : size === "lg" ? "w-32 h-32" : ""}`}
    />
  );
}
